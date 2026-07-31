import { z } from "zod";

/**
 * Content JSON (two-pagers and guides) references images by path/URL string,
 * and both /upload and /upload-guide accept arbitrary JSON as long as it
 * matches the schema. Without this check, format/size/dimension validation
 * on the upload-image endpoint is trivially bypassed: someone can just paste
 * an external image URL — any format, any size, any dimensions — straight
 * into the JSON and it will render in the fixed-size PDF layout unchecked.
 *
 * So every image reference in content JSON must be EITHER:
 *   - a static asset already committed to the repo under /images or /logos
 *   - a file that was uploaded through /api/upload/image, which enforces
 *     JPG/PNG + size + dimension checks before storing it
 *
 * Arbitrary external https:// URLs, data: URIs, etc. are rejected.
 */

// Allows nested subfolders (e.g. /images/guides/bg-white.jpg), not just a
// single flat filename directly under /images or /logos.
const STATIC_ASSET_PATTERN =
  /^\/(images|logos)\/[\w.-]+(?:\/[\w.-]+)*\.(?:jpg|jpeg|png|webp|svg)$/i;

// Local dev fallback storage (see lib/storage.ts localUrl()).
const LOCAL_BLOB_UPLOAD_PATTERN =
  /^\/api\/local-blob\/domains\/([\w.-]+)\/images\/([\w.-]+\.(?:jpg|jpeg|png))$/i;

// Vercel Blob public URLs for images uploaded through /api/upload/image.
const VERCEL_BLOB_UPLOAD_PATTERN =
  /^https:\/\/[\w-]+\.public\.blob\.vercel-storage\.com\/domains\/([\w.-]+)\/images\/([\w.-]+\.(?:jpg|jpeg|png))$/i;

export function isAllowedImageReference(value: string): boolean {
  // Reject path traversal / protocol-relative tricks before anything else —
  // the character classes above allow "." and would otherwise let a ".."
  // segment or a leading "//" slip through as a "valid" path.
  if (value.includes("..") || value.startsWith("//")) {
    return false;
  }

  return (
    STATIC_ASSET_PATTERN.test(value) ||
    LOCAL_BLOB_UPLOAD_PATTERN.test(value) ||
    VERCEL_BLOB_UPLOAD_PATTERN.test(value)
  );
}

/**
 * Extracts { domain, filename } from a URL that was returned by
 * /api/upload/image, so the server can delete the underlying stored file
 * when it's replaced or removed. Returns null for anything else — in
 * particular, bundled static assets under /images or /logos, which are
 * repo files shared across documents and must never be deleted this way.
 */
export function parseUploadedImageReference(
  value: string
): { domain: string; filename: string } | null {
  const match =
    LOCAL_BLOB_UPLOAD_PATTERN.exec(value) ??
    VERCEL_BLOB_UPLOAD_PATTERN.exec(value);
  if (!match) return null;
  return { domain: match[1], filename: match[2] };
}

const ISSUE_MESSAGE =
  "Image must be a bundled /images or /logos asset, or a URL returned by the image upload endpoint (JPG/PNG only). Arbitrary external image URLs are not allowed.";

/** Required image field. */
export const imageRefSchema = z
  .string()
  .refine(isAllowedImageReference, { message: ISSUE_MESSAGE });

/** Optional image field (e.g. imagePath?: string). */
export const optionalImageRefSchema = z
  .string()
  .refine(isAllowedImageReference, { message: ISSUE_MESSAGE })
  .optional();
