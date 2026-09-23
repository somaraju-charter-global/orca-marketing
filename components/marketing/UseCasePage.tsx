import React from "react";
import { UseCasePageContent } from "@/content/types";
import { PageShell } from "./PageShell";
import { RightHandContent } from "./RightHandContent";
import { Editable } from "@/components/content-editor/Editable";

type UseCasePageProps = UseCasePageContent & { pageIndex?: number };

export function UseCasePage({
  pageIndex = 0,
  eyebrow,
  title,
  problem,
  opportunity,
  bullets,
  rightContent,
  citation,
  surface,
  pageNumber,
}: UseCasePageProps) {
  // Extract citation from rightContent if it's a quote and no explicit citation provided
  const footerCitation = citation || (rightContent?.type === "quote" ? rightContent.citation : undefined);

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

        {/* Two column section */}
        <div className="flex-1 flex">
          <div className="w-3/5 p-12 pt-6 flex flex-col justify-start">
            <div className="mb-8">
              <div className="text-xs font-semibold tracking-widest uppercase text-[var(--page-muted)] mb-2">
                The Problem
              </div>
              <p className="text-[var(--page-fg)] text-base leading-relaxed">
                <Editable path={["pages", pageIndex, "problem"]} value={problem} multiline />
              </p>
            </div>

            <div className="mb-8">
              <div className="text-xs font-semibold tracking-widest uppercase text-[var(--page-accent)] mb-2">
                The Opportunity
              </div>
              <p className="text-[var(--page-accent)] text-xl font-semibold leading-relaxed">
                <Editable path={["pages", pageIndex, "opportunity"]} value={opportunity} multiline />
              </p>
            </div>

            {bullets && bullets.length > 0 && (
              <ul className="space-y-3">
                {bullets.map((bullet, index) => (
                  <li key={index} className="flex items-start gap-3 text-[var(--page-fg)] text-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-[var(--orca-orange)] mt-2 flex-shrink-0" />
                    <span>
                      <Editable
                        path={["pages", pageIndex, "bullets", index]}
                        value={bullet}
                        multiline
                      />
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="w-2/5 flex flex-col">
            {rightContent && <RightHandContent content={rightContent} pageIndex={pageIndex} />}
          </div>
        </div>
      </div>
    </PageShell>
  );
}
