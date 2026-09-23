"use client";

import React from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { OperationalTransformationPageContent } from "@/content/types";
import { PageShell } from "./PageShell";
import { Editable } from "@/components/content-editor/Editable";

type OperationalTransformationPageProps = OperationalTransformationPageContent & { pageIndex?: number };

export function OperationalTransformationPage({
  pageIndex = 0,
  eyebrow,
  headline,
  introduction,
  currentProcess,
  futureProcess,
  shift,
  value,
  citation,
  surface,
  pageNumber,
}: OperationalTransformationPageProps) {
  const basePath = ["pages", pageIndex] as (string | number)[];
  const edit = (path: (string | number)[], value: string, multiline = false) =>
    pageIndex !== undefined ? (
      <Editable path={[...basePath, ...path]} value={value} multiline={multiline} />
    ) : (
      value
    );

  const rowCount = Math.max(currentProcess.steps.length, futureProcess.steps.length);

  return (
    <PageShell variant="light" surface={surface} pageIndex={pageIndex} pageNumber={pageNumber} citation={citation}>
      <div className="h-full flex flex-col">
        {/* Header */}
        <div className="px-12 pt-10 pb-5">
          {eyebrow && (
            <div className="text-[var(--orca-orange)] text-xs font-semibold tracking-widest uppercase mb-3">
              {edit(["eyebrow"], eyebrow)}
            </div>
          )}
          <h2 className="text-3xl font-bold text-[var(--page-fg)] leading-tight">
            {edit(["headline"], headline)}
          </h2>
          {introduction && (
            <p className="text-sm text-[var(--page-muted)] mt-2 max-w-2xl leading-relaxed">
              {edit(["introduction"], introduction, true)}
            </p>
          )}
        </div>

        {/* Aligned today / with-Orcaworks step rows */}
        <div className="flex-1 px-12 min-h-0 flex flex-col justify-center">
          <div className="grid grid-cols-[1fr_2rem_1fr] gap-y-3 items-stretch">
            <div className="text-[10px] font-semibold tracking-widest uppercase text-[var(--page-muted)] pb-1">
              Today
            </div>
            <div />
            <div className="text-[10px] font-semibold tracking-widest uppercase text-[var(--page-accent)] pb-1">
              With Orcaworks
            </div>
            {Array.from({ length: rowCount }, (_, row) => {
              const today = currentProcess.steps[row];
              const future = futureProcess.steps[row];
              return (
                <React.Fragment key={row}>
                  <div className="rounded-lg ring-1 ring-[var(--page-line)] px-4 py-3 flex items-start gap-3">
                    {today ? (
                      <>
                        <div className="flex-shrink-0 w-6 h-6 rounded-full ring-1 ring-[var(--page-line)] text-[var(--page-muted)] flex items-center justify-center text-[11px] font-bold mt-0.5">
                          {row + 1}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-[var(--page-fg)] leading-snug">
                            {edit(["currentProcess", "steps", row, "label"], today.label)}
                          </p>
                          {today.detail && (
                            <p className="text-xs text-[var(--page-muted)] leading-snug mt-0.5">
                              {edit(["currentProcess", "steps", row, "detail"], today.detail, true)}
                            </p>
                          )}
                        </div>
                      </>
                    ) : null}
                  </div>
                  <ArrowRight size={16} className="self-center justify-self-center text-[var(--page-line)]" />
                  <div className="rounded-lg bg-[var(--page-panel)] text-[var(--page-panel-fg)] px-4 py-3 flex items-start gap-3">
                    {future ? (
                      <>
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[var(--orca-orange)] text-white flex items-center justify-center text-[11px] font-bold mt-0.5">
                          {row + 1}
                        </div>
                        <div>
                          <p className="text-sm font-semibold leading-snug">
                            {edit(["futureProcess", "steps", row, "label"], future.label)}
                          </p>
                          {future.detail && (
                            <p className="text-xs opacity-75 leading-snug mt-0.5">
                              {edit(["futureProcess", "steps", row, "detail"], future.detail, true)}
                            </p>
                          )}
                        </div>
                      </>
                    ) : null}
                  </div>
                </React.Fragment>
              );
            })}
          </div>
        </div>

        {/* The shift + outcomes */}
        <div className="px-12 pb-16 pt-3">
          <div className="border-t-2 border-[var(--orca-orange)] pt-4">
            <p className="text-xl font-semibold text-[var(--page-fg)] leading-snug">
              {edit(["shift", "statement"], shift.statement, true)}
            </p>
            {shift.description && (
              <p className="text-sm text-[var(--page-muted)] mt-1 leading-relaxed">
                {edit(["shift", "description"], shift.description, true)}
              </p>
            )}
            <div className="flex gap-6 mt-4">
              {value.outcomes.map((outcome, index) => (
                <div key={index} className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="flex-shrink-0 text-[var(--page-accent)]" />
                  <span className="text-xs font-semibold text-[var(--page-fg)]">
                    {edit(["value", "outcomes", index], outcome)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
