import { z } from "zod";
import type { MarketingGuide } from "@/content/types";
import { imageRefSchema, optionalImageRefSchema } from "@/lib/image-path";

const stringOrNumber = z.union([z.string(), z.number()]);

const accentThemeSchema = z.enum([
  "orange",
  "blue",
  "healthcareMist",
  "black",
  "green",
]).optional();

const surfaceSchema = z.enum(["light", "dark"]).optional();

const citationSchema = z.object({
  text: z.string(),
  url: z.string(),
});

// useCase pages support exactly three right-column treatments, in
// priority order: practitioner quote (field research), sourced market
// stat, or stock image. Workflow and text blocks are useCaseDetail-only.
const useCaseRightContentSchema = z.discriminatedUnion("type", [
  z.object({
    type: z.literal("quote"),
    quote: z.string(),
    source: z.string().optional(),
    presentation: z.enum(["card", "band", "bare"]).optional(),
    citation: citationSchema.optional(),
  }),
  z.object({
    type: z.literal("stat"),
    value: z.string(),
    label: z.string(),
    source: z.string().optional(),
  }),
  z.object({
    type: z.literal("image"),
    src: imageRefSchema,
    alt: z.string().optional(),
    objectFit: z.enum(["cover", "contain"]).optional(),
  }),
]);

const coverPageSchema = z.object({
  type: z.literal("cover"),
  title: z.string(),
  subtitle: z.string().optional(),
  kicker: z.string().optional(),
  logoVariant: z.enum(["white", "dark"]).optional(),
  image: optionalImageRefSchema,
  imageTreatment: z.enum(["fade", "plain"]).optional(),
  layout: z.enum(["overlay", "split", "inset"]).optional(),
  sections: z.array(z.object({ page: z.string(), title: z.string() })).optional(),
  meta: z.array(z.string()).optional(),
  surface: surfaceSchema,
  background: z.string().optional(),
  textColor: z.string().optional(),
  pageNumber: stringOrNumber.optional(),
});

const titlePageSchema = z.object({
  type: z.literal("titlePage"),
  title: z.string(),
  subtitle: z.string().optional(),
  kicker: z.string().optional(),
  logoVariant: z.enum(["white", "dark"]).optional(),
  image: optionalImageRefSchema,
  surface: surfaceSchema,
  pageNumber: stringOrNumber.optional(),
});

const contentsPageSchema = z.object({
  type: z.literal("contents"),
  title: z.string().optional(),
  eyebrow: z.string().optional(),
  items: z.array(
    z.object({
      page: z.string(),
      title: z.string(),
      description: z.string().optional(),
      group: z.string().optional(),
    })
  ),
  surface: surfaceSchema,
  pageNumber: stringOrNumber.optional(),
});

const darkEditorialPageSchema = z.object({
  type: z.literal("darkEditorial"),
  eyebrow: z.string().optional(),
  headline: z.string(),
  body: z.string().optional(),
  image: optionalImageRefSchema,
  callout: z.string().optional(),
  calloutSource: z.string().optional(),
  surface: surfaceSchema,
  pageNumber: stringOrNumber.optional(),
});

const imageCalloutPageSchema = z.object({
  type: z.literal("imageCallout"),
  eyebrow: z.string().optional(),
  headline: z.string(),
  body: z.string().optional(),
  image: imageRefSchema,
  callout: z.string(),
  surface: surfaceSchema,
  pageNumber: stringOrNumber.optional(),
});

const useCasePageSchema = z.object({
  type: z.literal("useCase"),
  eyebrow: z.string().optional(),
  number: z.string().optional(),
  title: z.string(),
  problem: z.string(),
  opportunity: z.string(),
  bullets: z.array(z.string()).optional(),
  rightContent: useCaseRightContentSchema.optional(),
  citation: citationSchema.optional(),
  surface: surfaceSchema,
  pageNumber: stringOrNumber.optional(),
});

// "The Case in Action" — Option A. A blindingly simple split page:
// left = minimal visual (a few signals converging into one insight,
// then a single action panel), right = headline + short explanation +
// three value points.
const caseInActionPageSchema = z.object({
  type: z.literal("caseInAction"),
  eyebrow: z.string().max(80).optional(),
  // The big statement at the top of the right column.
  headline: z.string().max(120),
  explanation: z.string().max(280),
  valuePoints: z
    .array(
      z.object({
        title: z.string().max(40),
        description: z.string().max(110),
        icon: z.string().optional(),
      })
    )
    .min(1)
    .max(3),
  visual: z.object({
    signals: z
      .array(
        z.object({
          name: z.string().max(40),
          detail: z.string().max(90),
          icon: z.string().optional(),
        })
      )
      .min(2)
      .max(4),
    // 2–3 mini-workflow steps the signals resolve into; `alert` marks
    // the highlighted exception step (rendered soft-red).
    steps: z
      .array(
        z.object({
          label: z.string().max(60),
          alert: z.boolean().optional(),
        })
      )
      .min(2)
      .max(3),
    action: z.object({
      title: z.string().max(50),
      items: z
        .array(z.object({ label: z.string().max(50), icon: z.string().optional() }))
        .min(1)
        .max(4),
    }),
  }),
  citation: citationSchema.optional(),
  surface: surfaceSchema,
  pageNumber: stringOrNumber.optional(),
});

// "The Operational Transformation" — Option B.
const transformationStepSchema = z.object({
  label: z.string().max(80),
  detail: z.string().max(110).optional(),
});

const operationalTransformationPageSchema = z.object({
  type: z.literal("operationalTransformation"),
  eyebrow: z.string().max(80).optional(),
  headline: z.string().max(120),
  introduction: z.string().max(220).optional(),
  currentProcess: z.object({
    steps: z.array(transformationStepSchema).min(3).max(5),
  }),
  futureProcess: z.object({
    steps: z.array(transformationStepSchema).min(3).max(5),
  }),
  shift: z.object({
    statement: z.string().max(160),
    description: z.string().max(200).optional(),
  }),
  value: z.object({
    outcomes: z.array(z.string().max(60)).min(1).max(3),
  }),
  citation: citationSchema.optional(),
  surface: surfaceSchema,
  pageNumber: stringOrNumber.optional(),
});

const quotePageSchema = z.object({
  type: z.literal("quote"),
  eyebrow: z.string().optional(),
  quote: z.string(),
  source: z.string().optional(),
  supportingText: z.string().optional(),
  citation: citationSchema.optional(),
  variant: z.enum(["dark", "orange"]).optional(),
  surface: surfaceSchema,
  pageNumber: stringOrNumber.optional(),
});

const statPageSchema = z.object({
  type: z.literal("stat"),
  eyebrow: z.string().optional(),
  headline: z.string(),
  // The layout is a single 3-column row — a fourth stat wraps.
  stats: z
    .array(
      z.object({
        value: z.string(),
        label: z.string(),
        description: z.string().optional(),
      })
    )
    .min(1)
    .max(3),
  surface: surfaceSchema,
  pageNumber: stringOrNumber.optional(),
});

const beforeAfterPageSchema = z.object({
  type: z.literal("beforeAfter"),
  eyebrow: z.string().optional(),
  title: z.string(),
  beforeTitle: z.string().optional(),
  afterTitle: z.string().optional(),
  beforeItems: z.array(z.string()),
  afterItems: z.array(z.string()),
  surface: surfaceSchema,
  pageNumber: stringOrNumber.optional(),
});

const roiPageSchema = z.object({
  type: z.literal("roi"),
  eyebrow: z.string().optional(),
  title: z.string(),
  intro: z.string().optional(),
  metrics: z.array(
    z.object({
      label: z.string(),
      baseline: z.string(),
      target: z.string(),
      impact: z.string(),
    })
  ),
  surface: surfaceSchema,
  pageNumber: stringOrNumber.optional(),
});

const closingCtaPageSchema = z.object({
  type: z.literal("closingCta"),
  headline: z.string(),
  body: z.string(),
  cta: z.string(),
  website: z.string().optional(),
  variant: z.enum(["dark", "orange"]).optional(),
  surface: surfaceSchema,
  pageNumber: stringOrNumber.optional(),
});

const marketingPageSchema = z.discriminatedUnion("type", [
  coverPageSchema,
  titlePageSchema,
  contentsPageSchema,
  darkEditorialPageSchema,
  imageCalloutPageSchema,
  useCasePageSchema,
  caseInActionPageSchema,
  operationalTransformationPageSchema,
  quotePageSchema,
  statPageSchema,
  beforeAfterPageSchema,
  roiPageSchema,
  closingCtaPageSchema,
]);

export const MarketingGuideSchema = z.object({
  slug: z.string().min(1),
  title: z.string(),
  description: z.string(),
  accentTheme: accentThemeSchema,
  pages: z.array(marketingPageSchema),
});

export function validateMarketingGuide(
  data: unknown
):
  | { success: true; data: MarketingGuide }
  | { success: false; error: string } {
  const result = MarketingGuideSchema.safeParse(data);
  if (!result.success) {
    const message = result.error.issues
      .map((issue) => `${issue.path.join(".") || "root"}: ${issue.message}`)
      .join("; ");
    return { success: false, error: message };
  }

  // Document-length rule: a deep-dive guide covers at most six ranked
  // use cases. More than that makes the document unwieldy and crowds
  // the contents page — rank the extras out rather than adding pages.
  const useCaseCount = result.data.pages.filter((p) => p.type === "useCase").length;
  if (useCaseCount > 6) {
    return {
      success: false,
      error: `Guide has ${useCaseCount} "useCase" pages; a deep-dive guide supports at most 6. Keep the six highest-ranked cases and drop the rest.`,
    };
  }

  return { success: true, data: result.data as MarketingGuide };
}
