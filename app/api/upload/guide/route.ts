import { NextResponse } from "next/server";
import { uploadGuideJson } from "@/lib/storage";
import { validateMarketingGuide } from "@/lib/guide-validation";
import { auth } from "@/auth";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json().catch(() => null);
    if (!body || typeof body !== "object") {
      return NextResponse.json(
        { error: "Request body must be a JSON object." },
        { status: 400 }
      );
    }

    const validation = validateMarketingGuide(body);
    if (!validation.success) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }

    const { slug } = validation.data;
    const blob = await uploadGuideJson(slug, validation.data);

    return NextResponse.json({ ok: true, slug, url: blob.url });
  } catch (error) {
    console.error("POST /api/upload/guide failed:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Guide upload failed.",
      },
      { status: 500 }
    );
  }
}
