import { put, get, list, del } from "@vercel/blob";
import type { PutBlobResult, ListBlobResultBlob } from "@vercel/blob";
import { promises as fs } from "fs";
import path from "path";

export const JSON_PREFIX = "jsons/" as const;
export const PDF_PREFIX = "pdfs/" as const;
export const IMAGE_PREFIX = "images/" as const;

const LOCAL_BLOB_DIR = path.resolve(process.cwd(), "local-blob");

function jsonKey(slug: string, domain: string): string {
  return `domains/${domain}/${JSON_PREFIX}${slug}.json`;
}

function pdfKey(slug: string, domain: string): string {
  return `domains/${domain}/${PDF_PREFIX}${slug}.pdf`;
}

function imageKey(filename: string, domain: string): string {
  return `domains/${domain}/${IMAGE_PREFIX}${filename}`;
}

/**
 * Local file fallback for development when Vercel Blob credentials are not set.
 * This is only used in development and only when BLOB_READ_WRITE_TOKEN is missing.
 */
function isLocalMode(): boolean {
  return !process.env.BLOB_READ_WRITE_TOKEN && process.env.NODE_ENV !== "production";
}

function localUrl(key: string): string {
  return `/api/local-blob/${key}`;
}

async function localFilePath(key: string): Promise<string> {
  const filePath = path.join(LOCAL_BLOB_DIR, key);
  await fs.mkdir(path.dirname(filePath), { recursive: true });
  return filePath;
}

async function localPut(
  key: string,
  body: string | Uint8Array | Buffer,
  contentType: string
): Promise<PutBlobResult> {
  const filePath = await localFilePath(key);
  await fs.writeFile(filePath, body);
  const stat = await fs.stat(filePath);
  return {
    url: localUrl(key),
    downloadUrl: localUrl(key),
    pathname: key,
    contentType,
    contentDisposition: `attachment; filename="${path.basename(filePath)}"`,
    etag: stat.mtimeMs.toString(),
  } as PutBlobResult;
}

async function localGet(key: string): Promise<unknown | null> {
  const filePath = path.join(LOCAL_BLOB_DIR, key);
  try {
    const text = await fs.readFile(filePath, "utf8");
    return JSON.parse(text);
  } catch {
    return null;
  }
}

async function localList(prefix: string): Promise<ListBlobResultBlob[]> {
  const dir = path.join(LOCAL_BLOB_DIR, prefix);
  try {
    const entries = await fs.readdir(dir, { withFileTypes: true });
    const files = entries.filter((entry) => entry.isFile());
    return Promise.all(
      files.map(async (file) => {
        const pathname = `${prefix}${file.name}`;
        const filePath = path.join(dir, file.name);
        const stat = await fs.stat(filePath);
        return {
          url: localUrl(pathname),
          downloadUrl: localUrl(pathname),
          pathname,
          size: stat.size,
          uploadedAt: new Date(stat.mtime),
          etag: stat.mtimeMs.toString(),
        } as ListBlobResultBlob;
      })
    );
  } catch {
    return [];
  }
}

async function localDelete(key: string): Promise<void> {
  const filePath = path.join(LOCAL_BLOB_DIR, key);
  try {
    await fs.unlink(filePath);
  } catch {
    // ignore missing files
  }
}

export async function uploadJson(
  slug: string,
  data: unknown,
  domain: string
): Promise<PutBlobResult> {
  const key = jsonKey(slug, domain);
  const body = JSON.stringify(data, null, 2);

  if (isLocalMode()) {
    return localPut(key, body, "application/json");
  }

  return put(key, body, {
    access: "public",
    contentType: "application/json",
    allowOverwrite: true,
  });
}

export async function getJson(slug: string, domain: string): Promise<unknown | null> {
  const key = jsonKey(slug, domain);

  if (isLocalMode()) {
    return localGet(key);
  }

  const result = await get(key, { access: "public", useCache: false });
  if (!result || result.statusCode === 304 || !result.stream) return null;
  const text = await new Response(result.stream).text();
  return JSON.parse(text);
}

export async function listJsons(domain: string): Promise<ListBlobResultBlob[]> {
  const prefix = `domains/${domain}/${JSON_PREFIX}`;
  if (isLocalMode()) {
    return localList(prefix);
  }

  const result = await list({ prefix });
  return result.blobs;
}

export async function deleteJson(slug: string, domain: string): Promise<void> {
  const key = jsonKey(slug, domain);

  if (isLocalMode()) {
    await localDelete(key);
    return;
  }

  await del(key);
}

export async function uploadPdf(
  slug: string,
  buffer: ArrayBuffer | Buffer | Blob,
  domain: string
): Promise<PutBlobResult> {
  const key = pdfKey(slug, domain);

  if (isLocalMode()) {
    const bytes =
      buffer instanceof Blob
        ? Buffer.from(await buffer.arrayBuffer())
        : Buffer.from(buffer as ArrayBuffer);
    return localPut(key, bytes, "application/pdf");
  }

  return put(key, buffer, {
    access: "public",
    contentType: "application/pdf",
    allowOverwrite: true,
  });
}

export async function listPdfs(domain: string): Promise<ListBlobResultBlob[]> {
  const prefix = `domains/${domain}/${PDF_PREFIX}`;
  if (isLocalMode()) {
    return localList(prefix);
  }

  const result = await list({ prefix });
  return result.blobs;
}

export async function deletePdf(slug: string, domain: string): Promise<void> {
  const key = pdfKey(slug, domain);

  if (isLocalMode()) {
    await localDelete(key);
    return;
  }

  await del(key);
}

/**
 * Stores an already-validated image (see lib/image-validation.ts — the
 * caller must have checked format, size, and dimensions before calling
 * this). `filename` should be a generated, collision-resistant name
 * (e.g. `${randomUUID()}.${extension}`), not a user-supplied one.
 */
export async function uploadImage(
  filename: string,
  buffer: Buffer,
  domain: string,
  contentType: "image/jpeg" | "image/png"
): Promise<PutBlobResult> {
  const key = imageKey(filename, domain);

  if (isLocalMode()) {
    return localPut(key, buffer, contentType);
  }

  return put(key, buffer, {
    access: "public",
    contentType,
    allowOverwrite: false,
  });
}

export async function listImages(domain: string): Promise<ListBlobResultBlob[]> {
  const prefix = `domains/${domain}/${IMAGE_PREFIX}`;
  if (isLocalMode()) {
    return localList(prefix);
  }

  const result = await list({ prefix });
  return result.blobs;
}

export async function deleteImage(filename: string, domain: string): Promise<void> {
  const key = imageKey(filename, domain);

  if (isLocalMode()) {
    await localDelete(key);
    return;
  }

  await del(key);
}

export const GUIDE_JSON_PREFIX = "guide-jsons/" as const;

function guideJsonKey(slug: string, domain: string): string {
  return `domains/${domain}/${GUIDE_JSON_PREFIX}${slug}.json`;
}

export async function uploadGuideJson(
  slug: string,
  data: unknown,
  domain: string
): Promise<PutBlobResult> {
  const key = guideJsonKey(slug, domain);
  const body = JSON.stringify(data, null, 2);

  if (isLocalMode()) {
    return localPut(key, body, "application/json");
  }

  return put(key, body, {
    access: "public",
    contentType: "application/json",
    allowOverwrite: true,
  });
}

export async function getGuideJson(slug: string, domain: string): Promise<unknown | null> {
  const key = guideJsonKey(slug, domain);

  if (isLocalMode()) {
    return localGet(key);
  }

  const result = await get(key, { access: "public", useCache: false });
  if (!result || result.statusCode === 304 || !result.stream) return null;
  const text = await new Response(result.stream).text();
  return JSON.parse(text);
}

export async function listGuideJsons(domain: string): Promise<ListBlobResultBlob[]> {
  const prefix = `domains/${domain}/${GUIDE_JSON_PREFIX}`;
  if (isLocalMode()) {
    return localList(prefix);
  }

  const result = await list({ prefix });
  return result.blobs;
}

export async function deleteGuideJson(slug: string, domain: string): Promise<void> {
  const key = guideJsonKey(slug, domain);

  if (isLocalMode()) {
    await localDelete(key);
    return;
  }

  await del(key);
}
