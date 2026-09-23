import React from "react";
import { DarkEditorialPageContent } from "@/content/types";
import { PageShell } from "./PageShell";
import { BrandMotif } from "./BrandMotif";
import { Editable } from "@/components/content-editor/Editable";
import { EditableImage } from "@/components/content-editor/EditableImage";

type DarkEditorialPageProps = DarkEditorialPageContent & { pageIndex?: number };

export function DarkEditorialPage({
  pageIndex = 0,
  eyebrow,
  headline,
  body,
  image,
  callout,
  calloutSource,
  surface,
  pageNumber,
}: DarkEditorialPageProps) {
  const isLight = surface === "light";

  const textColumn = (
    <div className={`w-1/2 p-12 flex flex-col ${image ? "justify-start" : "justify-center"}`}>
      {eyebrow && (
        <div className="text-[var(--orca-orange)] text-xs font-semibold tracking-widest uppercase mb-4">
          <Editable path={["pages", pageIndex, "eyebrow"]} value={eyebrow} />
        </div>
      )}
      <h2 className="text-4xl font-bold leading-tight mb-6 text-[var(--page-fg)]">
        <Editable path={["pages", pageIndex, "headline"]} value={headline} multiline />
      </h2>
      {body && (
        <p className="text-[var(--page-fg)] text-lg leading-relaxed">
          <Editable path={["pages", pageIndex, "body"]} value={body} multiline />
        </p>
      )}
    </div>
  );

  // Statement layout: no photograph, the callout is the hero. It renders
  // as a card inset on the page (not a half-page fill) with a tonal
  // gradient in the surface's own family — mist→frost on light, teal-dark
  // →deep teal on dark — so the page reads as one composition. Orange is
  // used only as the accent rule.
  if (!image) {
    const cardStyle: React.CSSProperties = isLight
      ? { background: "linear-gradient(135deg, var(--orca-mist) 0%, var(--orca-frost) 100%)" }
      : { background: "linear-gradient(135deg, var(--orca-teal-dark) 0%, #1f4245 100%)" };
    const quoteText = isLight ? "text-[var(--orca-ink)]" : "text-white";
    const quoteMark = isLight ? "text-[var(--orca-teal-dark)]/15" : "text-[var(--orca-frost)]/15";
    const sourceText = isLight ? "text-[var(--orca-teal-dark)]" : "text-[var(--orca-frost)]";

    return (
      <PageShell variant="dark" surface={surface} pageIndex={pageIndex} pageNumber={pageNumber} showFooter={false}>
        <div className="h-full flex">
          {textColumn}
          {callout && (
            <div className="w-1/2 pr-10 flex items-center">
              <div
                className="relative w-full rounded-2xl overflow-hidden px-12 pt-24 pb-12"
                style={cardStyle}
              >
                <span
                  aria-hidden="true"
                  className={`absolute top-6 left-10 text-[9rem] leading-[0.7] font-serif select-none ${quoteMark}`}
                >
                  &ldquo;
                </span>
                <blockquote className="relative">
                  <p className={`text-[1.9rem] font-semibold leading-snug ${quoteText}`}>
                    <Editable path={["pages", pageIndex, "callout"]} value={callout} multiline />
                  </p>
                  {calloutSource && (
                    <footer className="mt-8 flex items-center gap-4">
                      <span className="h-0.5 w-10 bg-[var(--orca-orange)]" />
                      <span className={`text-sm font-medium tracking-wide uppercase ${sourceText}`}>
                        <Editable path={["pages", pageIndex, "calloutSource"]} value={calloutSource} />
                      </span>
                    </footer>
                  )}
                </blockquote>
              </div>
            </div>
          )}
        </div>
      </PageShell>
    );
  }

  return (
    <PageShell variant="dark" surface={surface} pageIndex={pageIndex} pageNumber={pageNumber} showFooter={false}>
      <BrandMotif variant="orange" size="md" className="top-20 right-20" />

      <div className="h-full flex">
        {textColumn}

        <div className="w-1/2 relative">
          <EditableImage
            path={["pages", pageIndex, "image"]}
            src={image}
            alt=""
            fill
            className="object-cover"
          />
          {callout && (
            <div className="absolute bottom-12 left-12 right-12 bg-[var(--orca-orange)] text-white p-6">
              <p className="text-lg font-semibold">
                {calloutSource && <span aria-hidden="true">&ldquo;</span>}
                <Editable path={["pages", pageIndex, "callout"]} value={callout} multiline />
                {calloutSource && <span aria-hidden="true">&rdquo;</span>}
              </p>
              {calloutSource && (
                <p className="text-xs font-medium tracking-wide uppercase mt-3 text-white/80">
                  — <Editable path={["pages", pageIndex, "calloutSource"]} value={calloutSource} />
                </p>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-[var(--page-line)]" />
    </PageShell>
  );
}
