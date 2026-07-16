import { NextResponse } from "next/server";
import { deleteJson, deletePdf } from "@/lib/storage";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const type = body?.type;
  const slug = body?.slug;

  if (!slug || (type !== "json" && type !== "pdf")) {
    return NextResponse.json(
      { error: "Request must include 'slug' and 'type' ('json' or 'pdf')." },
      { status: 400 }
    );
  }

  try {
    if (type === "json") {
      await deleteJson(slug);
    } else {
      await deletePdf(slug);
    }
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("DELETE /api/manage/delete failed:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Failed to delete file.",
      },
      { status: 500 }
    );
  }
}
