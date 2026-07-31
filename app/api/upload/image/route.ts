import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { uploadImage, deleteImage } from "@/lib/storage";
import { validateImageBuffer, MAX_IMAGE_BYTES } from "@/lib/image-validation";
import { parseUploadedImageReference } from "@/lib/image-path";

// Needs Node.js APIs (Buffer, crypto) — not Edge.
export const runtime = "nodejs";

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user?.email || !session?.user?.domain) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json(
      { error: "Request must be multipart/form-data with a 'file' field." },
      { status: 400 }
    );
  }

  const file = formData.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json(
      { error: "Missing 'file' field." },
      { status: 400 }
    );
  }

  // Reject oversized uploads before reading the body into memory.
  if (file.size > MAX_IMAGE_BYTES) {
    const maxMb = (MAX_IMAGE_BYTES / (1024 * 1024)).toFixed(0);
    return NextResponse.json(
      { error: `Image exceeds the ${maxMb}MB limit.` },
      { status: 413 }
    );
  }

  const buffer = Buffer.from(await file.arrayBuffer());

  // Format, size, and pixel-dimension checks. The uploaded file's claimed
  // extension/Content-Type are never trusted here — validateImageBuffer
  // sniffs the real format from file bytes.
  const validation = validateImageBuffer(buffer);
  if (!validation.valid) {
    return NextResponse.json({ error: validation.error }, { status: 400 });
  }

  const filename = `${randomUUID()}.${validation.extension}`;

  try {
    const blob = await uploadImage(
      filename,
      buffer,
      session.user.domain,
      validation.contentType
    );

    return NextResponse.json({
      ok: true,
      url: blob.url,
      width: validation.width,
      height: validation.height,
      sizeBytes: validation.sizeBytes,
      format: validation.format,
    });
  } catch (error) {
    console.error("POST /api/upload/image failed:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Image upload failed." },
      { status: 500 }
    );
  }
}

/**
 * Deletes a previously-uploaded image, given the URL /api/upload/image
 * returned for it. Called by the client after a successful replace (to
 * clean up the image that's no longer referenced) or after the Delete
 * button clears an optional image field.
 *
 * Silently no-ops (200, deleted: false) for anything that isn't a
 * recognized uploaded-image URL — in particular, bundled static assets
 * under /images or /logos, which must never be deleted this way since
 * they're repo files that other documents may still reference.
 */
export async function DELETE(request: Request) {
  const session = await auth();
  if (!session?.user?.email || !session?.user?.domain) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  const url = body?.url;
  if (typeof url !== "string") {
    return NextResponse.json({ error: "Missing 'url' field." }, { status: 400 });
  }

  const parsed = parseUploadedImageReference(url);
  if (!parsed) {
    // Not one of our uploads (e.g. a static /images asset) — nothing to
    // delete, and not an error from the caller's point of view.
    return NextResponse.json({ ok: true, deleted: false });
  }

  // Never let one domain's session delete another domain's file, even if
  // they somehow get hold of its URL.
  if (parsed.domain !== session.user.domain) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await deleteImage(parsed.filename, parsed.domain);
    return NextResponse.json({ ok: true, deleted: true });
  } catch (error) {
    console.error("DELETE /api/upload/image failed:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to delete image." },
      { status: 500 }
    );
  }
}
