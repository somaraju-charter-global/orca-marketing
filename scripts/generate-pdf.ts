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

  if (!url) {
    throw new Error("Missing --url argument");
  }

  const outputPath = path.resolve(out!);
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });

  const browser = await chromium.launch();
  const page = await browser.newPage({
    viewport: { width: 2048, height: 1536 },
    deviceScaleFactor: 2,
  });

  await page.goto(url, { waitUntil: "networkidle" });
  
  // Wait for fonts to load
  await page.waitForTimeout(2000);

  await page.pdf({
    path: outputPath,
    printBackground: true,
    preferCSSPageSize: true,
    width: "10.6667in",
    height: "8in",
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
