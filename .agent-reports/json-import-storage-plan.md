# JSON Import + Vercel Storage Plan — Orca Marketing

## Requirements

1. **Separate content from source code**
   - Marketing content (two-pagers / guides) should live as JSON data that can be uploaded, not only as `.ts` modules in `content/`.
   - Remove reliance on the `.gitignore` hack that keeps private content out of the repo.

2. **JSON import**
   - Add an upload flow that accepts a JSON file matching the `TwoPageVerticalBrief` shape.
   - Validate the uploaded JSON against the existing TypeScript type.
   - Render the uploaded content using the existing `OnePagerDocument` component.

3. **Social login on Vercel**
   - Add a tiny OAuth login screen (GitHub and/or Google via NextAuth / Auth.js).
   - No roles, no admin gates — just identify the user and protect the app.
   - Add a home button that links to the homepage listing all available documents.

4. **Storage for JSONs and PDFs**
   - Use a free Vercel storage option: **Vercel Blob** is the simplest “small bucket” for both JSON and PDF binaries.
   - Uploaded JSONs and exported PDFs should be listable, previewable, and downloadable.

5. **Bulk upload / download**
   - Users can upload multiple JSON files at once.
   - Users can download all stored JSONs and all stored PDFs (individually or as a client-side zipped batch).

6. **Demoable, not production-grade**
   - Keep auth minimal, UI simple, and avoid over-engineering.

## Current state notes

- `content/onepager-types.ts` and `content/types.ts` already define the required JSON shapes.
- `OnePagerEditorClient` already has an **Export JSON** button (`handleExport`).
- `app/api/content/save` rewrites `.ts` files on disk; this is the “content mixed with code” problem.
- `app/api/generate-pdf` uses Playwright `chromium.launch()`.
  - **This will not run on Vercel’s serverless runtime** as-is; we will swap in `puppeteer-core` + `@sparticuz/chromium` for serverless PDF generation.

## Proposed architecture

- **Auth**: `@auth/nextjs` (Auth.js for Next.js App Router) with **GitHub** OAuth.
- **Storage**: `@vercel/blob` — one store, prefixes:
  - `jsons/{slug}.json`
  - `pdfs/{slug}.pdf`
- **Validation**: Zod schema generated from the `TwoPageVerticalBrief` shape.
- **Routing**:
  - `/login` — simple sign-in page
  - `/` — home with two-pager registry (static + uploaded from Blob) and static guides
  - `/upload` — upload a two-pager JSON, preview it, save to Blob
  - `/manage` — list/delete/download all uploaded JSONs and PDFs
  - `/two-pagers/[slug]` — render static or Blob-backed two-pager
  - `/marketing/[slug]` — static guides (unchanged)
  - `/api/auth/[...nextauth]` — Auth.js handler
  - `/api/upload/json` and `/api/upload/pdf` — server-side storage endpoints

## Phased execution plan

### Phase 1 — Storage + validation foundation
1. Add dependencies: `@vercel/blob`, `@auth/nextjs`, `zod`.
2. Add environment variables to `.env.template`:
   - `BLOB_READ_WRITE_TOKEN`
   - `NEXTAUTH_SECRET`
   - `AUTH_GITHUB_ID` / `AUTH_GITHUB_SECRET`
3. Create `lib/storage.ts` with helpers:
   - `uploadJson(slug, data)`, `getJson(slug)`, `listJsons()`, `deleteJson(slug)`
   - `uploadPdf(slug, buffer)`, `getPdfUrl(slug)`, `listPdfs()`, `deletePdf(slug)`
4. Create Zod schema `TwoPageVerticalBriefSchema` in `lib/validation.ts` and `safeParse` wrappers.
5. Create API routes:
   - `app/api/upload/json/route.ts`
   - `app/api/upload/pdf/route.ts`
   - Return `{ ok, slug, url }` or `{ error }`.

### Phase 2 — Simple social login
1. Create `auth.ts` with GitHub provider and a `NEXTAUTH_SECRET`.
2. Create `app/api/auth/[...nextauth]/route.ts`.
3. Create `app/login/page.tsx` with a single sign-in button.
4. Add `middleware.ts` to protect all routes except `/login` and `/api/auth/**`.
5. Add a global `AppHeader` with a home link and a sign-out button.

### Phase 3 — JSON import + dynamic rendering
1. Add an **Import JSON** button to `OnePagerEditorClient`:
   - file input → `FileReader` → parse → validate with Zod → update local state.
2. Create `lib/registry.ts` with helpers:
   - `getOnePagerBySlug(slug)` — look up Blob first, fall back to static `content/onepager-registry.ts`.
   - `listAllTwoPagers()` — merge static + dynamic.
3. Update `app/two-pagers/[slug]/page.tsx` to use the new helper.
4. Create `/upload/page.tsx` for a dedicated JSON upload + preview experience.

### Phase 4 — Home + management UI
1. Rewrite `app/page.tsx` to list static + uploaded documents, grouped by type, with an “Upload” and “Manage” link.
2. Create `/manage/page.tsx`:
   - List uploaded JSONs and PDFs.
   - Allow delete and individual download.
   - Allow multi-file JSON upload.
   - Add “Download all JSONs” / “Download all PDFs” buttons (client-side loop; use `jszip` only if needed).
3. Add bulk-upload endpoint or client-side loop using existing single-upload API.

### Phase 5 — Serverless PDF generation + persistence
1. Refactor `app/api/generate-pdf` to run on Vercel serverless:
   - Replace `playwright` with `puppeteer-core` + `@sparticuz/chromium`.
   - Keep the same print-route → PDF flow and formatting.
2. Store generated PDFs in Vercel Blob under `pdfs/{slug}.pdf` and return the Blob URL.
3. Update `GeneratePdfButton` to call the refactored API and download the PDF.

### Phase 6 — Cleanup, docs, deploy
1. Decide whether to keep static `.ts` content files as templates or remove them entirely.
   - Suggested: keep `template.ts` files, delete private content files, and remove their `.gitignore` rules since content now lives in Blob.
2. Add/update Vitest tests for validation and registry helpers.
3. Update `README.md` with Vercel Blob, OAuth, and upload instructions.
4. Deploy to Vercel, set environment variables, and run a smoke test: login → upload JSON → preview → download JSON → upload PDF → download PDF.

## Decisions (locked)

1. **OAuth provider**: GitHub (simplest Auth.js OAuth provider).
2. **Storage split**: Vercel Blob for JSONs and PDFs.
3. **PDF generation**: Serverless on Vercel.
4. **Scope of import**: Two-pagers only.
5. **Image handling**: Keep images in `public/images/`.

## Risks

- `playwright` PDF generation as currently written is incompatible with Vercel serverless functions.
- Vercel Blob free tier has storage/egress limits; confirm it fits the number of PDFs expected.
- NextAuth v5 / Auth.js is still beta-ish; verify it works with the project’s Next.js 16 and React 19 versions.
