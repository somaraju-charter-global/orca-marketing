import React from "react";
import { UseCasePageContent } from "@/content/types";
import { PageShell } from "./PageShell";
import { RightHandContent } from "./RightHandContent";

type UseCasePageProps = UseCasePageContent;

export function UseCasePage({
  eyebrow,
  number,
  title,
  problem,
  opportunity,
  bullets,
  rightContent,
  citation,
  pageNumber,
}: UseCasePageProps) {
  // Extract citation from rightContent if it's a quote and no explicit citation provided
  const footerCitation = citation || (rightContent?.type === "quote" ? rightContent.citation : undefined);
  
  return (
    <PageShell variant="light" pageNumber={pageNumber} citation={footerCitation}>
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

        {/* Two column section */}
        <div className="flex-1 flex">
          <div className="w-3/5 p-12 pt-6 flex flex-col justify-center">
            <div className="mb-8">
              <div className="text-xs font-semibold tracking-widest uppercase text-[var(--orca-muted)] mb-2">
                The Problem
              </div>
              <p className="text-[var(--orca-ink)] text-base leading-relaxed">
                {problem}
              </p>
            </div>
            
            <div className="mb-8">
              <div className="text-xs font-semibold tracking-widest uppercase text-[var(--orca-blue)] mb-2">
                The Opportunity
              </div>
              <p className="text-[var(--orca-blue)] text-xl font-semibold leading-relaxed">
                {opportunity}
              </p>
            </div>
            
            {bullets && bullets.length > 0 && (
              <ul className="space-y-3">
                {bullets.map((bullet, index) => (
                  <li key={index} className="flex items-start gap-3 text-[var(--orca-ink)] text-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-[var(--orca-orange)] mt-2 flex-shrink-0" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
          
          <div className="w-2/5 flex flex-col">
            {rightContent && <RightHandContent content={rightContent} />}
          </div>
        </div>
      </div>
    </PageShell>
  );
}
