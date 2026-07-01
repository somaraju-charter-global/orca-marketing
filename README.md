# Orcaworks Marketing PDF Generator

A production-ready Next.js application for creating sophisticated Orcaworks marketing PDFs. This system is designed for marketing teams to create high-quality gated guides, two-pagers, use-case ebooks, sales inserts, and proposal collateral.

## Technology Stack

- **Next.js App Router** - React framework
- **React** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Playwright** - PDF generation
- **Vercel** - Hosting and preview

## Key Design Principles

This is **not** a typical responsive website. It's a fixed-size PDF/page-rendering system:

- **Page Format**: 1024px × 768px (Landscape 4:3)
- **Fixed Canvases**: Each PDF page is a fixed canvas rendered in the browser
- **Print-Optimized**: Designed for PDF export, not web browsing
- **Editorial Design**: Premium B2B SaaS marketing collateral style

## Getting Started

### Installation

```bash
npm install
```

### Initial Setup

This repository contains the PDF generation system but not the actual marketing content. To add your own content:

1. Copy `content/registry.example.ts` to `content/registry.ts`
2. Copy `content/onepager-registry.example.ts` to `content/onepager-registry.ts`
3. Copy `content/guides/template.ts` to create your guides
4. Copy `content/two-pagers/two-pager-template.ts` to create your two-pagers
5. Register your content in the registry files

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser.

### Preview Documents

**Homepage**: Navigate to `http://localhost:3000/` to see all available two-pagers and guides with links in a table of contents.

Navigate directly to:
- `http://localhost:3000/marketing/[slug]` - Guides (after adding content)
- `http://localhost:3000/two-pagers/[slug]` - Two-pager documents (after adding content)

## Adding a New Two-Pager

**Note on naming**: Two-pagers are two-page vertical briefs. You may see references to "one-pager" in type names (e.g., `TwoPageVerticalBrief`, `onepager-types.ts`). This is historical naming from when the document was a single-page format.

1. Copy `content/two-pagers/two-pager-template.ts` to create your new file (e.g., `my-two-pager.ts`)
2. Import the `TwoPageVerticalBrief` type from `../onepager-types`
3. Export your two-pager object with the required structure
4. Register it in `content/onepager-registry.ts`

Example:

```typescript
import type { TwoPageVerticalBrief } from "../onepager-types";

export const myTwoPager: TwoPageVerticalBrief = {
  layout: "two-page-vertical-brief",
  slug: "my-two-pager",
  // ... rest of the structure
};
```

Then update `content/onepager-registry.ts`:

```typescript
import { myTwoPager } from "./two-pagers/my-two-pager";

export const onePagers = {
  [myTwoPager.slug]: myTwoPager,
  // ... other two-pagers
};
```

Preview at: `http://localhost:3000/two-pagers/[slug]`

## Adding a New Guide

1. Copy `content/guides/template.ts` to create your new file (e.g., `my-new-guide.ts`)
2. Import the `MarketingGuide` type from `../types`
3. Export your guide object with the required structure
4. Register it in `content/registry.ts`

Example:

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

Then update `content/registry.ts`:

```typescript
import { myNewGuide } from "./guides/my-new-guide";

export const guides = {
  [myNewGuide.slug]: myNewGuide,
  // ... other guides
};
```

## Available Page Components

The system includes the following page types:

1. **CoverPage** - Ebook or guide cover with logo and contents
2. **ContentsPage** - Table of contents
3. **DarkEditorialPage** - Editorial page with image and callout
4. **ImageCalloutPage** - Large image-focused page with statement
5. **UseCasePage** - Repeated page for each use case
6. **QuotePage** - Single statistic, quotation, or proof point
7. **StatPage** - Large metric / impact page
8. **BeforeAfterPage** - Workflow transformation comparison
9. **RoiPage** - Business case / ROI page
10. **ClosingCtaPage** - Final CTA / closing page

See `content/types.ts` for the complete type definitions for each page type.

## Adding Images

1. Place images in `public/images/`
2. Reference them in your content files using `/images/your-image.jpg`

**Recommended Image Dimensions:**
- Full-page / hero image: at least 1800px wide
- Half-page image: at least 1200px wide
- Small image: at least 800px wide
- Logo assets: transparent PNG or SVG preferred

## PDF Generation

### Local PDF Generation

Generate a PDF from your local development server:

```bash
# Generate a specific guide (default: supply-chain-guide)
npm run pdf:local

# Generate any guide from local
npm run pdf:guide -- --url http://localhost:3000/marketing/[slug]/print --out ./exports/[filename].pdf

# Generate any two-pager from local
npm run pdf:two-pager -- --url http://localhost:3000/two-pagers/[slug]/print --out ./exports/[filename].pdf
```

**Available templates:**
- `template.ts` - Guide template (in `content/guides/`)
- `two-pager-template.ts` - Two-pager template (in `content/two-pagers/`)

Add your own content by copying these templates and registering them in the registry files.

### Custom PDF Generation

Generate a PDF from any URL:

```bash
# For guides
npm run pdf -- --url https://your-vercel-url.com/marketing/[slug]/print --out ./exports/my-guide.pdf

# For two-pagers
npm run pdf -- --url https://your-vercel-url.com/two-pagers/[slug]/print --out ./exports/my-two-pager.pdf --format onepager
```

### GitHub Action PDF Generation

1. Go to the Actions tab in your GitHub repository
2. Select "Generate Marketing PDF"
3. Click "Run workflow"
4. Provide the print route URL (e.g., `https://your-vercel-url.vercel.app/marketing/ninety-day-guide/print`)
5. Provide the output filename (e.g., `ninety-day-guide.pdf`)
6. Download the generated PDF from the artifacts

## Deploying to Vercel

1. Push your code to GitHub
2. Import the repository in Vercel
3. Deploy with default settings
4. Your marketing guides will be available at `https://your-vercel-url.vercel.app/marketing/[slug]`

## Marketing Workflow

1. **Edit Content**: Modify guide content in `content/guides/`
2. **Push to GitHub**: Commit and push changes
3. **Vercel Deploys**: Automatic preview deployment
4. **Review**: Open `/marketing/[slug]` to review visually
5. **Generate PDF**: Use GitHub Action or local command to generate final PDF

## Project Structure

```
orcaworks-marketing-pdf/
  app/
    globals.css          # Brand tokens and print CSS
    layout.tsx           # Root layout
    page.tsx             # Homepage with table of contents
    marketing/
      [slug]/
        page.tsx         # Preview route
        print/
          page.tsx       # Print route (for PDF generation)
    two-pagers/
      [slug]/
        page.tsx         # Preview route
        print/
          page.tsx       # Print route (for PDF generation)

  components/
    marketing/
      MarketingDocument.tsx  # Main renderer
      PageShell.tsx          # Base page wrapper
      CoverPage.tsx          # Cover page component
      ContentsPage.tsx       # Contents page component
      DarkEditorialPage.tsx  # Dark editorial page
      ImageCalloutPage.tsx   # Image callout page
      UseCasePage.tsx        # Use case page
      QuotePage.tsx          # Quote page
      StatPage.tsx           # Stat page
      BeforeAfterPage.tsx    # Before/after page
      RoiPage.tsx            # ROI page
      ClosingCtaPage.tsx     # Closing CTA page
      Footer.tsx             # Footer component
      BrandMotif.tsx         # Brand motif component
    onepager/
      OnePagerDocument.tsx  # Two-pager renderer
      OnePagerShell.tsx      # Two-pager wrapper
      TwoPageVerticalBrief.tsx # Two-pager layout component

  content/
    guides/
      template.ts                   # Guide template (kept in git)
      # Your guides go here (gitignored)
    two-pagers/
      two-pager-template.ts         # Two-pager template (kept in git)
      # Your two-pagers go here (gitignored)
    registry.example.ts             # Guide registry template
    onepager-registry.example.ts   # Two-pager registry template
    registry.ts                     # Your guide registry (gitignored)
    onepager-registry.ts            # Your two-pager registry (gitignored)
    types.ts                        # Guide TypeScript types
    onepager-types.ts               # Two-pager TypeScript types

  public/
    logos/
      orcaworks-white.png           # White logo
      orcaworks-dark.png            # Dark logo
    images/
      placeholder-warehouse.jpg     # Sample images
      placeholder-office.jpg
      placeholder-workflow.jpg

  scripts/
    generate-pdf.ts                 # Playwright PDF generation script

  .github/
    workflows/
      generate-pdf.yml              # GitHub Action for PDF generation
```

## Testing

The project includes unit tests for the registry system and React components using Vitest and React Testing Library.

### Running Tests

```bash
# Run tests once
npm run test:run

# Run tests in watch mode
npm run test
```

### Test Structure

- `content/__tests__/` - Tests for registry systems
- `components/marketing/__tests__/` - Tests for marketing page components
- `components/onepager/__tests__/` - Tests for two-pager components

### Adding Tests

When adding new components or content types, add corresponding tests to ensure:
- Components render correctly with required props
- Optional props are handled gracefully
- Registry entries have valid structure
- Slugs are unique

## Common Troubleshooting

**PDF generation fails**
- Ensure the dev server is running for local generation
- Check that the URL is accessible and returns the print route
- Verify Playwright is installed: `npx playwright install --with-deps chromium`

**Images not displaying**
- Check image paths are relative to `public/` directory
- Ensure images exist in the correct location
- Verify image dimensions are adequate

**Styles not applying in PDF**
- Ensure print CSS is included in `app/globals.css`
- Check that `@page` size is set correctly
- Verify `print-color-adjust: exact` is set for color preservation

**Build errors**
- Run `npm install` to ensure all dependencies are installed
- Check TypeScript errors in your content files
- Verify all imports in `content/registry.ts` are correct

## Security

The project currently has 7 vulnerabilities in development dependencies (esbuild via vite, postcss via next). These are in the build toolchain and do not affect production runtime. Addressing these requires major version updates to Next.js and Vitest which would be breaking changes. These can be addressed when planning major version updates.

To check vulnerabilities:
```bash
npm audit
```

## License

Internal use for Orcaworks marketing team.

