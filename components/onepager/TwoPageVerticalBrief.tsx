import React from "react";
import Image from "next/image";
import type { TwoPageVerticalBrief } from "@/content/onepager-types";
import { OnePagerShell } from "./OnePagerShell";
import { CapabilityPillars } from "./CapabilityPillars";
import { UseCaseMenu } from "./UseCaseMenu";
import { PilotValueCase } from "./PilotValueCase";

export function TwoPageVerticalBrief(props: TwoPageVerticalBrief) {
  return (
    <>
      {/* Page 1: Executive Brief + Use-Case Menu */}
      <OnePagerShell
        footer={props.footer}
        variant="light"
      >
        <div className="h-full flex flex-col">
          {/* Hero Section */}
          <div className="bg-[#030712] text-white px-14 py-10 mb-10 relative overflow-hidden">
            <div className="flex items-start justify-between mb-6">
              <span className="text-xs font-semibold tracking-wider text-gray-400 uppercase">
                {props.eyebrow}
              </span>
              <Image
                src="/logos/orcaworks-dark.png"
                alt="Orcaworks"
                width={100}
                height={24}
                className="h-6 w-auto opacity-80"
              />
            </div>
            <h1 className="text-4xl font-bold mb-4 leading-tight max-w-2xl">{props.headline}</h1>
            <p className="text-base text-gray-300 leading-relaxed max-w-2xl">
              {props.subheadline}
            </p>
          </div>

          <div className="flex-1 px-14 pb-14 flex flex-col">

          {/* Executive POV */}
          <div className="mb-10">
            <p className="text-sm text-gray-700 leading-relaxed mb-3">
              {props.executivePov}
            </p>
            <p className="text-sm text-gray-600 italic leading-relaxed">
              {props.positioningStatement}
            </p>
          </div>

          {/* Capability Pillars */}
          <div className="mb-10">
            <h2 className="text-sm font-bold text-gray-800 uppercase tracking-wider mb-4">
              Strategic pillars
            </h2>
            <CapabilityPillars strategicPillars={props.strategicPillars} />
          </div>

          {/* Use-Case Menu */}
          <div className="mb-10">
            <h2 className="text-sm font-bold text-gray-800 uppercase tracking-wider mb-4">
              Supplier operations workflows to target
            </h2>
            <UseCaseMenu useCases={props.useCases} />
          </div>

          {/* Bottom Insight */}
          <div className="mt-auto border-l-4 border-[#ff4b1f] pl-4">
            <p className="text-sm text-gray-700 font-medium leading-relaxed italic">
              {props.bottomInsight}
            </p>
          </div>
          </div>
        </div>
      </OnePagerShell>

      {/* Page 2: Getting Started Framework */}
      <OnePagerShell
        footer={props.footer}
        variant="light"
      >
        <div className="h-full flex flex-col">
          {/* Page 2 Header */}
          <div className="bg-[#030712] text-white px-14 py-10 mb-10">
            <div className="flex items-start justify-between mb-6">
              <span className="text-xs font-semibold tracking-wider text-gray-400 uppercase">
                {props.eyebrow}
              </span>
              <Image
                src="/logos/orcaworks-dark.png"
                alt="Orcaworks"
                width={100}
                height={24}
                className="h-6 w-auto opacity-80"
              />
            </div>
            <h1 className="text-4xl font-bold mb-4 leading-tight max-w-2xl">{props.page2.title}</h1>
            <p className="text-base text-gray-300 leading-relaxed max-w-2xl">
              {props.page2.subtitle}
            </p>
          </div>

          <div className="flex-1 px-14 pb-14 flex flex-col">
          {/* Executive Blurb */}
          <div className="mb-6">
            <p className="text-sm text-gray-700 leading-relaxed">
              {props.page2.executiveBlurb}
            </p>
          </div>

          {/* Pilot Value Case */}
          <div className="mb-10">
            <PilotValueCase 
              valueMetrics={props.page2.valueMetrics}
              pilotSteps={props.page2.pilotSteps}
              goodFirstPilots={props.page2.goodFirstPilots}
            />
          </div>

          {/* CTA */}
          <div className="bg-[#030712] p-6 rounded-lg">
            <h3 className="text-base font-bold text-white mb-2">
              {props.page2.cta.title}
            </h3>
            <p className="text-sm text-gray-300 mb-4 leading-relaxed">
              {props.page2.cta.body}
            </p>
            {props.page2.cta.buttonLabel && (
              <div className="inline-block bg-[#ff4b1f] text-white px-5 py-2 rounded text-sm font-semibold">
                {props.page2.cta.buttonLabel}
              </div>
            )}
          </div>
          </div>
        </div>
      </OnePagerShell>
    </>
  );
}
