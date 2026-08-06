"use client";

import React from "react";
import Image from "next/image";
import type { TwoPageVerticalBrief, TwoPagerAccentTheme } from "@/content/onepager-types";
import { OnePagerShell } from "./OnePagerShell";
import { Editable } from "@/components/content-editor/Editable";
import { EditableImage } from "@/components/content-editor/EditableImage";
import { useEditMode } from "@/components/content-editor/EditModeContext";

const ACCENT_VAR: Record<TwoPagerAccentTheme, string> = {
  orange: "var(--orca-orange)",
  blue: "var(--orca-blue)",
  black: "var(--orca-black)",
  green: "var(--orca-green)",
  // healthcareMist's foreground role is played by the darker paired teal,
  // not the pale mist itself — see the comment on TwoPagerAccentTheme.
  healthcareMist: "var(--orca-healthcare-mist-ink)",
};

// The tint used behind callout boxes. For orange/blue/black/green this is
// just the accent at 10% opacity (handled inline via Tailwind's `/10`
// modifier at each usage site). healthcareMist is the one exception: it
// uses its own real pale color at full strength, not a diluted accent.
const SOFT_BG_CLASS: Record<TwoPagerAccentTheme, string> = {
  orange: "bg-[#edf8f9]",
  blue: "bg-[var(--tp-accent)]/10",
  black: "bg-[var(--tp-accent)]/10",
  green: "bg-[var(--tp-accent)]/10",
  healthcareMist: "bg-[var(--orca-healthcare-mist)]",
};

// The dark surface used for hero banners and the table header row.
// Every theme except healthcareMist keeps the original navy; healthcareMist
// swaps in a deep teal from the same family as the mist/ink pairing above.
const BANNER_VAR: Record<TwoPagerAccentTheme, string> = {
  orange: "var(--orca-dark)",
  blue: "var(--orca-dark)",
  black: "var(--orca-dark)",
  green: "var(--orca-dark)",
  healthcareMist: "var(--orca-healthcare-mist-dark)",
};

export function TwoPageVerticalBrief(props: TwoPageVerticalBrief) {
  const theme = props.accentTheme ?? "healthcareMist";
  const accent = ACCENT_VAR[theme];
  const softBgClass = SOFT_BG_CLASS[theme];
  const banner = BANNER_VAR[theme];
  const { isEditing } = useEditMode();

  return (
    // `contents` keeps this div out of the layout (so page-break rules on
    // the two .onepager-page children below are unaffected) while still
    // letting the --tp-accent/--tp-banner CSS variables cascade down to
    // both pages.
    <div className="contents" style={{ "--tp-accent": accent, "--tp-banner": banner } as React.CSSProperties}>
    <>
      {/* Page 1 */}
      <OnePagerShell footer={props.footer} variant="light">
        <div className="h-full flex flex-col">

          {/* Hero */}
          <div className="bg-[var(--tp-banner)] text-white px-14 py-9 relative overflow-hidden">
            <div className="flex items-start justify-between mb-8">
              <span className="text-xs font-semibold tracking-wider uppercase">
                <Editable path={["hero", "eyebrow"]} value={props.hero.eyebrow} />
              </span>
              <Image
                src="/logos/orcaworks-white.png"
                alt="Orcaworks"
                width={140}
                height={34}
                className="absolute -top-0.5 right-14 h-auto w-48"
              />
            </div>
            <h1 className="text-3xl font-bold mb-3 leading-tight max-w-2xl">
              <Editable path={["hero", "headline"]} value={props.hero.headline} multiline />
            </h1>
            <p className="text-sm leading-relaxed max-w-2xl">
              <Editable path={["hero", "subheadline"]} value={props.hero.subheadline} multiline />
            </p>
          </div>

          {/* Two-column content */}
          <div className="flex-1 px-14 py-8 grid grid-cols-5 gap-8 min-h-0">

            {/* Left column: customer problem */}
            <div className="col-span-2 flex flex-col gap-6">

              {/* Business cost callout */}
              <div className={`border-l-4 border-[var(--tp-accent)] ${softBgClass} px-5 py-5 rounded-r-lg`}>
                <div className="text-xs font-bold text-[var(--tp-accent)] uppercase tracking-wider mb-2">
                  <Editable
                    path={["page1", "businessCostProofPoint", "label"]}
                    value={props.page1.businessCostProofPoint.label}
                  />
                </div>
                {props.page1.businessCostProofPoint.metric && (
                  <div className="text-3xl font-bold text-gray-900 mb-2 leading-none">
                    <Editable
                      path={["page1", "businessCostProofPoint", "metric"]}
                      value={props.page1.businessCostProofPoint.metric}
                    />
                  </div>
                )}
                <p className="text-xs text-gray-700 leading-relaxed">
                  <Editable
                    path={["page1", "businessCostProofPoint", "statement"]}
                    value={props.page1.businessCostProofPoint.statement}
                    multiline
                  />
                </p>
                {props.page1.businessCostProofPoint.source && (
                  <p className="text-xs text-gray-400 mt-3">
                    <Editable
                      path={["page1", "businessCostProofPoint", "source"]}
                      value={props.page1.businessCostProofPoint.source}
                    />
                  </p>
                )}
              </div>

              {/* Challenge */}
              <div>
                <h3 className="text-xs font-bold text-gray-800 uppercase tracking-wider mb-3">
                  <Editable path={["page1", "challenge", "title"]} value={props.page1.challenge.title} />
                </h3>
                <p className="text-xs text-gray-700 leading-relaxed">
                  <Editable path={["page1", "challenge", "body"]} value={props.page1.challenge.body} multiline />
                </p>
              </div>

              {/* The Opportunity */}
              <div>
                <h3 className="text-xs font-bold text-gray-800 uppercase tracking-wider mb-3">
                  <Editable path={["page1", "bottomCallout", "title"]} value={props.page1.bottomCallout.title} />
                </h3>
                <p className="text-xs text-gray-700 leading-relaxed">
                  <Editable
                    path={["page1", "bottomCallout", "statement"]}
                    value={props.page1.bottomCallout.statement}
                    multiline
                  />
                </p>
              </div>

            </div>

            {/* Right column: Orcaworks answer */}
            <div className="col-span-3 flex flex-col gap-6">

              {/* Solution visual */}
              <div className="relative w-full overflow-hidden mt-0" style={{ height: "250px" }}>
                <EditableImage
                  path={["page1", "solutionVisual", "imagePath"]}
                  src={props.page1.solutionVisual.imagePath ?? "/images/orcaworks-stack-v3.jpg"}
                  alt="Solution visual"
                  fill
                  optional
                  className="object-contain"
                />
              </div>

              {/* Orcaworks Value — 2x2 grid */}
              <div className="mt-8">
                <h3 className="text-xs font-bold text-gray-800 uppercase tracking-wider mb-3">
                  <Editable path={["page1", "orcaworksValue", "title"]} value={props.page1.orcaworksValue.title} />
                </h3>
                <div className="grid grid-cols-2 gap-x-5 gap-y-5">
                  {props.page1.orcaworksValue.items.map((item, idx) => (
                    <div key={idx} className="flex gap-2">
                      <div className="w-0.5 shrink-0 bg-[var(--tp-accent)] rounded" />
                      <div>
                        <div className="text-xs font-bold text-gray-800 mb-0.5 leading-snug">
                          <Editable
                            path={["page1", "orcaworksValue", "items", idx, "title"]}
                            value={item.title}
                          />
                        </div>
                        <div className="text-xs text-gray-600 leading-relaxed">
                          <Editable
                            path={["page1", "orcaworksValue", "items", idx, "description"]}
                            value={item.description}
                            multiline
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>
        </div>
      </OnePagerShell>

      {/* Page 2 */}
      <OnePagerShell footer={props.footer} variant="light">
        <div className="h-full flex flex-col">

          {/* Page 2 Header */}
          <div className="bg-[var(--tp-banner)] text-white px-14 py-9">
            <div className="flex items-start justify-between mb-8">
              <span className="text-xs font-semibold tracking-wider uppercase">
                <Editable path={["hero", "eyebrow"]} value={props.hero.eyebrow} />
              </span>
              <Image
                src="/logos/orcaworks-white.png"
                alt="Orcaworks"
                width={140}
                height={34}
                className="absolute -top-0.5 right-14 h-auto w-48"
              />
            </div>
            <h1 className="text-3xl font-bold mb-2.5 leading-tight max-w-2xl">
              <Editable path={["page2", "title"]} value={props.page2.title} multiline />
            </h1>
            <p className="text-sm leading-relaxed max-w-2xl">
              <Editable path={["page2", "subtitle"]} value={props.page2.subtitle} multiline />
            </p>
          </div>

          <div className="flex-1 px-16 py-8 flex flex-col gap-6">

            {/* Two-column: strategic priorities + priority workflows */}
            <div className="grid grid-cols-2 gap-10">

              <div>
                <h2 className="text-xs font-bold text-gray-800 uppercase tracking-wider mb-4">
                  Strategic business priorities
                </h2>
                <div className="space-y-4">
                  {props.page2.strategicBusinessPriorities.map((priority, idx) => (
                    <div key={idx} className="flex gap-2.5">
                      <div className="w-0.5 shrink-0 bg-[var(--tp-accent)] rounded" />
                      <div>
                        <div className="text-sm font-bold text-gray-800 mb-0.5 leading-snug">
                          <Editable
                            path={["page2", "strategicBusinessPriorities", idx, "title"]}
                            value={priority.title}
                          />
                        </div>
                        <div className="text-xs text-gray-600 leading-relaxed">
                          <Editable
                            path={["page2", "strategicBusinessPriorities", idx, "description"]}
                            value={priority.description}
                            multiline
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-xs font-bold text-gray-800 uppercase tracking-wider mb-4">
                    Four practical use cases to start with
                </h2>
                <div className="space-y-4">
                  {props.page2.priorityWorkflows.map((workflow, idx) => (
                    <div key={idx} className="flex gap-2.5 items-start">
                      <span className="text-base font-bold text-[var(--tp-accent)] leading-none shrink-0 w-6">
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <div className="text-sm font-bold text-gray-800 mb-0.5 leading-snug">
                          <Editable
                            path={["page2", "priorityWorkflows", idx, "title"]}
                            value={workflow.title}
                          />
                        </div>
                        <div className="text-xs text-gray-600 leading-relaxed">
                          <Editable
                            path={["page2", "priorityWorkflows", idx, "description"]}
                            value={workflow.description}
                            multiline
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Value metrics table */}
            <div>
              <h2 className="text-xs font-bold text-gray-800 uppercase tracking-wider mb-2.5">
                Value metrics
              </h2>
              <table className="w-full border-collapse text-xs">
                <thead>
                  <tr className="bg-[var(--tp-banner)] text-white">
                    <th className="text-left font-semibold py-2.5 px-4 w-[20%]">Metric</th>
                    <th className="text-left font-semibold py-2.5 px-4 w-[30%]">Current baseline</th>
                    <th className="text-left font-semibold py-2.5 px-4 w-[25%]">Target</th>
                    <th className="text-left font-semibold py-2.5 px-4 w-[25%]">Executive impact</th>
                  </tr>
                </thead>
                <tbody>
                  {props.page2.valueMetrics.map((row, idx) => (
                    <tr key={idx} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                      <td className="font-bold text-gray-800 py-2.5 px-4 border-b border-gray-100">
                        <Editable path={["page2", "valueMetrics", idx, "metric"]} value={row.metric} />
                      </td>
                      <td className="text-gray-600 py-2.5 px-4 border-b border-gray-100">
                        <Editable path={["page2", "valueMetrics", idx, "baseline"]} value={row.baseline} />
                      </td>
                      <td className="font-semibold text-[var(--tp-accent)] py-2.5 px-4 border-b border-gray-100">
                        <Editable path={["page2", "valueMetrics", idx, "movement"]} value={row.movement} />
                      </td>
                      <td className="text-gray-600 py-2.5 px-4 border-b border-gray-100">
                        <Editable path={["page2", "valueMetrics", idx, "impact"]} value={row.impact} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* CTA */}
            <div>
              <div className={`flex items-center justify-between gap-6 border-l-4 border-[var(--tp-accent)] ${softBgClass} px-5 py-3.5 rounded-r-lg`}>
                <p className="text-sm text-gray-800 font-semibold leading-relaxed">
                  <Editable path={["page2", "cta", "statement"]} value={props.page2.cta.statement} multiline />
                </p>
                {props.page2.cta.url && (
                  <a
                    href={props.page2.cta.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(event) => {
                      if (isEditing) event.preventDefault();
                    }}
                    className="shrink-0 whitespace-nowrap rounded-full bg-[var(--tp-accent)] px-5 py-2.5 text-sm font-bold text-white transition-opacity hover:opacity-90"
                  >
                    <Editable
                      path={["page2", "cta", "buttonLabel"]}
                      value={props.page2.cta.buttonLabel ?? "Test One Workflow"}
                    />
                  </a>
                )}
              </div>
            </div>

          </div>
        </div>
      </OnePagerShell>
    </>
    </div>
  );
}
