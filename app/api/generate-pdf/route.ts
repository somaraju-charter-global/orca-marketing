import { NextRequest, NextResponse } from "next/server";
import { chromium } from "playwright";
import path from "path";
import fs from "fs";

// Playwright launches a real browser, so this must run on the Node.js
// runtime (never the Edge runtime).
export const runtime = "nodejs";

type Section = "marketing" | "onepagers" | "two-pagers";
type PdfFormat = "guide" | "onepager";

const VALID_SECTIONS: Section[] = ["marketing", "onepagers", "two-pagers"];

// Mirrors the intent of the existing `pdf:guide` / `pdf:two-pager` npm
// scripts: guides default to the landscape "guide" layout, onepagers/
// two-pagers default to the portrait "onepager" layout.
const DEFAULT_FORMAT: Record<Section, PdfFormat> = {
  marketing: "guide",
  onepagers: "onepager",
  "two-pagers": "onepager",
};

function getPdfOptions(format: PdfFormat) {
  return format === "onepager"
    ? { width: "8.5in", height: "11in", viewport: { width: 1632, height: 2112 } }
    : { width: "10.6667in", height: "8in", viewport: { width: 2048, height: 1536 } };
}

export async function POST(request: NextRequest) {
  let browser: Awaited<ReturnType<typeof chromium.launch>> | undefined;

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

    const outDir = path.resolve(process.cwd(), "exports");
    fs.mkdirSync(outDir, { recursive: true });
    const outputPath = path.join(outDir, `${slug}.pdf`);

    browser = await chromium.launch();
    const page = await browser.newPage({
      viewport: pdfOptions.viewport,
      deviceScaleFactor: 2,
    });

    await page.goto(printUrl, { waitUntil: "networkidle" });

    // Wait for fonts to load, same as scripts/generate-pdf.ts
    await page.waitForTimeout(2000);

    await page.pdf({
      path: outputPath,
      printBackground: true,
      preferCSSPageSize: true,
      width: pdfOptions.width,
      height: pdfOptions.height,
      margin: { top: "0", right: "0", bottom: "0", left: "0" },
      scale: 1,
    });

    await browser.close();
    browser = undefined;

    const pdfBuffer = fs.readFileSync(outputPath);

    return new NextResponse(new Uint8Array(pdfBuffer), {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${slug}.pdf"`,
      },
    });
  } catch (error) {
    if (browser) {
      await browser.close().catch(() => {});
    }
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
