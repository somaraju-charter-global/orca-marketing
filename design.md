# Orcaworks Marketing PDF - Design Guide

This guide explains how to create new marketing guides and one-pagers, and the available page types.

## Creating a Two-Pager

Two-pagers are two-page vertical briefs for executive summaries and quick overviews.

**Note on naming**: These are called "two-pagers" in the current implementation, but you may see references to "one-pager" in type names (e.g., `TwoPageVerticalBrief`, `onepager-types.ts`). This is historical naming from when the document was a single-page format. The document is now a two-page vertical brief.

1. **Create a new file** in `content/two-pagers/` (e.g., `my-two-pager.ts`)
2. **Import the TwoPageVerticalBrief type** from `../onepager-types`
3. **Export your two-pager object** with the required structure
4. Files are auto-discovered from the directory (no manual registration needed)

### Example Two-Pager Structure

```typescript
import type { TwoPageVerticalBrief } from "../onepager-types";

export const myTwoPager: TwoPageVerticalBrief = {
  layout: "two-page-vertical-brief",
  slug: "my-two-pager",

  vertical: "Industry",
  audience: "Target audience",

  hero: {
    eyebrow: "ORCAWORKS FOR YOUR TEAM",
    headline: "Build value in your operations with governed execution",
    subheadline: "Operations slow when documents, approvals, compliance checks, and system updates sit outside the core system — leading to delay, risk, and manual effort.",
  },

  page1: {
    businessCostProofPoint: {
      label: "The business cost",
      metric: "$X per year",
      statement: "Execution work around core systems — missing evidence, unclear ownership, manual follow-up, and unclosed exceptions — drives measurable cost and risk in [vertical] operations.",
      source: "Industry research / internal baseline",
    },

    challenge: {
      title: "The challenge",
      body: "Core systems are rarely the whole problem. The drag sits around the record: missing evidence, unclear ownership, manual follow-up, approval delays, exception closure, and system updates. These gaps accumulate into visible delays, audit exposure, and avoidable rework.",
    },

    solutionVisual: {
      imagePath: "/images/supply-chain-speed.jpg",
    },

    orcaworksValue: {
      title: "Orcaworks value to your organisation",
      items: [
        {
          title: "Works around existing systems — no replacement required",
          description: "Orcaworks governs the execution layer that sits around your ERP, WMS, CRM, or operational platforms.",
        },
        {
          title: "Governed execution with full audit trail",
          description: "Every action is checked, routed, decided, recorded, and retrievable. Not loose automation — governed execution.",
        },
        {
          title: "Capacity and headcount leverage",
          description: "Reduce manual coordination and exception chasing without adding headcount or growing the coordination layer.",
        },
        {
          title: "Future-proof as systems, workflows, and teams change",
          description: "The execution layer adapts as core systems, workflows, teams, and AI models evolve.",
        },
      ],
    },

    bottomCallout: {
      title: "The opportunity",
      statement: "Govern the execution layer around existing systems and show measurable movement in operational readiness, exception closure, and evidence control — without replacing core platforms.",
    },
  },

  page2: {
    title: "Where Orcaworks creates measurable value",
    subtitle: "Governed execution shows up in the workflows where delay, missing evidence, manual follow-up, and exception backlog are already visible.",

    strategicBusinessPriorities: [
      {
        title: "Operational readiness",
        description: "Ensure records are complete, evidence is current, and approvals are in place before execution is blocked.",
      },
      {
        title: "Exception throughput",
        description: "Move exceptions through the right decision path — checked, routed, decided, and closed — without manual chasing.",
      },
      {
        title: "Audit and compliance confidence",
        description: "Keep a retrievable record of every check, decision, approval, and exception outcome across every workflow.",
      },
      {
        title: "Capacity without headcount",
        description: "Handle more volume through governed execution without growing the coordination layer.",
      },
      {
        title: "Control as systems and teams change",
        description: "Maintain consistent execution standards as systems, suppliers, workflows, and teams evolve.",
      },
    ],

    priorityWorkflows: [
      {
        title: "Primary workflow one",
        description: "Collect documents, check completeness, route approvals, and prepare system-ready records.",
      },
      {
        title: "Primary workflow two",
        description: "Track expiring items, request updated evidence, escalate exceptions, and maintain audit-ready records.",
      },
      {
        title: "Exception handling workflow",
        description: "Compare documents, flag mismatches, route exceptions, and capture approval decisions.",
      },
      {
        title: "Response support workflow",
        description: "Collect evidence, coordinate contributors, track approvals, and prepare complete response packs.",
      },
    ],

    valueMetrics: [
      {
        metric: "Cycle time",
        today: "Hours to days per record or exception",
        indicativeImprovement: "~20–40% shorter",
        businessImpact: "Faster operational closure",
      },
      {
        metric: "Manual touches per case",
        today: "Repeated chasing across teams",
        indicativeImprovement: "~25–50% fewer",
        businessImpact: "Less chasing across teams",
      },
      {
        metric: "First-pass completeness",
        today: "Records often incomplete on first submission",
        indicativeImprovement: "~15–30 pts higher",
        businessImpact: "Fewer missing documents on arrival",
      },
      {
        metric: "Aged exceptions",
        today: "Backlog of unresolved exceptions",
        indicativeImprovement: "~20–40% fewer",
        businessImpact: "Fewer stalled decisions",
      },
      {
        metric: "Approval delay",
        today: "Submission-to-approval time varies widely",
        indicativeImprovement: "Shorter within first workflow",
        businessImpact: "Clearer routing and escalation",
      },
    ],

    cta: {
      statement: "Start around existing systems with one visible execution workflow and show measurable movement in weeks, not transformation cycles.",
      url: "https://orcaworks.com",
    },
  },

  footer: {
    website: "orcaworks.com",
  },
};
```

### Two-Pager Layout Structure

**Page 1:**

- Hero section with black background, logo, eyebrow, headline, and subheadline
- Two-column layout:
  - Left column: Business cost proof point (orange callout), Challenge description, Bottom callout
  - Right column: Solution visual (image), Orcaworks value (2x2 grid of value items)
- Footer with copyright and website

**Page 2:**

- Hero section matching Page 1 styling with title and subtitle
- Two-column layout:
  - Left column: Strategic business priorities (list with orange accent)
  - Right column: Priority workflows (numbered list)
- Value metrics table (with columns: Business metric, Today, Indicative improvement, Business impact)
- CTA section (orange callout with optional link)
- Footer

### Preview and Export for Two-Pagers

- **Homepage**: Navigate to `http://localhost:3000/` to see all available two-pagers and guides with links
- **Preview**: Navigate to `/two-pagers/[slug]` in browser
- **Print View**: Navigate to `/two-pagers/[slug]/print` for PDF generation
- **Generate PDF**: Run `npm run pdf -- --url http://localhost:3000/two-pagers/[slug]/print --out ./exports/[filename].pdf --format twopager`

## Creating a New Guide

1. **Create a new file** in `content/guides/` (e.g., `my-new-guide.ts`)
2. **Import the MarketingGuide type** from `../types`
3. **Export your guide object** with the required structure
4. **Register the guide** in `content/registry.ts`

### Example Guide Structure

```typescript
import { MarketingGuide } from "../types";

export const myNewGuide: MarketingGuide = {
  slug: "my-new-guide",
  title: "My New Guide",
  description: "A description of the guide",
  pages: [
    {
      type: "cover",
      title: "My New Guide",
      subtitle: "A compelling subtitle",
      logoVariant: "white",
    },
    // Add more pages...
  ],
};
```

### Registering the Guide

Update `content/registry.ts`:

```typescript
import { myNewGuide } from "./guides/my-new-guide";

export const guides = {
  [myNewGuide.slug]: myNewGuide,
  // ... other guides
};
```

## Available Page Types

### 1. CoverPage (`type: "cover"`)

**Layout:**

- Full-page cover with logo at top
- Large title and subtitle centered
- Optional kicker text (e.g., "Orcaworks")
- Optional table of contents sections list
- Brand motifs for visual interest
- Background can be dark or light based on logo variant

**When to Use:**

- First page of any guide or ebook
- One-pager cover
- Proposal cover page

**Required Props:**

- `title: string` - Main headline
- `subtitle?: string` - Supporting headline
- `kicker?: string` - Small text above title (e.g., brand name)
- `logoVariant?: "white" | "dark"` - Logo color for background
- `sections?: { page: string; title: string }[]` - Table of contents list

---

### 2. TitlePage (`type: "titlePage"`)

**Layout:**

- Simple centered title page
- Logo at top
- Large title and subtitle
- Optional kicker text
- Optional background image
- Clean, minimal design

**When to Use:**

- Second page after cover (when no contents page needed)
- Section title pages
- Simple dividers between major sections

**Required Props:**

- `title: string` - Main headline
- `subtitle?: string` - Supporting headline
- `kicker?: string` - Small text above title (e.g., brand name)
- `logoVariant?: "white" | "dark"` - Logo color for background
- `image?: string` - Optional background image path

---

### 3. ContentsPage (`type: "contents"`)

**Layout:**

- Clean table of contents page
- Title at top
- List of items with page numbers, titles, and optional descriptions
- Simple, editorial layout

**When to Use:**

- Second page of multi-page guides
- Any document with multiple sections
- Navigation overview

**Required Props:**

- `title?: string` - Section title (default: "Contents")
- `items: { page: string; title: string; description?: string }[]` - TOC items

---

### 3. DarkEditorialPage (`type: "darkEditorial"`)

**Layout:**

- Dark background panel with image
- Eyebrow text at top
- Large headline
- Body text
- Optional callout box with accent color
- Page number in footer

**When to Use:**

- Introduction pages
- Editorial content with strong imagery
- Setting context or framing a problem
- Storytelling sections

**Required Props:**

- `eyebrow?: string` - Small text above headline
- `headline: string` - Main heading
- `body?: string` - Body copy
- `image: string` - Image path (e.g., "/images/my-image.jpg")
- `callout?: string` - Highlighted quote or stat
- `pageNumber?: string | number` - Page number

---

### 4. ImageCalloutPage (`type: "imageCallout"`)

**Layout:**

- Large full-width or hero image
- Overlapping callout card with headline
- Optional eyebrow and body text
- Accent color border on callout
- Clean, modern layout

**When to Use:**

- Visual storytelling
- Product showcase
- Hero imagery with key message
- Brand statement pages

**Required Props:**

- `eyebrow?: string` - Small text above headline
- `headline: string` - Main heading
- `body?: string` - Body copy
- `image: string` - Image path
- `callout: string` - Highlighted text in card
- `pageNumber?: string | number` - Page number

---

### 5. UseCasePage (`type: "useCase"`)

**Layout:**

- Full-width title section with eyebrow and title
- Two-column layout (60% left, 40% right):
  - Left column: Problem section, Opportunity section, Optional bullet points
  - Right column: Flexible right-hand content (quote, image, workflow, highlight text, or detailed text)
- Problem section with muted text
- Opportunity section with blue text and larger font
- Bullet points with orange dots

**When to Use:**

- Repeated use case pages
- Problem-solution framing
- Feature-benefit explanations
- Case study summaries

**Required Props:**

- `eyebrow?: string` - Small text above title
- `number?: string` - Use case number (e.g., "01", "02")
- `title: string` - Use case title
- `problem: string` - Problem description
- `opportunity: string` - Solution description
- `bullets?: string[]` - Key benefits or features
- `rightContent?: RightHandContentType` - Content for right column (see Right-Hand Content section)
- `citation?: { text: string; url: string }` - Optional citation link
- `pageNumber?: string | number` - Page number

---

### 6. Right-Hand Content Types

The `rightContent` prop in UseCasePage and UseCaseDetail supports multiple content types:

**Quote Type:**

```typescript
{
  type: "quote",
  quote: "We reduced processing time by 80%.",
  source: "Operations Director",
  citation: { text: "View case study", url: "https://example.com/case-study" }
}
```

- Orange background card with white text
- Large quote with attribution
- Optional citation link

**Highlight Text Type:**

```typescript
{
  type: "highlightText",
  text: "80% Faster Processing",
  color: "orange" // or "blue" or "ink"
}
```

- Large bold text centered
- Color options: orange, blue, or ink
- Short impactful statements

**Detailed Text Type:**

```typescript
{
  type: "detailedText",
  text: "Longer paragraph text here...",
  color: "orange" // or "blue" or "ink"
}
```

- Colored background card with white text
- Longer descriptive text
- Color options: orange, blue, or ink

**Image Type:**

```typescript
{
  type: "image",
  src: "/images/supply-chain-speed.jpg",
  alt: "Supply chain operations",
  objectFit: "cover" // or "contain"
}
```

- Full-height image
- Object fit options: cover or contain

**Workflow Type:**

```typescript
{
  type: "workflow",
  steps: [
    { number: "1", title: "Request initiated", description: "Automated intake" },
    { number: "2", title: "Evidence gathered", description: "Document collection" },
    // ... more steps
  ]
}
```

- Vertical workflow with numbered steps
- Orange circles with step numbers
- Optional description for each step
- Connecting lines between steps

---

### 7. UseCaseDetail (`type: "useCaseDetail"`)

**Layout:**

- Full-width title section with eyebrow and title
- Two-column layout (50% each) with vertical orange separator line:
  - Left column: Sections with colored headings and descriptions
  - Right column: Flexible right-hand content (highlight text, detailed text, workflow, image, or quote)
- Sections displayed as list with colored headings
- Vertical separator line constrained to content height

**When to Use:**

- Deep dive into specific use case details
- Following a UseCase page
- Explaining complex workflows or processes
- Providing additional context and information

**Required Props:**

- `eyebrow?: string` - Small text above title
- `title: string` - Section title
- `sections: { heading: string; description: string }[]` - Array of sections with headings and descriptions
- `sectionColor?: "orange" | "blue" | "ink"` - Color for section headings (default: orange)
- `rightContent?: RightHandContentType` - Content for right column (see Right-Hand Content section)
- `citation?: { text: string; url: string }` - Optional citation link
- `pageNumber?: string | number` - Page number

---

### 8. QuotePage (`type: "quote"`)

**Layout:**

- Large centered quote
- Optional source attribution
- Optional supporting text
- Optional citation link
- Background variant (dark or orange)
- Clean, minimal design
- Great for breaking up content

**When to Use:**

- Customer testimonials
- Expert quotes
- Key statistics or proof points
- Section dividers

**Required Props:**

- `eyebrow?: string` - Small text above quote
- `quote: string` - The quote text
- `source?: string` - Attribution
- `supportingText?: string` - Additional context
- `citation?: { text: string; url: string }` - Optional citation link
- `variant?: "dark" | "orange"` - Background variant
- `pageNumber?: string | number` - Page number

---

### 9. StatPage (`type: "stat"`)

**Layout:**

- Large headline
- Grid of statistics with values, labels, and descriptions
- Big, bold numbers
- Clean data visualization
- Page number in footer

**When to Use:**

- Impact metrics
- Key statistics
- Data highlights
- Business results

**Required Props:**

- `eyebrow?: string` - Small text above headline
- `headline: string` - Section heading
- `stats: { value: string; label: string; description?: string }[]` - Statistics array
- `pageNumber?: string | number` - Page number

---

### 10. BeforeAfterPage (`type: "beforeAfter"`)

**Layout:**

- Optional eyebrow at top
- Title at top
- Two side-by-side panels
- Left panel: "Before" (red theme) with list of items
- Right panel: "After" (green theme) with list of items
- Arrow or transition indicator between panels
- Comparison-focused layout

**When to Use:**

- Workflow transformation
- Before/after comparisons
- Process improvement
- Legacy vs. modern comparison

**Required Props:**

- `eyebrow?: string` - Small text above title
- `title: string` - Page title
- `beforeTitle?: string` - Left panel title (default: "Before")
- `afterTitle?: string` - Right panel title (default: "After")
- `beforeItems: string[]` - List of "before" items
- `afterItems: string[]` - List of "after" items
- `pageNumber?: string | number` - Page number

---

### 11. RoiPage (`type: "roi"`)

**Layout:**

- Optional eyebrow at top
- Title at top
- Optional intro text
- Table or grid of metrics showing:
  - Label (metric name)
  - Baseline (current state)
  - Target (future state)
  - Impact (improvement)
- Business case focus
- Data-driven layout

**When to Use:**

- ROI analysis
- Business case justification
- Cost-benefit comparison
- Impact metrics

**Required Props:**

- `eyebrow?: string` - Small text above title
- `title: string` - Page title
- `intro?: string` - Introduction text
- `metrics: { label: string; baseline: string; target: string; impact: string }[]` - Metrics array
- `pageNumber?: string | number` - Page number

---

### 12. ClosingCtaPage (`type: "closingCta"`)

**Layout:**

- Large headline
- Body text
- Prominent CTA button or text
- Website URL
- Brand motifs
- Logos (white and dark variants)
- Background variant (dark or orange)
- Final page of guide

**When to Use:**

- Final page of any guide
- Call to action
- Next steps
- Contact information

**Required Props:**

- `headline: string` - Main CTA headline
- `body: string` - Supporting text
- `cta: string` - Call to action text
- `website?: string` - Website URL
- `variant?: "dark" | "orange"` - Background variant
- `pageNumber?: string | number` - Page number

---

## Adding Images

1. Place images in `public/images/`
2. Reference them in content files using `/images/your-image.jpg`

**Recommended Image Dimensions:**

- Full-page / hero image: at least 1800px wide
- Half-page image: at least 1200px wide
- Small image: at least 800px wide
- Logo assets: transparent PNG or SVG preferred

## Page Numbering

Most page types support an optional `pageNumber` prop. Use this to:

- Add page numbers to footers
- Help with document navigation
- Maintain consistent pagination

## Brand Colors

The system uses predefined Orcaworks brand colors:

- `--orca-bg`: White background
- `--orca-ink`: Dark text (#0f172a)
- `--orca-muted`: Muted text (#64748b)
- `--orca-dark`: Dark background (#030712)
- `--orca-orange`: Accent color (#ff4b1f)
- `--orca-blue`: Secondary accent (#2563eb)

These are automatically applied by the components.

## Best Practices

1. **Start with a cover page** - Every guide should begin with a cover
2. **Use contents page for multi-page guides** - Helps navigation
3. **Vary page types** - Mix layouts to maintain interest
4. **Keep text concise** - These are visual documents, not whitepapers
5. **Use high-quality images** - At least 1200px wide for best results
6. **Test print view** - Always check `/marketing/[slug]/print` before generating PDF
7. **Proofread carefully** - PDFs are harder to edit after generation

## Preview and Export

- **Preview**: Navigate to `/marketing/[slug]` in browser
- **Print View**: Navigate to `/marketing/[slug]/print` for PDF generation
- **Generate PDF**: Run `npm run pdf:local` or use GitHub Action
