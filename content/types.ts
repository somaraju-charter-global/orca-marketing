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
  // "overlay" (default): full-bleed image behind the text with a scrim —
  // works for low-contrast/atmospheric images but can hurt legibility on
  // busy photography. "split": text on a solid panel left, image bleeds
  // the full height on the right with a soft seam. "inset": text left,
  // image as a framed card on the right with brand offset blocks — best
  // when the image is small or landscape, since it renders near native
  // size. Both fall back to overlay rendering when no image is set.
  layout?: "overlay" | "split" | "inset";
  sections?: { page: string; title: string }[];
  // Short facts about the document rendered as one line at the foot of
  // the text panel, separated by dots — e.g. ["8 use cases", "Shipment
  // exceptions to route recovery"]. Keep each item under ~8 words.
  meta?: string[];
  // Light or dark page surface. Sets sensible defaults for `background`,
  // `textColor` and `logoVariant`; explicit values for those fields still
  // win over `surface`.
  surface?: "light" | "dark";
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
  surface?: "light" | "dark";
};

export type ContentsPageContent = {
  type: "contents";
  title?: string;
  // Small label above the title — typically the guide's sector name,
  // e.g. "Logistics & Distribution deep-dive guide".
  eyebrow?: string;
  // Items render in two balanced columns. `group` is an optional section
  // label (e.g. "Ranked use cases") shown above the first item that
  // carries it; a group that crosses the column boundary repeats its
  // label at the top of the next column.
  items: { page: string; title: string; description?: string; group?: string }[];
  surface?: "light" | "dark";
};

export type DarkEditorialPageContent = {
  type: "darkEditorial";
  eyebrow?: string;
  headline: string;
  body?: string;
  // With an image: text left, photo right, callout floating over the
  // photo. Without an image: text left, full-height solid quote panel
  // right — the callout becomes the hero of the page.
  image?: string;
  // With `calloutSource` set the callout renders as an attributed
  // quotation — use a real practitioner/customer quote from the
  // research, never an invented line.
  callout?: string;
  calloutSource?: string;
  surface?: "light" | "dark";
  pageNumber?: string | number;
};

export type ImageCalloutPageContent = {
  type: "imageCallout";
  eyebrow?: string;
  headline: string;
  body?: string;
  image: string;
  callout: string;
  surface?: "light" | "dark";
  pageNumber?: string | number;
};

// The useCase page supports exactly three right-column treatments, in
// priority order: a practitioner-voice quote from field research, a
// sourced market-research stat, or a stock image. Workflow/detail blocks
// belong on useCaseDetail pages.
export type UseCaseRightContent =
  | { type: "quote"; quote: string; source?: string; citation?: { text: string; url: string } }
  | { type: "stat"; value: string; label: string; source?: string }
  | { type: "image"; src: string; alt?: string; objectFit?: "cover" | "contain" };

export type UseCasePageContent = {
  type: "useCase";
  eyebrow?: string;
  number?: string;
  title: string;
  problem: string;
  opportunity: string;
  bullets?: string[];
  rightContent?: UseCaseRightContent;
  citation?: { text: string; url: string };
  surface?: "light" | "dark";
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
  surface?: "light" | "dark";
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
  surface?: "light" | "dark";
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
  surface?: "light" | "dark";
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
  surface?: "light" | "dark";
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
  surface?: "light" | "dark";
  pageNumber?: string | number;
};

export type ClosingCtaPageContent = {
  type: "closingCta";
  headline: string;
  body: string;
  cta: string;
  website?: string;
  variant?: "dark" | "orange";
  surface?: "light" | "dark";
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
