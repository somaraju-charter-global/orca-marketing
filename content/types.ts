export type MarketingGuide = {
  slug: string;
  title: string;
  description: string;
  pages: MarketingPage[];
};

export type CoverPageContent = {
  type: "cover";
  title: string;
  subtitle?: string;
  kicker?: string;
  logoVariant?: "white" | "dark";
  image?: string;
  sections?: { page: string; title: string }[];
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
  number: string;
  title: string;
  problem: string;
  opportunity: string;
  bullets?: string[];
  image?: string;
  quote?: string;
  source?: string;
  pageNumber?: string | number;
};

export type UseCasePageWithImageContent = {
  type: "useCaseWithImage";
  eyebrow?: string;
  number: string;
  title: string;
  problem: string;
  opportunity: string;
  bullets?: string[];
  image: string;
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
  detailText: string;
  detailColor?: "orange" | "blue" | "ink";
  pageNumber?: string | number;
};

export type QuotePageContent = {
  type: "quote";
  eyebrow?: string;
  quote: string;
  source?: string;
  supportingText?: string;
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
  title: string;
  beforeTitle?: string;
  afterTitle?: string;
  beforeItems: string[];
  afterItems: string[];
  pageNumber?: string | number;
};

export type RoiPageContent = {
  type: "roi";
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
  | UseCasePageWithImageContent
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
  | "useCaseWithImage"
  | "useCaseDetail"
  | "quote"
  | "stat"
  | "beforeAfter"
  | "roi"
  | "closingCta";
