import { generateText } from "./anthropic";
import {
  BRAND_SYSTEM_PROMPT,
  buildResearchPrompt,
  buildPlanningPrompt,
  buildStoryPrompt,
  buildUseCaseGuidePrompt,
  buildTwoPageBriefPrompt,
} from "./prompts";

export const PIPELINE_STEPS = [
  "research",
  "planning",
  "story",
  "useCaseGuide",
  "twoPageBrief",
] as const;

export type PipelineStep = (typeof PIPELINE_STEPS)[number];

export const STEP_LABELS: Record<PipelineStep, string> = {
  research: "Research Reference",
  planning: "Planning Raw Material",
  story: "Story",
  useCaseGuide: "Use-Case Guide Content",
  twoPageBrief: "Two-Page Brief Content",
};

export type PipelineEvent =
  | { step: PipelineStep; status: "started" }
  | { step: PipelineStep; status: "done"; content: string }
  | { step: "complete"; status: "done" }
  | { step: "error"; message: string };

/**
 * Runs the five-step generation pipeline for a given title/concept,
 * invoking `onEvent` as each step starts and finishes so callers (e.g. an
 * API route streaming to the browser) can surface progress incrementally.
 *
 * Each step receives every prior step's output as context, matching the
 * "research -> planning -> story -> use-case guide -> two-page brief"
 * chain described in the automation spec.
 */
export async function runContentPipeline(
  title: string,
  onEvent: (event: PipelineEvent) => void
): Promise<Record<PipelineStep, string>> {
  const outputs = {} as Record<PipelineStep, string>;

  onEvent({ step: "research", status: "started" });
  outputs.research = await generateText(
    BRAND_SYSTEM_PROMPT,
    buildResearchPrompt(title)
  );
  onEvent({ step: "research", status: "done", content: outputs.research });

  onEvent({ step: "planning", status: "started" });
  outputs.planning = await generateText(
    BRAND_SYSTEM_PROMPT,
    buildPlanningPrompt(title, outputs.research)
  );
  onEvent({ step: "planning", status: "done", content: outputs.planning });

  onEvent({ step: "story", status: "started" });
  outputs.story = await generateText(
    BRAND_SYSTEM_PROMPT,
    buildStoryPrompt(title, outputs.research, outputs.planning),
    8192
  );
  onEvent({ step: "story", status: "done", content: outputs.story });

  onEvent({ step: "useCaseGuide", status: "started" });
  outputs.useCaseGuide = await generateText(
    BRAND_SYSTEM_PROMPT,
    buildUseCaseGuidePrompt(title, outputs.research, outputs.planning, outputs.story),
    8192
  );
  onEvent({
    step: "useCaseGuide",
    status: "done",
    content: outputs.useCaseGuide,
  });

  onEvent({ step: "twoPageBrief", status: "started" });
  outputs.twoPageBrief = await generateText(
    BRAND_SYSTEM_PROMPT,
    buildTwoPageBriefPrompt(
      title,
      outputs.research,
      outputs.planning,
      outputs.story,
      outputs.useCaseGuide
    ),
    4096
  );
  onEvent({
    step: "twoPageBrief",
    status: "done",
    content: outputs.twoPageBrief,
  });

  onEvent({ step: "complete", status: "done" });

  return outputs;
}
