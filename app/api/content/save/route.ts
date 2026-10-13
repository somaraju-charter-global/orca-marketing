import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { findContentFile, listContentSlugs, ContentType } from "@/lib/content-editor/find-content-file";
import { auth } from "@/auth";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  const contentType: ContentType | undefined = body?.contentType;
  const slug: string | undefined = body?.slug;
  const content: unknown = body?.content;

  if (!contentType || !slug || !content || typeof content !== "object") {
    return NextResponse.json(
      { error: "Request must include 'contentType', 'slug', and 'content'." },
      { status: 400 }
    );
  }

  if (contentType !== "guide" && contentType !== "twoPager") {
    return NextResponse.json(
      { error: "'contentType' must be 'guide' or 'twoPager'." },
      { status: 400 }
    );
  }

  const filePath = findContentFile(contentType, slug);
  if (!filePath) {
    const known = listContentSlugs(contentType);
    return NextResponse.json(
      {
        error: `Could not find a content file with slug "${slug}".`,
        knownSlugs: known,
      },
      { status: 404 }
    );
  }

  const original = fs.readFileSync(filePath, "utf8");

  // Every content file in this project follows the same shape: a single
  // import line, then `export const <name> = {...};` — sometimes with an
  // explicit type annotation (guides: `: MarketingGuide`), sometimes
  // without one (two-pagers rely on inference). We preserve whichever
  // form the original file used.
  const importMatch = original.match(/^import[^\n]*\n/);
  const exportMatch = original.match(/export const (\w+)(?:\s*:\s*(\w+))?\s*=/);

  if (!importMatch || !exportMatch) {
    return NextResponse.json(
      {
        error:
          "This file doesn't match the expected 'import ... / export const X = {...}' shape, so it wasn't safe to rewrite automatically. Please edit it manually instead.",
      },
      { status: 422 }
    );
  }

  const [, identifier, typeName] = exportMatch;
  const serialized = JSON.stringify(content, null, 2);
  const typeAnnotation = typeName ? `: ${typeName}` : "";
  const newSource = `${importMatch[0]}\nexport const ${identifier}${typeAnnotation} = ${serialized};\n`;

  fs.writeFileSync(filePath, newSource, "utf8");

  return NextResponse.json({
    ok: true,
    filePath: path.relative(process.cwd(), filePath),
  });
}
