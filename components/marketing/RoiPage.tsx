import React from "react";
import { RoiPageContent } from "@/content/types";
import { PageShell } from "./PageShell";

type RoiPageProps = RoiPageContent;

export function RoiPage({
  title,
  intro,
  metrics,
  pageNumber,
}: RoiPageProps) {
  return (
    <PageShell variant="light" pageNumber={pageNumber}>
      <div className="h-full flex flex-col p-12">
        <h2 className="text-4xl font-bold mb-4 text-[var(--orca-ink)]">{title}</h2>
        {intro && (
          <p className="text-[var(--orca-muted)] text-base mb-8 max-w-2xl">
            {intro}
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
                      {metric.label}
                    </td>
                    <td className="p-4 text-sm text-[var(--orca-muted)]">
                      {metric.baseline}
                    </td>
                    <td className="p-4 text-sm text-[var(--orca-blue)] font-semibold">
                      {metric.target}
                    </td>
                    <td className="p-4 text-sm text-[var(--orca-orange)] font-semibold">
                      {metric.impact}
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
