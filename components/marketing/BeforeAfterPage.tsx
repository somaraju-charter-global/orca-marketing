import React from "react";
import { BeforeAfterPageContent } from "@/content/types";
import { PageShell } from "./PageShell";

type BeforeAfterPageProps = BeforeAfterPageContent;

export function BeforeAfterPage({
  eyebrow,
  title,
  beforeTitle = "Before",
  afterTitle = "After",
  beforeItems,
  afterItems,
  pageNumber,
}: BeforeAfterPageProps) {
  return (
    <PageShell variant="light" pageNumber={pageNumber}>
      <div className="h-full flex flex-col p-12">
        {eyebrow && (
          <div className="text-[var(--orca-orange)] text-xs font-semibold tracking-widest uppercase mb-4">
            {eyebrow}
          </div>
        )}
        <h2 className="text-3xl font-bold mb-12 text-[var(--orca-ink)]">{title}</h2>
        
        <div className="flex-1 flex items-center gap-8">
          <div className="flex-1">
            <div className="bg-red-50 border-2 border-red-200 p-6 rounded-lg">
              <div className="text-red-600 text-sm font-semibold tracking-widest uppercase mb-6">
                {beforeTitle}
              </div>
              <ul className="space-y-4">
                {beforeItems.map((item, index) => (
                  <li key={index} className="flex items-start gap-3 text-[var(--orca-ink)]">
                    <div className="w-2 h-2 rounded-full bg-red-400 mt-2 flex-shrink-0" />
                    <span className="text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="flex items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-[var(--orca-orange)] flex items-center justify-center">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </div>
          </div>
          
          <div className="flex-1">
            <div className="bg-green-50 border-2 border-green-200 p-6 rounded-lg">
              <div className="text-green-600 text-sm font-semibold tracking-widest uppercase mb-6">
                {afterTitle}
              </div>
              <ul className="space-y-4">
                {afterItems.map((item, index) => (
                  <li key={index} className="flex items-start gap-3 text-[var(--orca-ink)]">
                    <div className="w-2 h-2 rounded-full bg-green-400 mt-2 flex-shrink-0" />
                    <span className="text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
