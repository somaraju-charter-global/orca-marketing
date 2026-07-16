import { put, get, list, del } from "@vercel/blob";
import type { PutBlobResult, ListBlobResultBlob } from "@vercel/blob";
import { promises as fs } from "fs";
import path from "path";

export const JSON_PREFIX = "jsons/" as const;
export const PDF_PREFIX = "pdfs/" as const;

const LOCAL_BLOB_DIR = path.resolve(process.cwd(), "local-blob");

function jsonKey(slug: string): string {
  return `${JSON_PREFIX}${slug}.json`;
}

function pdfKey(slug: string): string {
  return `${PDF_PREFIX}${slug}.pdf`;
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
  data: unknown
): Promise<PutBlobResult> {
  const key = jsonKey(slug);
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

export async function getJson(slug: string): Promise<unknown | null> {
  const key = jsonKey(slug);

  if (isLocalMode()) {
    return localGet(key);
  }

  const result = await get(key, { access: "public", useCache: false });
  if (!result || result.statusCode === 304 || !result.stream) return null;
  const text = await new Response(result.stream).text();
  return JSON.parse(text);
}

export async function listJsons(): Promise<ListBlobResultBlob[]> {
  if (isLocalMode()) {
    return localList(JSON_PREFIX);
  }

  const result = await list({ prefix: JSON_PREFIX });
  return result.blobs;
}

export async function deleteJson(slug: string): Promise<void> {
  const key = jsonKey(slug);

  if (isLocalMode()) {
    await localDelete(key);
    return;
  }

  await del(key);
}

export async function uploadPdf(
  slug: string,
  buffer: ArrayBuffer | Buffer | Blob
): Promise<PutBlobResult> {
  const key = pdfKey(slug);

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

export async function listPdfs(): Promise<ListBlobResultBlob[]> {
  if (isLocalMode()) {
    return localList(PDF_PREFIX);
  }

  const result = await list({ prefix: PDF_PREFIX });
  return result.blobs;
}

export async function deletePdf(slug: string): Promise<void> {
  const key = pdfKey(slug);

  if (isLocalMode()) {
    await localDelete(key);
    return;
  }

  await del(key);
}

export const GUIDE_JSON_PREFIX = "guide-jsons/" as const;

function guideJsonKey(slug: string): string {
  return `${GUIDE_JSON_PREFIX}${slug}.json`;
}

export async function uploadGuideJson(
  slug: string,
  data: unknown
): Promise<PutBlobResult> {
  const key = guideJsonKey(slug);
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

export async function getGuideJson(slug: string): Promise<unknown | null> {
  const key = guideJsonKey(slug);

  if (isLocalMode()) {
    return localGet(key);
  }

  const result = await get(key, { access: "public", useCache: false });
  if (!result || result.statusCode === 304 || !result.stream) return null;
  const text = await new Response(result.stream).text();
  return JSON.parse(text);
}

export async function listGuideJsons(): Promise<ListBlobResultBlob[]> {
  if (isLocalMode()) {
    return localList(GUIDE_JSON_PREFIX);
  }

  const result = await list({ prefix: GUIDE_JSON_PREFIX });
  return result.blobs;
}

export async function deleteGuideJson(slug: string): Promise<void> {
  const key = guideJsonKey(slug);

  if (isLocalMode()) {
    await localDelete(key);
    return;
  }

  await del(key);
}
