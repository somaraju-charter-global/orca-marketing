export type RightHandContentType = 
  | { type: "quote"; quote: string; source?: string; citation?: { text: string; url: string } }
  | { type: "highlightText"; text: string; color?: "orange" | "blue" | "ink" }
  | { type: "detailedText"; text: string; color?: "orange" | "blue" | "ink" | "healthcareMist" | "black" | "green" }
  | { type: "image"; src: string; alt?: string; objectFit?: "cover" | "contain" }
  | { type: "workflow"; steps: { number: string; title: string; description?: string }[] };

export type MarketingGuide = {
  slug: string;
  title: string;
  description: string;
  // Set once to theme every block in this guide that doesn't explicitly
  // set its own color. Leave unset to keep the original per-block defaults.
  accentTheme?: "orange" | "blue" | "healthcareMist" | "black" | "green";
  pages: MarketingPage[];
};

export type CoverPageContent = {
  type: "cover";
  title: string;
  subtitle?: string;
  kicker?: string;
  logoVariant?: "white" | "dark";
  image?: string;
  // "fade" (default): dims the image to 30% and washes it into `background`
  // at the edges — meant for photographic hero images on a dark cover.
  // "plain": shows the image at full opacity with no wash — use this for
  // light decorative/pattern art (like a subtle background texture), which
  // would otherwise get washed out to near-invisibility by the fade.
  imageTreatment?: "fade" | "plain";
  sections?: { page: string; title: string }[];
  // Optional per-page overrides. When set, these win over the guide-level
  // accentTheme (and the default dark-panel look) for this page only —
  // every other page keeps using the guide's theme as normal. If you set
  // a light `background`, you'll likely also want `logoVariant: "dark"`
  // so the logo stays visible.
  background?: string;
  textColor?: string;
};

export type TitlePageContent = {
  type: "titlePage";
  title: string;
  subtitle?: string;
  kicker?: string;
  logoVariant?: "white" | "dark";
  image?: string;
};

export type ContentsPageContent = {
  type: "contents";
  title?: string;
  items: { page: string; title: string; description?: string }[];
};

export type DarkEditorialPageContent = {
  type: "darkEditorial";
  eyebrow?: string;
  headline: string;
  body?: string;
  image: string;
  callout?: string;
  pageNumber?: string | number;
};

export type ImageCalloutPageContent = {
  type: "imageCallout";
  eyebrow?: string;
  headline: string;
  body?: string;
  image: string;
  callout: string;
  pageNumber?: string | number;
};

export type UseCasePageContent = {
  type: "useCase";
  eyebrow?: string;
  number?: string;
  title: string;
  problem: string;
  opportunity: string;
  bullets?: string[];
  rightContent?: RightHandContentType;
  citation?: { text: string; url: string };
  pageNumber?: string | number;
};

export type UseCaseDetailContent = {
  type: "useCaseDetail";
  eyebrow?: string;
  title: string;
  sections: {
    heading: string;
    description: string;
  }[];
  sectionColor?: "orange" | "blue" | "ink";
  rightContent?: RightHandContentType;
  citation?: { text: string; url: string };
  pageNumber?: string | number;
};

export type QuotePageContent = {
  type: "quote";
  eyebrow?: string;
  quote: string;
  source?: string;
  supportingText?: string;
  citation?: { text: string; url: string };
  variant?: "dark" | "orange";
  pageNumber?: string | number;
};

export type StatPageContent = {
  type: "stat";
  eyebrow?: string;
  headline: string;
  stats: {
    value: string;
    label: string;
    description?: string;
  }[];
  pageNumber?: string | number;
};

export type BeforeAfterPageContent = {
  type: "beforeAfter";
  eyebrow?: string;
  title: string;
  beforeTitle?: string;
  afterTitle?: string;
  beforeItems: string[];
  afterItems: string[];
  pageNumber?: string | number;
};

export type RoiPageContent = {
  type: "roi";
  eyebrow?: string;
  title: string;
  intro?: string;
  metrics: {
    label: string;
    baseline: string;
    target: string;
    impact: string;
  }[];
  pageNumber?: string | number;
};

export type ClosingCtaPageContent = {
  type: "closingCta";
  headline: string;
  body: string;
  cta: string;
  website?: string;
  variant?: "dark" | "orange";
  pageNumber?: string | number;
};

export type MarketingPage =
  | CoverPageContent
  | TitlePageContent
  | ContentsPageContent
  | DarkEditorialPageContent
  | ImageCalloutPageContent
  | UseCasePageContent
  | UseCaseDetailContent
  | QuotePageContent
  | StatPageContent
  | BeforeAfterPageContent
  | RoiPageContent
  | ClosingCtaPageContent;

export type MarketingPageType =
  | "cover"
  | "titlePage"
  | "contents"
  | "darkEditorial"
  | "imageCallout"
  | "useCase"
  | "useCaseDetail"
  | "quote"
  | "stat"
  | "beforeAfter"
  | "roi"
  | "closingCta";
