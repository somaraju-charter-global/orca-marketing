import React from "react";
import { UseCaseDetailContent } from "@/content/types";
import { PageShell } from "./PageShell";
import { RightHandContent } from "./RightHandContent";
import { Editable } from "@/components/content-editor/Editable";

type UseCaseDetailProps = UseCaseDetailContent & { pageIndex?: number };

export function UseCaseDetail({
  pageIndex = 0,
  eyebrow,
  title,
  sections,
  sectionColor,
  rightContent,
  citation,
  surface,
  pageNumber,
}: UseCaseDetailProps) {
  // Extract citation from rightContent if it's a quote and no explicit citation provided
  const footerCitation = citation || (rightContent?.type === "quote" ? rightContent.citation : undefined);

  const colorClass = sectionColor === "orange"
    ? "text-[var(--orca-orange)]"
    : sectionColor === "blue"
    ? "text-[var(--orca-blue)]"
    : "text-[var(--page-fg)]";

  return (
    <PageShell variant="light" surface={surface} pageIndex={pageIndex} pageNumber={pageNumber} citation={footerCitation}>
      <div className="h-full flex flex-col">
        {/* Full width title section */}
        <div className="p-12 pb-6">
          {eyebrow && (
            <div className="text-[var(--orca-orange)] text-xs font-semibold tracking-widest uppercase mb-4">
              <Editable path={["pages", pageIndex, "eyebrow"]} value={eyebrow} />
            </div>
          )}
          <h2 className="text-4xl font-bold text-[var(--page-fg)]">
            <Editable path={["pages", pageIndex, "title"]} value={title} />
          </h2>
        </div>

        {/* Two column section with centered line */}
        <div className="flex-1 flex relative">
          {/* Left column - sections */}
          <div className="w-1/2 p-12 pt-6 flex flex-col justify-start">
            {sections && sections.length > 0 && (
              <div id="sections-container" className="space-y-6">
                {sections.map((section, index) => (
                  <div key={index} className="text-[var(--page-fg)] pr-6">
                    <h3 className={`text-lg font-bold ${colorClass} mb-2`}>
                      <Editable
                        path={["pages", pageIndex, "sections", index, "heading"]}
                        value={section.heading}
                      />
                    </h3>
                    <p className="text-base leading-relaxed">
                      <Editable
                        path={["pages", pageIndex, "sections", index, "description"]}
                        value={section.description}
                        multiline
                      />
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Centered line - positioned at page center, height constrained to sections */}
          {sections && sections.length > 0 && (
            <div className="absolute left-1/2 w-0.5 -translate-x-1/2" style={{backgroundColor: 'var(--orca-orange, #FF6B35)', top: '5rem', bottom: '5rem'}}></div>
          )}

          {/* Right column - flexible content */}
          <div className="w-1/2 flex flex-col">
            {rightContent && <RightHandContent content={rightContent} pageIndex={pageIndex} />}
          </div>
        </div>
      </div>
    </PageShell>
  );
}
