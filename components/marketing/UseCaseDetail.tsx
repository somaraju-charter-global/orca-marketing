import React from "react";
import { UseCaseDetailContent } from "@/content/types";
import { PageShell } from "./PageShell";

type UseCaseDetailProps = UseCaseDetailContent;

export function UseCaseDetail({
  eyebrow,
  title,
  sections,
  detailText,
  detailColor,
  pageNumber,
}: UseCaseDetailProps) {
  const colorClass = detailColor === "orange" 
    ? "text-[var(--orca-orange)]" 
    : detailColor === "blue" 
    ? "text-[var(--orca-blue)]" 
    : "text-[var(--orca-ink)]";

  return (
    <PageShell variant="light" pageNumber={pageNumber}>
      <div className="h-full flex flex-col">
        {/* Full width title section */}
        <div className="p-12 pb-6">
          {eyebrow && (
            <div className="text-[var(--orca-orange)] text-xs font-semibold tracking-widest uppercase mb-4">
              {eyebrow}
            </div>
          )}
          <h2 className="text-4xl font-bold text-[var(--orca-ink)]">{title}</h2>
        </div>

        {/* Two column section with centered line */}
        <div className="flex-1 flex relative">
          {/* Left column - sections */}
          <div className="w-1/2 p-12 pt-6 flex flex-col justify-center">
            {sections && sections.length > 0 && (
              <div id="sections-container" className="space-y-6">
                {sections.map((section, index) => (
                  <div key={index} className="text-[var(--orca-ink)] pr-6">
                    <h3 className={`text-lg font-bold ${colorClass} mb-2`}>
                      {section.heading}
                    </h3>
                    <p className="text-base leading-relaxed">
                      {section.description}
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

          {/* Right column - detailText */}
          <div className="w-1/2 p-12 pt-6 flex flex-col justify-center">
            <p className={`text-3xl font-bold leading-relaxed ${colorClass}`}>
              {detailText}
            </p>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
