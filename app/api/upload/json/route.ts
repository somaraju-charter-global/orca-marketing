import { NextResponse } from "next/server";
import { uploadJson } from "@/lib/storage";
import { validateTwoPageVerticalBrief } from "@/lib/validation";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => null);
    if (!body || typeof body !== "object") {
      return NextResponse.json(
        { error: "Request body must be a JSON object." },
        { status: 400 }
      );
    }

    const validation = validateTwoPageVerticalBrief(body);
    if (!validation.success) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }

    const { slug } = validation.data;
    const blob = await uploadJson(slug, validation.data);

    return NextResponse.json({ ok: true, slug, url: blob.url });
  } catch (error) {
    console.error("POST /api/upload/json failed:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "JSON upload failed.",
      },
      { status: 500 }
    );
  }
}
