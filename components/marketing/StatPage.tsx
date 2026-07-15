import React from "react";
import { StatPageContent } from "@/content/types";
import { PageShell } from "./PageShell";
import { Editable } from "@/components/content-editor/Editable";

type StatPageProps = StatPageContent & { pageIndex?: number };

export function StatPage({
  pageIndex = 0,
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
            <Editable path={["pages", pageIndex, "eyebrow"]} value={eyebrow} />
          </div>
        )}
        <h2 className="text-4xl font-bold mb-12 text-[var(--orca-ink)]">
          <Editable path={["pages", pageIndex, "headline"]} value={headline} multiline />
        </h2>
        
        <div className="flex-1 flex items-center">
          <div className="w-full grid grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-[var(--orca-orange-soft)] p-8 rounded-lg border-2 border-[var(--orca-orange)]"
              >
                <div className="text-5xl font-bold text-[var(--orca-orange)] mb-4">
                  <Editable path={["pages", pageIndex, "stats", index, "value"]} value={stat.value} />
                </div>
                <div className="text-lg font-semibold text-[var(--orca-ink)] mb-2">
                  <Editable path={["pages", pageIndex, "stats", index, "label"]} value={stat.label} />
                </div>
                {stat.description && (
                  <div className="text-sm text-[var(--orca-muted)]">
                    <Editable
                      path={["pages", pageIndex, "stats", index, "description"]}
                      value={stat.description}
                      multiline
                    />
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
