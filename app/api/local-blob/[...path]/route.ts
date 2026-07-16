import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

export const runtime = "nodejs";

const ALLOWED_ROOT = path.resolve(process.cwd(), "local-blob");

const MIME_TYPES: Record<string, string> = {
  ".json": "application/json",
  ".pdf": "application/pdf",
};

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path: pathSegments } = await params;
  const relativePath = pathSegments.join("/");
  const filePath = path.resolve(ALLOWED_ROOT, relativePath);

  if (!filePath.startsWith(ALLOWED_ROOT + path.sep)) {
    return NextResponse.json({ error: "Invalid path" }, { status: 400 });
  }

  let buffer: Buffer;
  try {
    buffer = await fs.readFile(filePath);
  } catch {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] ?? "application/octet-stream";
  const baseName = path.basename(filePath);

  const headers = new Headers();
  headers.set("Content-Type", contentType);
  if (ext === ".json" || ext === ".pdf") {
    headers.set("Content-Disposition", `attachment; filename="${baseName}"`);
  }

  return new NextResponse(new Uint8Array(buffer), { headers });
}
