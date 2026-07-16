import { NextResponse } from "next/server";
import { uploadPdf } from "@/lib/storage";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const form = await request.formData().catch(() => null);
    if (!form) {
      return NextResponse.json(
        { error: "Request must be multipart/form-data." },
        { status: 400 }
      );
    }

    const slug = form.get("slug");
    const file = form.get("file");

    if (!slug || typeof slug !== "string") {
      return NextResponse.json(
        { error: "Missing or invalid 'slug' field." },
        { status: 400 }
      );
    }

    if (!file || !(file instanceof File)) {
      return NextResponse.json(
        { error: "Missing or invalid 'file' field." },
        { status: 400 }
      );
    }

    if (file.type !== "application/pdf") {
      return NextResponse.json(
        { error: "File must be a PDF." },
        { status: 400 }
      );
    }

    const buffer = await file.arrayBuffer();
    const blob = await uploadPdf(slug, buffer);

    return NextResponse.json({ ok: true, slug, url: blob.url });
  } catch (error) {
    console.error("POST /api/upload/pdf failed:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "PDF upload failed.",
      },
      { status: 500 }
    );
  }
}
