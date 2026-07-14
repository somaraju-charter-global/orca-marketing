import fs from "fs";
import path from "path";

export type ContentType = "guide" | "twoPager";

const CONTENT_DIRS: Record<ContentType, string> = {
  guide: "content/guides",
  twoPager: "content/two-pagers",
};

function extractSlug(source: string): string | null {
  // Accept both quote styles for the value, and both quoted and unquoted
  // forms of the `slug` key itself — the original hand-written files use
  // `slug: "..."`, but once this tool saves a file it's regenerated via
  // JSON.stringify, which quotes keys too: `"slug": "..."`.
  const match = source.match(/["']?slug["']?\s*:\s*["']([^"']+)["']/);
  return match ? match[1] : null;
}

/**
 * Scans the relevant content directory for a .ts file whose `slug: "..."`
 * field matches the given slug, and returns its absolute path (or null if
 * none is found). This avoids having to hardcode a slug -> filename map,
 * since every content file already declares its own slug.
 */
export function findContentFile(contentType: ContentType, slug: string): string | null {
  const dir = path.resolve(process.cwd(), CONTENT_DIRS[contentType]);
  if (!fs.existsSync(dir)) return null;

  const files = fs.readdirSync(dir).filter((file) => file.endsWith(".ts"));

  for (const file of files) {
    const filePath = path.join(dir, file);
    const source = fs.readFileSync(filePath, "utf8");
    if (extractSlug(source) === slug) {
      return filePath;
    }
  }

  return null;
}

/**
 * Lists every slug found in the relevant content directory, paired with
 * its filename — used to give a helpful error when a lookup misses,
 * rather than a bare "not found".
 */
export function listContentSlugs(contentType: ContentType): { file: string; slug: string | null }[] {
  const dir = path.resolve(process.cwd(), CONTENT_DIRS[contentType]);
  if (!fs.existsSync(dir)) return [];

  const files = fs.readdirSync(dir).filter((file) => file.endsWith(".ts"));

  return files.map((file) => {
    const source = fs.readFileSync(path.join(dir, file), "utf8");
    return { file, slug: extractSlug(source) };
  });
}
