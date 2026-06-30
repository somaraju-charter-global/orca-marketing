import React from "react";
import Image from "next/image";
import type { TwoPageVerticalBrief } from "@/content/onepager-types";
import { OnePagerShell } from "./OnePagerShell";

export function TwoPageVerticalBrief(props: TwoPageVerticalBrief) {
  return (
    <>
      {/* Page 1 */}
      <OnePagerShell footer={props.footer} variant="light">
        <div className="h-full flex flex-col">

          {/* Hero */}
          <div className="bg-[#030712] text-white px-14 py-9 relative overflow-hidden">
            <div className="flex items-start justify-between mb-5">
              <span className="text-xs font-semibold tracking-wider text-gray-400 uppercase">
                {props.hero.eyebrow}
              </span>
              <Image
                src="/logos/orcaworks-dark.png"
                alt="Orcaworks"
                width={100}
                height={24}
                className="h-6 w-auto opacity-80"
              />
            </div>
            <h1 className="text-3xl font-bold mb-3 leading-tight max-w-2xl">{props.hero.headline}</h1>
            <p className="text-sm text-gray-300 leading-relaxed max-w-2xl">
              {props.hero.subheadline}
            </p>
          </div>

          {/* Two-column content */}
          <div className="flex-1 px-14 py-8 grid grid-cols-5 gap-8 min-h-0">

            {/* Left column: customer problem */}
            <div className="col-span-2 flex flex-col gap-6">

              {/* Business cost callout */}
              <div className="border-l-4 border-[#ff4b1f] bg-orange-50 px-5 py-5 rounded-r-lg">
                <div className="text-xs font-bold text-[#ff4b1f] uppercase tracking-wider mb-2">
                  {props.page1.businessCostProofPoint.label}
                </div>
                {props.page1.businessCostProofPoint.metric && (
                  <div className="text-3xl font-bold text-gray-900 mb-2 leading-none">
                    {props.page1.businessCostProofPoint.metric}
                  </div>
                )}
                <p className="text-xs text-gray-700 leading-relaxed">
                  {props.page1.businessCostProofPoint.statement}
                </p>
                {props.page1.businessCostProofPoint.source && (
                  <p className="text-xs text-gray-400 mt-3">
                    {props.page1.businessCostProofPoint.source}
                  </p>
                )}
              </div>

              {/* Challenge */}
              <div>
                <h3 className="text-xs font-bold text-gray-800 uppercase tracking-wider mb-3">
                  {props.page1.challenge.title}
                </h3>
                <p className="text-xs text-gray-700 leading-relaxed">
                  {props.page1.challenge.body}
                </p>
              </div>

              {/* The Opportunity */}
              <div>
                <h3 className="text-xs font-bold text-gray-800 uppercase tracking-wider mb-3">
                  {props.page1.bottomCallout.title}
                </h3>
                <p className="text-xs text-gray-700 leading-relaxed">
                  {props.page1.bottomCallout.statement}
                </p>
              </div>

            </div>

            {/* Right column: Orcaworks answer */}
            <div className="col-span-3 flex flex-col gap-6">

              {/* Solution visual */}
              <div className="relative w-full overflow-hidden mt-4" style={{ height: "320px" }}>
                <Image
                  src={props.page1.solutionVisual.imagePath || "/images/supply-chain-speed.jpg"}
                  alt="Solution visual"
                  fill
                  className="object-contain"
                />
              </div>

              {/* Orcaworks Value — 2x2 grid */}
              <div className="mt-8">
                <h3 className="text-xs font-bold text-gray-800 uppercase tracking-wider mb-3">
                  {props.page1.orcaworksValue.title}
                </h3>
                <div className="grid grid-cols-2 gap-x-5 gap-y-5">
                  {props.page1.orcaworksValue.items.map((item, idx) => (
                    <div key={idx} className="flex gap-2">
                      <div className="w-0.5 shrink-0 bg-[#ff4b1f] rounded" />
                      <div>
                        <div className="text-xs font-bold text-gray-800 mb-0.5 leading-snug">{item.title}</div>
                        <div className="text-xs text-gray-600 leading-relaxed">{item.description}</div>
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
          <div className="bg-[#030712] text-white px-14 py-7">
            <div className="flex items-start justify-between mb-4">
              <span className="text-xs font-semibold tracking-wider text-gray-400 uppercase">
                {props.hero.eyebrow}
              </span>
              <Image
                src="/logos/orcaworks-dark.png"
                alt="Orcaworks"
                width={100}
                height={24}
                className="h-6 w-auto opacity-80"
              />
            </div>
            <h1 className="text-3xl font-bold mb-2.5 leading-tight max-w-2xl">{props.page2.title}</h1>
            <p className="text-sm text-gray-300 leading-relaxed max-w-2xl">
              {props.page2.subtitle}
            </p>
          </div>

          <div className="flex-1 px-16 py-8 flex flex-col gap-8">

            {/* Two-column: strategic priorities + priority workflows */}
            <div className="grid grid-cols-2 gap-10">

              <div>
                <h2 className="text-xs font-bold text-gray-800 uppercase tracking-wider mb-4">
                  Strategic business priorities
                </h2>
                <div className="space-y-4">
                  {props.page2.strategicBusinessPriorities.map((priority, idx) => (
                    <div key={idx} className="flex gap-2.5">
                      <div className="w-0.5 shrink-0 bg-[#ff4b1f] rounded" />
                      <div>
                        <div className="text-sm font-bold text-gray-800 mb-0.5 leading-snug">{priority.title}</div>
                        <div className="text-xs text-gray-600 leading-relaxed">{priority.description}</div>
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
                      <span className="text-base font-bold text-[#ff4b1f] leading-none shrink-0 w-6">
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <div className="text-sm font-bold text-gray-800 mb-0.5 leading-snug">{workflow.title}</div>
                        <div className="text-xs text-gray-600 leading-relaxed">{workflow.description}</div>
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
                  <tr className="bg-[#030712] text-white">
                    <th className="text-left font-semibold py-2.5 px-4 w-[20%]">Metric</th>
                    <th className="text-left font-semibold py-2.5 px-4 w-[30%]">Current baseline</th>
                    <th className="text-left font-semibold py-2.5 px-4 w-[25%]">Target</th>
                    <th className="text-left font-semibold py-2.5 px-4 w-[25%]">Executive impact</th>
                  </tr>
                </thead>
                <tbody>
                  {props.page2.valueMetrics.map((row, idx) => (
                    <tr key={idx} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                      <td className="font-bold text-gray-800 py-2.5 px-4 border-b border-gray-100">{row.metric}</td>
                      <td className="text-gray-600 py-2.5 px-4 border-b border-gray-100">{row.baseline}</td>
                      <td className="font-semibold text-[#ff4b1f] py-2.5 px-4 border-b border-gray-100">{row.movement}</td>
                      <td className="text-gray-600 py-2.5 px-4 border-b border-gray-100">{row.impact}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* CTA */}
            <div>
              <div className="border-l-4 border-[#ff4b1f] bg-orange-50 px-5 py-3.5 rounded-r-lg">
                <p className="text-sm text-gray-800 font-semibold leading-relaxed">
                  {props.page2.cta.url ? (
                    <a 
                      href={props.page2.cta.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-gray-900 hover:text-[#ff4b1f] transition-colors"
                    >
                      {props.page2.cta.statement}
                    </a>
                  ) : (
                    props.page2.cta.statement
                  )}
                </p>
              </div>
            </div>

          </div>
        </div>
      </OnePagerShell>
    </>
  );
}
