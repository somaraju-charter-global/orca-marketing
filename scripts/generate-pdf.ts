import { chromium } from "playwright";
import path from "path";
import fs from "fs";

function getArg(name: string, fallback?: string) {
  const index = process.argv.indexOf(`--${name}`);
  if (index !== -1 && process.argv[index + 1]) return process.argv[index + 1];
  return fallback;
}

async function main() {
  const url = getArg("url");
  const out = getArg("out", "./exports/orcaworks-document.pdf");
  const format = getArg("format", "guide");
  const cookie = getArg("cookie");

  if (!url) {
    throw new Error("Missing --url argument");
  }

  const outputPath = path.resolve(out!);
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });

  const pdfOptions =
    format === "onepager"
      ? { width: "8.5in", height: "11in", viewport: { width: 1632, height: 2112 } }
      : { width: "10.6667in", height: "8in", viewport: { width: 2048, height: 1536 } };

  const browser = await chromium.launch();
  const page = await browser.newPage({
    viewport: pdfOptions.viewport,
    deviceScaleFactor: 2,
  });

  if (cookie) {
    await page.setExtraHTTPHeaders({ Cookie: cookie });
  }

  await page.goto(url, { waitUntil: "networkidle" });
  
  // Wait for fonts to load
  await page.waitForTimeout(2000);

  await page.pdf({
    path: outputPath,
    printBackground: true,
    preferCSSPageSize: true,
    width: pdfOptions.width,
    height: pdfOptions.height,
    margin: {
      top: "0",
      right: "0",
      bottom: "0",
      left: "0",
    },
    scale: 1,
  });

  await browser.close();

  console.log(`PDF generated: ${outputPath}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
