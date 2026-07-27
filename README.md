# Orcaworks Marketing PDF Generator

A production-ready Next.js application for creating sophisticated Orcaworks marketing PDFs. This system is designed for marketing teams to create high-quality gated guides, two-pagers, use-case ebooks, sales inserts, and proposal collateral.

## Technology Stack

- **Next.js App Router** - React framework
- **React** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Playwright** - Local PDF generation fallback
- **puppeteer-core + @sparticuz/chromium** - Serverless PDF generation on Vercel
- **Vercel Blob** - JSON and PDF storage
- **NextAuth v5 / Auth.js** - Auth0 OAuth login
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
npx next dev -p 3011
```

Open [http://localhost:3011](http://localhost:3011) with your browser.

Use a different port if 3011 is already in use, e.g. `npx next dev -p 3012`.

### Preview Documents

**Homepage**: Navigate to `http://localhost:3011/` to see all available two-pagers and guides with links in a table of contents.

Navigate directly to:
- `http://localhost:3011/marketing/[slug]` - Guides (after adding content)
- `http://localhost:3011/two-pagers/[slug]` - Two-pager documents (after adding content)

## JSON Import and Storage

Two-pager content can be uploaded as JSON and is persisted to **Vercel Blob** when `BLOB_READ_WRITE_TOKEN` is configured. If no token is set, the app falls back to a local dev store under `local-blob/` so uploads still work for local development.

### Upload a single two-pager

- Go to `http://localhost:3011/upload`
- Select a JSON file that matches the `TwoPageVerticalBrief` schema
- Preview the content, edit inline, and click **Save**
- The saved two-pager appears on the homepage immediately (the homepage is rendered on demand, so new uploads are visible on refresh)

### Manage uploaded files

- Go to `http://localhost:3011/manage`
- View all uploaded JSONs and PDFs
- Download individual files or entire archives
- Bulk upload more `.json` and `.pdf` files
- Delete files

### Local development fallback

When `BLOB_READ_WRITE_TOKEN` is empty or missing, uploaded JSONs and PDFs are saved under `local-blob/jsons/` and `local-blob/pdfs/` and served through `app/api/local-blob/[...path]/route.ts`. The `local-blob/` directory is gitignored. Set `BLOB_READ_WRITE_TOKEN` in production to use Vercel Blob instead.

### Static content fallback

Static two-pagers in `content/two-pagers/` still work as a fallback. If a slug exists in both the uploaded store and the static registry, the uploaded version takes precedence. Static guides are unaffected.

### Authentication

Uploading, managing, and generating PDFs require signing in with Auth0. Set the NextAuth environment variables in `.env.local` first.

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

Preview at: `http://localhost:3011/two-pagers/[slug]`

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

### In-app PDF generation

Open any document and click the **Generate PDF** button. This calls the
`/api/generate-pdf` route, which uses `puppeteer-core` and `@sparticuz/chromium`
for serverless PDF generation on Vercel. The route falls back to Playwright when
running locally.

### Local PDF generation from the command line

```bash
# Generate a specific guide (default: supply-chain-guide)
npm run pdf:local

# Generate any guide from local
npm run pdf:guide -- --url http://localhost:3011/marketing/[slug]/print --out ./exports/[filename].pdf

# Generate any two-pager from local
npm run pdf:two-pager -- --url http://localhost:3011/two-pagers/[slug]/print --out ./exports/[filename].pdf
```

**Available templates:**
- `template.ts` - Guide template (in `content/guides/`)
- `two-pager-template.ts` - Two-pager template (in `content/two-pagers/`)

Add your own content by copying these templates and registering them in the registry files.

### Custom PDF generation from any URL

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

1. **Set up Auth0 Application**:
   - Go to [Auth0 Dashboard](https://manage.auth0.com/)
   - Create a new **Regular Web Application**
   - Set **Allowed Callback URLs**:
     - `http://localhost:3011/api/auth/callback/auth0` for local development
     - `https://<your-vercel-domain>/api/auth/callback/auth0` for production
   - Set **Allowed Logout URLs**:
     - `http://localhost:3011` for local development
     - `https://<your-vercel-domain>` for production
   - Copy **Domain**, **Client ID**, and **Client Secret**

2. Copy `.env.template` to `.env.local` and fill in:
   - `BLOB_READ_WRITE_TOKEN` – from Vercel Blob (required for production; the local `local-blob/` fallback works in dev)
   - `AUTH_SECRET` or `NEXTAUTH_SECRET` – generate a random string (use `openssl rand -base64 32`)
   - `AUTH0_ISSUER` – your Auth0 tenant domain (e.g., `https://your-tenant.auth0.com`)
   - `AUTH0_CLIENT_ID` – from Auth0 application
   - `AUTH0_CLIENT_SECRET` – from Auth0 application

3. Push your code to GitHub

4. Import the repository in Vercel

5. Add the same environment variables in Vercel's project settings:
   - `BLOB_READ_WRITE_TOKEN`
   - `AUTH_SECRET`
   - `AUTH0_ISSUER`
   - `AUTH0_CLIENT_ID`
   - `AUTH0_CLIENT_SECRET`

6. Deploy with default settings

7. Your marketing guides will be available at:
   - `https://your-vercel-url.vercel.app/marketing/[slug]` - Guides
   - `/two-pagers/[slug]` - Two-pagers
   - `/upload` - Upload interface
   - `/manage` - Management UI

## Environment Variables

| Variable | Required | Description | Example |
|----------|----------|-------------|---------|
| `BLOB_READ_WRITE_TOKEN` | Yes (production) | Vercel Blob storage token | `vercel_blob_token_...` |
| `AUTH_SECRET` | Yes | NextAuth secret for session encryption | `random-secret-string` |
| `AUTH0_ISSUER` | Yes | Auth0 tenant URL | `https://your-tenant.auth0.com` |
| `AUTH0_CLIENT_ID` | Yes | Auth0 application client ID | `your-client-id` |
| `AUTH0_CLIENT_SECRET` | Yes | Auth0 application client secret | `your-client-secret` |

**Note**: In local development, if `BLOB_READ_WRITE_TOKEN` is not set, the app falls back to the `local-blob/` directory for storage.

## Marketing Workflow

1. **Create or edit content**: Use the `/upload` page to import a two-pager JSON, or modify guide content in `content/guides/`
2. **Save**: Click **Save** to persist uploaded two-pagers to Vercel Blob (or to `local-blob/` in local dev)
3. **Push to GitHub**: Commit and push static content changes
4. **Vercel Deploys**: Automatic preview deployment
5. **Review**: Open `/two-pagers/[slug]` to preview and `/two-pagers/[slug]/print` for the print layout
6. **Generate PDF**: Click **Generate PDF** to generate and download a PDF from the print layout
7. **Manage uploads**: Use `/manage` to bulk download, bulk upload, or delete JSONs and PDFs

## Project Structure

```
orcaworks-marketing-pdf/
  app/
    globals.css          # Brand tokens and print CSS
    layout.tsx           # Root layout with auth header
    page.tsx             # Homepage with table of contents
    login/page.tsx       # GitHub OAuth sign-in
    upload/page.tsx      # JSON upload + preview
    manage/page.tsx      # Bulk upload/download/delete manager
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

**Cannot save or generate PDFs**
- Ensure you are signed in with Auth0; upload, manage, and PDF generation require authentication
- Verify `AUTH0_ISSUER`, `AUTH0_CLIENT_ID`, `AUTH0_CLIENT_SECRET`, and `AUTH_SECRET` are set in `.env.local`
- If `BLOB_READ_WRITE_TOKEN` is not set, the app uses `local-blob/` for local dev storage

**Uploaded files not appearing on the homepage**
- The homepage is rendered on demand; refresh the page after saving
- Check the server console for `getAllOnePagers failed:` errors
- Verify the uploaded JSON matches the schema in `lib/validation.ts`

## Security

The project currently has 7 vulnerabilities in development dependencies (esbuild via vite, postcss via next). These are in the build toolchain and do not affect production runtime. Addressing these requires major version updates to Next.js and Vitest which would be breaking changes. These can be addressed when planning major version updates.

To check vulnerabilities:
```bash
npm audit
```

## License

Internal use for Orcaworks marketing team.

