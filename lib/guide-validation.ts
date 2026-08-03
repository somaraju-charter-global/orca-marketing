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

const citationSchema = z.object({
  text: z.string(),
  url: z.string(),
});

const rightHandContentSchema = z.discriminatedUnion("type", [
  z.object({
    type: z.literal("quote"),
    quote: z.string(),
    source: z.string().optional(),
    citation: citationSchema.optional(),
  }),
  z.object({
    type: z.literal("highlightText"),
    text: z.string(),
    color: z.enum(["orange", "blue", "ink"]).optional(),
  }),
  z.object({
    type: z.literal("detailedText"),
    text: z.string(),
    color: z.enum(["orange", "blue", "ink", "healthcareMist", "black", "green"]).optional(),
  }),
  z.object({
    type: z.literal("image"),
    src: imageRefSchema,
    alt: z.string().optional(),
    objectFit: z.enum(["cover", "contain"]).optional(),
  }),
  z.object({
    type: z.literal("workflow"),
    steps: z.array(
      z.object({
        number: z.string(),
        title: z.string(),
        description: z.string().optional(),
      })
    ),
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
  sections: z.array(z.object({ page: z.string(), title: z.string() })).optional(),
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
  pageNumber: stringOrNumber.optional(),
});

const contentsPageSchema = z.object({
  type: z.literal("contents"),
  title: z.string().optional(),
  items: z.array(
    z.object({
      page: z.string(),
      title: z.string(),
      description: z.string().optional(),
    })
  ),
  pageNumber: stringOrNumber.optional(),
});

const darkEditorialPageSchema = z.object({
  type: z.literal("darkEditorial"),
  eyebrow: z.string().optional(),
  headline: z.string(),
  body: z.string().optional(),
  image: imageRefSchema,
  callout: z.string().optional(),
  pageNumber: stringOrNumber.optional(),
});

const imageCalloutPageSchema = z.object({
  type: z.literal("imageCallout"),
  eyebrow: z.string().optional(),
  headline: z.string(),
  body: z.string().optional(),
  image: imageRefSchema,
  callout: z.string(),
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
  rightContent: rightHandContentSchema.optional(),
  citation: citationSchema.optional(),
  pageNumber: stringOrNumber.optional(),
});

const useCaseDetailPageSchema = z.object({
  type: z.literal("useCaseDetail"),
  eyebrow: z.string().optional(),
  title: z.string(),
  sections: z.array(
    z.object({ heading: z.string(), description: z.string() })
  ),
  sectionColor: z.enum(["orange", "blue", "ink"]).optional(),
  rightContent: rightHandContentSchema.optional(),
  citation: citationSchema.optional(),
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
  pageNumber: stringOrNumber.optional(),
});

const statPageSchema = z.object({
  type: z.literal("stat"),
  eyebrow: z.string().optional(),
  headline: z.string(),
  stats: z.array(
    z.object({
      value: z.string(),
      label: z.string(),
      description: z.string().optional(),
    })
  ),
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
  pageNumber: stringOrNumber.optional(),
});

const closingCtaPageSchema = z.object({
  type: z.literal("closingCta"),
  headline: z.string(),
  body: z.string(),
  cta: z.string(),
  website: z.string().optional(),
  variant: z.enum(["dark", "orange"]).optional(),
  pageNumber: stringOrNumber.optional(),
});

const marketingPageSchema = z.discriminatedUnion("type", [
  coverPageSchema,
  titlePageSchema,
  contentsPageSchema,
  darkEditorialPageSchema,
  imageCalloutPageSchema,
  useCasePageSchema,
  useCaseDetailPageSchema,
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
  return { success: true, data: result.data as MarketingGuide };
}
