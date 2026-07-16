/**
 * Placeholder generator used while the JSON import/storage feature is being
 * built out. To enable real AI generation, install `@anthropic-ai/sdk` and set
 * `ANTHROPIC_API_KEY` in `.env.local`.
 */
export async function generateText(
  systemPrompt: string,
  userPrompt: string,
  _maxTokens = 4096
): Promise<string> {
  // Silence unused-parameter lint for the placeholder.
  void systemPrompt;
  void _maxTokens;

  return `AI content generation is not configured. Set ANTHROPIC_API_KEY to enable it.\n\nPrompt preview:\n${userPrompt.slice(0, 500)}`;
}
