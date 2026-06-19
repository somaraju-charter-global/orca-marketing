import React from "react";
import { StatPageContent } from "@/content/types";
import { PageShell } from "./PageShell";

type StatPageProps = StatPageContent;

export function StatPage({
  eyebrow,
  headline,
  stats,
  pageNumber,
}: StatPageProps) {
  return (
    <PageShell variant="light" pageNumber={pageNumber}>
      <div className="h-full flex flex-col p-12">
        {eyebrow && (
          <div className="text-[var(--orca-orange)] text-xs font-semibold tracking-widest uppercase mb-4">
            {eyebrow}
          </div>
        )}
        <h2 className="text-4xl font-bold mb-12 text-[var(--orca-ink)]">{headline}</h2>
        
        <div className="flex-1 flex items-center">
          <div className="w-full grid grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-[var(--orca-orange-soft)] p-8 rounded-lg border-2 border-[var(--orca-orange)]"
              >
                <div className="text-5xl font-bold text-[var(--orca-orange)] mb-4">
                  {stat.value}
                </div>
                <div className="text-lg font-semibold text-[var(--orca-ink)] mb-2">
                  {stat.label}
                </div>
                {stat.description && (
                  <div className="text-sm text-[var(--orca-muted)]">
                    {stat.description}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageShell>
  );
}
