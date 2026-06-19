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
      <div className="h-full flex">
        <div className="w-1/2 p-12 flex flex-col justify-center border-r-2 border-[var(--orca-muted)] border-opacity-20">
          {eyebrow && (
            <div className="text-[var(--orca-orange)] text-xs font-semibold tracking-widest uppercase mb-4">
              {eyebrow}
            </div>
          )}
          <h2 className="text-4xl font-bold mb-12 text-[var(--orca-ink)]">{title}</h2>
          
          {sections && sections.length > 0 && (
            <div className="space-y-6">
              {sections.map((section, index) => (
                <div key={index} className="text-[var(--orca-ink)]">
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
        
        <div className="w-1/2 p-12 flex flex-col justify-center">
          <p className={`text-3xl font-bold leading-relaxed ${colorClass}`}>
            {detailText}
          </p>
        </div>
      </div>
    </PageShell>
  );
}
