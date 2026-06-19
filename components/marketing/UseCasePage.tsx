import React from "react";
import { UseCasePageContent } from "@/content/types";
import { PageShell } from "./PageShell";

type UseCasePageProps = UseCasePageContent;

export function UseCasePage({
  eyebrow,
  number,
  title,
  problem,
  opportunity,
  bullets,
  image,
  quote,
  source,
  pageNumber,
}: UseCasePageProps) {
  return (
    <PageShell variant="light" pageNumber={pageNumber}>
      <div className="h-full flex">
        <div className="w-3/5 p-12 flex flex-col">
          {eyebrow && (
            <div className="text-[var(--orca-orange)] text-xs font-semibold tracking-widest uppercase mb-4">
              {eyebrow}
            </div>
          )}
          <h2 className="text-4xl font-bold mb-12 text-[var(--orca-ink)]">{title}</h2>
          
          <div className="flex-1 flex flex-col justify-center">
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
        </div>
        
        <div className="w-2/5 flex flex-col">
          {image ? (
            <img src={image} alt="" className="w-full h-full object-cover" />
          ) : quote ? (
            <div className="h-full flex items-center justify-center p-12">
              <div className="bg-[var(--orca-orange)] text-white p-8 rounded-lg">
                <p className="text-xl font-semibold mb-4">&ldquo;{quote}&rdquo;</p>
                {source && (
                  <p className="text-sm opacity-80">— {source}</p>
                )}
              </div>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center p-12">
              <div className="bg-[var(--orca-dark-panel)] text-white p-8 rounded-lg">
                <div className="text-4xl font-bold text-[var(--orca-orange)] mb-4">
                  {number}
                </div>
                <p className="text-sm opacity-80">Key Use Case</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </PageShell>
  );
}
