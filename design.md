# Orcaworks Marketing PDF - Design Guide

This guide explains how to create new marketing guides and the available page types.

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
- Numbered header (e.g., "01")
- Title
- Problem section (red/pink background)
- Opportunity section (green/blue background)
- Optional bullet points
- Optional image or quote panel on right
- Two-column layout

**When to Use:**
- Repeated use case pages
- Problem-solution framing
- Feature-benefit explanations
- Case study summaries

**Required Props:**
- `eyebrow?: string` - Small text above title
- `number: string` - Use case number (e.g., "01", "02")
- `title: string` - Use case title
- `problem: string` - Problem description
- `opportunity: string` - Solution description
- `bullets?: string[]` - Key benefits or features
- `image?: string` - Optional image path
- `quote?: string` - Optional customer quote
- `source?: string` - Quote attribution
- `pageNumber?: string | number` - Page number

---

### 6. UseCasePageWithImage (`type: "useCaseWithImage"`)

**Layout:**
- Same as UseCasePage but always displays an image
- Two-column layout with text on left (60%)
- Full-bleed image on right (40%) from top to bottom
- Eyebrow text, title, problem, opportunity, and bullets on left
- Image fills entire right column height
- Text content vertically centered

**When to Use:**
- Use cases with strong visual components
- Product feature showcases
- When imagery is essential to the use case
- Visual storytelling

**Required Props:**
- `eyebrow?: string` - Small text above title
- `number: string` - Use case number (e.g., "01", "02")
- `title: string` - Use case title
- `problem: string` - Problem description
- `opportunity: string` - Solution description
- `bullets?: string[]` - Key benefits or features
- `image: string` - Image path (required)
- `pageNumber?: string | number` - Page number

---

### 7. UseCaseDetail (`type: "useCaseDetail"`)

**Layout:**
- Split layout with vertical separator
- Left column (50%): eyebrow, title, and sections
- Right column (50%): large bold colored detail text
- Each section has bold/colored heading with description
- Both columns vertically centered
- Clean, focused layout for deep dives

**When to Use:**
- Deep dive into specific use case details
- Following a UseCase or UseCasePageWithImage
- Explaining complex workflows or processes
- Providing additional context and information

**Required Props:**
- `eyebrow?: string` - Small text above title
- `title: string` - Section title
- `sections: { heading: string; description: string }[]` - Array of sections with headings and descriptions
- `detailText: string` - Large text displayed on right side
- `detailColor?: "orange" | "blue" | "ink"` - Color for headings and detail text (default: orange)
- `pageNumber?: string | number` - Page number

---

### 8. QuotePage (`type: "quote"`)

**Layout:**
- Large centered quote
- Optional source attribution
- Optional supporting text
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
- `title: string` - Page title
- `beforeTitle?: string` - Left panel title (default: "Before")
- `afterTitle?: string` - Right panel title (default: "After")
- `beforeItems: string[]` - List of "before" items
- `afterItems: string[]` - List of "after" items
- `pageNumber?: string | number` - Page number

---

### 11. RoiPage (`type: "roi"`)

**Layout:**
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
