import Anthropic from "@anthropic-ai/sdk";

let client: Anthropic | null = null;

function getClient(): Anthropic {
  if (client) return client;

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    throw new Error(
      "Missing ANTHROPIC_API_KEY environment variable. Add it to .env.local (see README)."
    );
  }

  client = new Anthropic({ apiKey });
  return client;
}

// Model used for every step of the pipeline. Centralized here so it's easy
// to swap (e.g. a cheaper/faster model for research, a stronger one for
// the final story) without touching the step prompts.
const MODEL = "claude-sonnet-4-6";

/**
 * Runs a single-turn completion and returns the plain text response.
 * Throws if the model returns no text block (e.g. only a tool call).
 */
export async function generateText(
  systemPrompt: string,
  userPrompt: string,
  maxTokens = 4096
): Promise<string> {
  const anthropic = getClient();

  const response = await anthropic.messages.create({
    model: MODEL,
    max_tokens: maxTokens,
    system: systemPrompt,
    messages: [{ role: "user", content: userPrompt }],
  });

  const textBlock = response.content.find((block) => block.type === "text");
  if (!textBlock || textBlock.type !== "text") {
    throw new Error("The model did not return any text content.");
  }

  return textBlock.text.trim();
}
