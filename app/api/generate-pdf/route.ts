import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import chromium from "@sparticuz/chromium";
import puppeteer from "puppeteer-core";
import type { Browser as PuppeteerBrowser, Page as PuppeteerPage } from "puppeteer-core";

// PDF generation needs a real browser, so this must run on the Node.js
// runtime (never the Edge runtime).
export const runtime = "nodejs";

type Section = "marketing" | "onepagers" | "two-pagers";
type PdfFormat = "guide" | "onepager";

type PdfOptions = {
  width: string;
  height: string;
  viewport: { width: number; height: number };
  preferCSSPageSize?: boolean;
  scale?: number;
};

const VALID_SECTIONS: Section[] = ["marketing", "onepagers", "two-pagers"];

// Mirrors the intent of the existing `pdf:guide` / `pdf:two-pager` npm
// scripts: guides default to the landscape "guide" layout, onepagers/
// two-pagers default to the portrait "onepager" layout.
const DEFAULT_FORMAT: Record<Section, PdfFormat> = {
  marketing: "guide",
  onepagers: "onepager",
  "two-pagers": "onepager",
};

function getPdfOptions(format: PdfFormat): PdfOptions {
  return format === "onepager"
    ? {
        width: "210mm",
        height: "297mm",
        viewport: { width: 794, height: 1123 },
        preferCSSPageSize: true,
        scale: 1,
      }
    : {
        width: "10.6667in",
        height: "8in",
        viewport: { width: 2048, height: 1536 },
        preferCSSPageSize: true,
        scale: 1,
      };
}

async function generateWithPuppeteer(
  printUrl: string,
  pdfOptions: PdfOptions,
  cookieHeader?: string
): Promise<Buffer> {
  const executablePath = await chromium.executablePath();

  const browser: PuppeteerBrowser = await puppeteer.launch({
    args: chromium.args,
    executablePath,
    headless: "shell",
    defaultViewport: {
      width: pdfOptions.viewport.width,
      height: pdfOptions.viewport.height,
      deviceScaleFactor: 2,
    },
  });

  let page: PuppeteerPage | undefined;
  try {
    page = await browser.newPage();
    if (cookieHeader) {
      await page.setExtraHTTPHeaders({ Cookie: cookieHeader });
    }
    await page.setViewport({
      width: pdfOptions.viewport.width,
      height: pdfOptions.viewport.height,
      deviceScaleFactor: 2,
    });
    await page.goto(printUrl, { waitUntil: "networkidle2" });
    // Allow fonts to load.
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const buffer = await page.pdf({
      printBackground: true,
      preferCSSPageSize: pdfOptions.preferCSSPageSize ?? false,
      width: pdfOptions.width,
      height: pdfOptions.height,
      margin: { top: "0", right: "0", bottom: "0", left: "0" },
      scale: pdfOptions.scale ?? 1,
    });
    return Buffer.from(buffer);
  } finally {
    await browser.close().catch(() => {});
  }
}

async function generateWithPlaywright(
  printUrl: string,
  pdfOptions: PdfOptions,
  cookieHeader?: string
): Promise<Buffer> {
  // Dynamic import keeps Playwright out of the Vercel serverless bundle
  // unless the local fallback is actually used.
  const { chromium: playwrightChromium } = await import("playwright");
  const browser = await playwrightChromium.launch();

  try {
    const page = await browser.newPage({
      viewport: pdfOptions.viewport,
      deviceScaleFactor: 2,
    });

    if (cookieHeader) {
      await page.setExtraHTTPHeaders({ Cookie: cookieHeader });
    }

    await page.goto(printUrl, { waitUntil: "networkidle" });
    await page.waitForTimeout(2000);

    const buffer = await page.pdf({
      printBackground: true,
      preferCSSPageSize: pdfOptions.preferCSSPageSize ?? false,
      width: pdfOptions.width,
      height: pdfOptions.height,
      margin: { top: "0", right: "0", bottom: "0", left: "0" },
      scale: pdfOptions.scale ?? 1,
    });

    await browser.close();
    return Buffer.from(buffer);
  } catch (error) {
    await browser.close().catch(() => {});
    throw error;
  }
}

async function generatePdf(
  printUrl: string,
  pdfOptions: PdfOptions,
  cookieHeader?: string
): Promise<Buffer> {
  try {
    return await generateWithPuppeteer(printUrl, pdfOptions, cookieHeader);
  } catch (puppeteerError) {
    console.warn(
      "Puppeteer/Sparticuz launch failed, falling back to Playwright:",
      puppeteerError
    );
    return generateWithPlaywright(printUrl, pdfOptions, cookieHeader);
  }
}

export async function POST(request: NextRequest) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json().catch(() => null);
    const slug: string | undefined = body?.slug;
    const section: Section | undefined = body?.section;
    const formatOverride: PdfFormat | undefined = body?.format;

    if (!slug || !section || !VALID_SECTIONS.includes(section)) {
      return NextResponse.json(
        { error: "Request must include a valid 'slug' and 'section'." },
        { status: 400 }
      );
    }

    const format = formatOverride ?? DEFAULT_FORMAT[section];
    const printUrl = new URL(`/${section}/${slug}/print`, request.nextUrl.origin).toString();
    const pdfOptions = getPdfOptions(format);
    const cookieHeader = request.headers.get("cookie") ?? undefined;

    const pdfBuffer = await generatePdf(printUrl, pdfOptions, cookieHeader);

    return new NextResponse(new Uint8Array(pdfBuffer), {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${slug}.pdf"`,
      },
    });
  } catch (error) {
    console.error("PDF generation failed:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "PDF generation failed.",
      },
      { status: 500 }
    );
  }
}
