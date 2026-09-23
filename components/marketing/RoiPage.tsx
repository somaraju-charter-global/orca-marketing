import React from "react";
import { RoiPageContent } from "@/content/types";
import { PageShell } from "./PageShell";
import { Editable } from "@/components/content-editor/Editable";

type RoiPageProps = RoiPageContent & { pageIndex?: number };

export function RoiPage({
  pageIndex = 0,
  eyebrow,
  title,
  intro,
  metrics,
  surface,
  pageNumber,
}: RoiPageProps) {
  return (
    <PageShell variant="light" surface={surface} pageNumber={pageNumber}>
      <div className="h-full flex flex-col p-12">
        {eyebrow && (
          <div className="text-[var(--orca-orange)] text-xs font-semibold tracking-widest uppercase mb-4">
            <Editable path={["pages", pageIndex, "eyebrow"]} value={eyebrow} />
          </div>
        )}
        <h2 className="text-4xl font-bold mb-4 text-[var(--page-fg)]">
          <Editable path={["pages", pageIndex, "title"]} value={title} />
        </h2>
        {intro && (
          <p className="text-[var(--page-muted)] text-base mb-8 max-w-2xl">
            <Editable path={["pages", pageIndex, "intro"]} value={intro} multiline />
          </p>
        )}
        
        <div className="flex-1 flex flex-col justify-center">
          <div className="overflow-hidden rounded-lg border border-[var(--orca-line)]">
            <table className="w-full">
              <thead>
                <tr className="bg-[var(--orca-dark)] text-white">
                  <th className="text-left p-4 text-sm font-semibold">Metric</th>
                  <th className="text-left p-4 text-sm font-semibold">Baseline</th>
                  <th className="text-left p-4 text-sm font-semibold">Target</th>
                  <th className="text-left p-4 text-sm font-semibold">Impact</th>
                </tr>
              </thead>
              <tbody>
                {metrics.map((metric, index) => (
                  <tr
                    key={index}
                    className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                  >
                    <td className="p-4 text-sm font-medium text-[var(--orca-ink)]">
                      <Editable path={["pages", pageIndex, "metrics", index, "label"]} value={metric.label} />
                    </td>
                    <td className="p-4 text-sm text-[var(--orca-muted)]">
                      <Editable path={["pages", pageIndex, "metrics", index, "baseline"]} value={metric.baseline} />
                    </td>
                    <td className="p-4 text-sm text-[var(--orca-teal-dark)] font-semibold">
                      <Editable path={["pages", pageIndex, "metrics", index, "target"]} value={metric.target} />
                    </td>
                    <td className="p-4 text-sm text-[var(--orca-orange)] font-semibold">
                      <Editable path={["pages", pageIndex, "metrics", index, "impact"]} value={metric.impact} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
