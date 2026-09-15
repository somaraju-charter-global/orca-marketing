// -----------------------------------------------------------------------
// NOTE: These prompts are placeholders based on this project's existing
// content structure (see content/types.ts and content/onepager-types.ts),
// NOT your manager's approved prompt. Once you share the actual
// specification / ChatGPT workflow, replace the prompt bodies below —
// the pipeline plumbing (lib/ai-content/pipeline.ts, the API route, and
// the UI) doesn't need to change.
// -----------------------------------------------------------------------

export const BRAND_SYSTEM_PROMPT = `You are a senior B2B content strategist writing for Orcaworks, a software company that sells "governed execution" tooling for operations-heavy industries (retail supply chain, healthcare operations, etc.).

Voice and style:
- Confident, precise, editorial B2B tone — not hype-y marketing copy.
- Lead with the operational problem before the product.
- Prefer concrete detail (named workflows, roles, systems, numbers) over vague claims.
- Every stat or claim should be flagged with a [source needed] tag if it isn't clearly common knowledge — never invent a citation.
- Write in Markdown.`;

export function buildResearchPrompt(title: string): string {
  return `Produce a "Research Reference" document for a piece of marketing content titled or themed:

"${title}"

Structure the markdown with these sections:
## Topic Summary
A 3-5 sentence framing of the concept and why it matters right now.

## Target Audience
Who this content is for (roles, seniority, industry) and what they care about.

## Key Themes
5-8 bullet points on the operational themes, trends, or pain points this topic touches.

## Supporting Data Points
A bulleted list of relevant stats or facts. Mark anything you are not certain of with [source needed] rather than fabricating a citation.

## Competitive / Market Context
2-3 bullet points on how this topic is typically discussed in the market today, and what gap Orcaworks-style positioning can fill.

Keep it factual and reference-oriented — this is raw material for planning, not finished prose.`;
}

export function buildPlanningPrompt(title: string, research: string): string {
  return `Using the research reference below, produce a "Planning Raw Material" document for content titled/themed:

"${title}"

## Research Reference
${research}

Structure your output as markdown with these sections:
## Core Narrative
1-2 sentences: the single throughline this content should argue.

## Key Messages
3-5 bullet points, each a message the content must land.

## Proposed Structure
An ordered outline of sections/pages this content will eventually become, with a one-line purpose for each (this will later map onto: cover, problem framing, 2-4 use cases, proof/quote or stat, ROI/before-after, closing CTA).

## Use Cases to Feature
2-4 concrete use cases (name, the operational problem, the opportunity Orcaworks-style software creates), each with enough detail to be expanded into a full page later.

## Risks / Things to Avoid
Anything the writer should be careful not to overclaim or oversimplify.`;
}

export function buildStoryPrompt(
  title: string,
  research: string,
  planning: string
): string {
  return `Using the planning material below, write the full "Story" — the narrative draft of the content, in prose, before it gets chunked into page layouts.

Title/Concept: "${title}"

## Research Reference
${research}

## Planning Raw Material
${planning}

Write a complete narrative draft in markdown with clear ## headings per section (following the "Proposed Structure" from planning). This should read as finished editorial prose — the actual words a reader would see — not bullet notes. Aim for something a designer could later drop directly into page templates.`;
}

export function buildUseCaseGuidePrompt(
  title: string,
  research: string,
  planning: string,
  story: string
): string {
  return `Convert the story below into "Use-Case Guide Content" — a page-by-page content plan for a multi-page landscape guide (matching this project's MarketingGuide page types: cover, titlePage, contents, darkEditorial, imageCallout, useCase, useCaseDetail, quote, stat, beforeAfter, roi, closingCta).

Title/Concept: "${title}"

## Story
${story}

Output markdown structured as one \`###\` heading per page, in order, e.g.:

### Page 1 — cover
- title:
- subtitle:
- kicker:

### Page 2 — darkEditorial
- eyebrow:
- headline:
- body:
- callout:

...and so on for every page, using only the field names that page type supports. Include 2-4 useCase / useCaseDetail pages drawn from the "Use Cases to Feature" in planning, plus a quote or stat page, and end with closingCta. Keep field values final-draft quality (ready to paste into content), not placeholders.

## Research Reference (for stats/citations)
${research}

## Planning Raw Material (for structure reference)
${planning}`;
}

export function buildTwoPageBriefPrompt(
  title: string,
  research: string,
  planning: string,
  story: string,
  useCaseGuide: string
): string {
  return `Condense the content below into "Two-Page Brief Content" — matching this project's TwoPageVerticalBrief structure (a two-page vertical executive brief).

Title/Concept: "${title}"

## Story
${story}

## Use-Case Guide Content (for reference — do not just copy, condense)
${useCaseGuide}

Output markdown with this exact structure:

### Hero
- eyebrow:
- headline:
- subheadline:

### Page 1
- businessCostProofPoint: (label, metric, statement, source)
- challenge: (title, body)
- orcaworksValue: (title, 3 items each with title + description)
- bottomCallout: (title, statement)

### Page 2
- title:
- subtitle:
- strategicBusinessPriorities: (2-3 items, each title + description)
- priorityWorkflows: (2-3 items, each title + description)
- valueMetrics: (2-3 rows, each metric / today / indicativeImprovement / businessImpact — the improvement is a best-guess range, e.g. "~30–50% faster"; the column heading already says "Indicative improvement", so do not repeat the word in the cell)
- cta: (statement)

Keep every field tight — this is a two-page brief, not the full guide. Prefer the single strongest proof point and use case over trying to fit everything.

## Research Reference (for the proof point / metrics)
${research}

## Planning Raw Material (for the core narrative)
${planning}`;
}
