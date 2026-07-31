import { z } from "zod";
import type { TwoPageVerticalBrief } from "@/content/onepager-types";
import { optionalImageRefSchema } from "@/lib/image-path";

export const TwoPageVerticalBriefSchema = z.object({
  layout: z.literal("two-page-vertical-brief"),
  slug: z.string().min(1),
  accentTheme: z
    .enum(["orange", "blue", "black", "green", "healthcareMist"])
    .default("healthcareMist"),
  vertical: z.string().min(1),
  audience: z.string().min(1),
  hero: z.object({
    eyebrow: z.string(),
    headline: z.string(),
    subheadline: z.string(),
  }),
  page1: z.object({
    businessCostProofPoint: z.object({
      label: z.string(),
      metric: z.string().optional(),
      statement: z.string(),
      source: z.string().optional(),
    }),
    challenge: z.object({
      title: z.string(),
      body: z.string(),
    }),
    solutionVisual: z.object({
      imagePath: optionalImageRefSchema,
    }),
    orcaworksValue: z.object({
      title: z.string(),
      items: z.array(
        z.object({
          title: z.string(),
          description: z.string(),
        })
      ),
    }),
    bottomCallout: z.object({
      title: z.string(),
      statement: z.string(),
    }),
  }),
  page2: z.object({
    title: z.string(),
    subtitle: z.string(),
    strategicBusinessPriorities: z.array(
      z.object({
        title: z.string(),
        description: z.string(),
      })
    ),
    priorityWorkflows: z.array(
      z.object({
        title: z.string(),
        description: z.string(),
      })
    ),
    valueMetrics: z.array(
      z.object({
        metric: z.string(),
        baseline: z.string(),
        movement: z.string(),
        impact: z.string(),
      })
    ),
    cta: z.object({
      statement: z.string(),
      url: z.string().optional(),
      buttonLabel: z.string().optional(),
    }),
  }),
  footer: z.object({
    website: z.string(),
  }),
});

export function validateTwoPageVerticalBrief(
  data: unknown
):
  | { success: true; data: TwoPageVerticalBrief }
  | { success: false; error: string } {
  const result = TwoPageVerticalBriefSchema.safeParse(data);
  if (!result.success) {
    const message = result.error.issues
      .map((issue: z.ZodIssue) => `${issue.path.join(".") || "root"}: ${issue.message}`)
      .join("; ");
    return { success: false, error: message };
  }
  return { success: true, data: result.data as TwoPageVerticalBrief };
}
