import { NextResponse } from "next/server";
import { deleteJson, deleteGuideJson, deletePdf } from "@/lib/storage";
import { auth } from "@/auth";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  const type = body?.type;
  const slug = body?.slug;
  // "onepager" (two-pager) is the default so existing callers (the /manage
  // page, which only ever deletes two-pager JSON today) keep working
  // unchanged without passing this field.
  const kind = body?.kind === "guide" ? "guide" : "onepager";

  if (!slug || (type !== "json" && type !== "pdf")) {
    return NextResponse.json(
      { error: "Request must include 'slug' and 'type' ('json' or 'pdf')." },
      { status: 400 }
    );
  }

  try {
    if (type === "json") {
      if (kind === "guide") {
        await deleteGuideJson(slug);
      } else {
        await deleteJson(slug);
      }
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
