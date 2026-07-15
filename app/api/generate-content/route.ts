import { NextRequest, NextResponse } from "next/server";
import { runContentPipeline } from "@/lib/ai-content/pipeline";

// Calls the Anthropic API multiple times per request and can run for a
// while, so this must be a real Node.js server function, not Edge.
export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const title: string | undefined = body?.title?.trim();

  if (!title) {
    return NextResponse.json(
      { error: "Request must include a non-empty 'title'." },
      { status: 400 }
    );
  }

  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      function send(event: unknown) {
        controller.enqueue(encoder.encode(`${JSON.stringify(event)}\n`));
      }

      try {
        await runContentPipeline(title, send);
      } catch (error) {
        send({
          step: "error",
          message:
            error instanceof Error ? error.message : "Content generation failed.",
        });
      } finally {
        controller.close();
      }
    },
  });

  return new NextResponse(stream, {
    status: 200,
    headers: {
      "Content-Type": "application/x-ndjson; charset=utf-8",
      "Cache-Control": "no-cache, no-transform",
    },
  });
}
