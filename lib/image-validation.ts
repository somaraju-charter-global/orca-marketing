import { imageSize } from "image-size";

/**
 * Server-side validation for any image that will end up embedded in a
 * fixed-size PDF page. This is the one place that decides whether an
 * uploaded file is safe to store and reference from content JSON.
 *
 * Three checks, in order (cheapest first so bad uploads fail fast):
 *   1. File size ceiling
 *   2. Real file format, sniffed from magic bytes (never trust the
 *      filename extension or the browser-supplied Content-Type — both
 *      are trivial to spoof)
 *   3. Decoded pixel dimensions, within bounds that keep fixed-size
 *      page layouts (object-cover / object-contain / next/image fill)
 *      looking intentional rather than stretched, cropped oddly, or
 *      blown out.
 */

export const MAX_IMAGE_BYTES = 8 * 1024 * 1024; // 8MB

// Mirrors the "recommended image dimensions" already documented in
// design.md / README.md, plus a ceiling to stop absurdly large uploads
// (e.g. a 12000x8000 photo) from bloating storage and slowing PDF
// generation.
export const MIN_WIDTH = 600;
export const MIN_HEIGHT = 400;
export const MAX_WIDTH = 6000;
export const MAX_HEIGHT = 6000;

export type ImageFormat = "jpeg" | "png";

export interface ImageValidationSuccess {
  valid: true;
  format: ImageFormat;
  extension: "jpg" | "png";
  contentType: "image/jpeg" | "image/png";
  width: number;
  height: number;
  sizeBytes: number;
}

export interface ImageValidationFailure {
  valid: false;
  error: string;
}

export type ImageValidationResult =
  | ImageValidationSuccess
  | ImageValidationFailure;

/**
 * Sniffs the real image format from the first few bytes of the file.
 * Ignores whatever extension or Content-Type the client claims.
 */
function sniffImageFormat(buffer: Buffer): ImageFormat | null {
  if (
    buffer.length >= 3 &&
    buffer[0] === 0xff &&
    buffer[1] === 0xd8 &&
    buffer[2] === 0xff
  ) {
    return "jpeg";
  }

  if (
    buffer.length >= 8 &&
    buffer[0] === 0x89 &&
    buffer[1] === 0x50 &&
    buffer[2] === 0x4e &&
    buffer[3] === 0x47 &&
    buffer[4] === 0x0d &&
    buffer[5] === 0x0a &&
    buffer[6] === 0x1a &&
    buffer[7] === 0x0a
  ) {
    return "png";
  }

  return null;
}

export function validateImageBuffer(buffer: Buffer): ImageValidationResult {
  if (buffer.length === 0) {
    return { valid: false, error: "File is empty." };
  }

  if (buffer.length > MAX_IMAGE_BYTES) {
    const maxMb = (MAX_IMAGE_BYTES / (1024 * 1024)).toFixed(0);
    const gotMb = (buffer.length / (1024 * 1024)).toFixed(1);
    return {
      valid: false,
      error: `Image is ${gotMb}MB, which exceeds the ${maxMb}MB limit.`,
    };
  }

  const format = sniffImageFormat(buffer);
  if (!format) {
    return {
      valid: false,
      error: "Only JPG and PNG images are allowed.",
    };
  }

  let dimensions: { width?: number; height?: number };
  try {
    dimensions = imageSize(buffer);
  } catch {
    return {
      valid: false,
      error: "Could not read image dimensions — the file may be corrupt.",
    };
  }

  const { width, height } = dimensions;
  if (!width || !height) {
    return {
      valid: false,
      error: "Could not read image dimensions — the file may be corrupt.",
    };
  }

  if (width < MIN_WIDTH || height < MIN_HEIGHT) {
    return {
      valid: false,
      error: `Image is ${width}x${height}px. Minimum allowed is ${MIN_WIDTH}x${MIN_HEIGHT}px so it stays sharp in the printed PDF.`,
    };
  }

  if (width > MAX_WIDTH || height > MAX_HEIGHT) {
    return {
      valid: false,
      error: `Image is ${width}x${height}px, which exceeds the ${MAX_WIDTH}x${MAX_HEIGHT}px limit.`,
    };
  }

  return {
    valid: true,
    format,
    extension: format === "jpeg" ? "jpg" : "png",
    contentType: format === "jpeg" ? "image/jpeg" : "image/png",
    width,
    height,
    sizeBytes: buffer.length,
  };
}
