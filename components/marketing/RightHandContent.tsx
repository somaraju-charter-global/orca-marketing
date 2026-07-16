"use client";

import React from "react";
import { useGuideTheme } from "./GuideThemeContext";
import { Editable } from "@/components/content-editor/Editable";

export type RightHandContentType =
  | { type: "quote"; quote: string; source?: string; citation?: { text: string; url: string } }
  | { type: "highlightText"; text: string; color?: "orange" | "blue" | "ink" }
  | { type: "detailedText"; text: string; color?: "orange" | "blue" | "ink" | "healthcareMist" | "black" | "green" }
  | { type: "image"; src: string; alt?: string; objectFit?: "cover" | "contain" }
  | { type: "workflow"; steps: { number: string; title: string; description?: string }[] };

type RightHandContentProps = {
  content: RightHandContentType;
  /** Page index within the guide, used to build edit paths for this block. */
  pageIndex?: number;
};

export function RightHandContent({ content, pageIndex }: RightHandContentProps) {
  const guideTheme = useGuideTheme();
  const basePath = ["pages", pageIndex, "rightContent"] as (string | number)[];

  if (content.type === "quote") {
    return (
      <div className="h-full flex items-center justify-center p-12">
        <div className="bg-[var(--orca-orange)] text-white p-8 rounded-lg">
          <p className="text-xl font-semibold mb-4">
            &ldquo;
            {pageIndex !== undefined ? (
              <Editable path={[...basePath, "quote"]} value={content.quote} multiline />
            ) : (
              content.quote
            )}
            &rdquo;
          </p>
          {content.source && (
            <p className="text-sm opacity-80">
              —{" "}
              {pageIndex !== undefined ? (
                <Editable path={[...basePath, "source"]} value={content.source} />
              ) : (
                content.source
              )}
            </p>
          )}
        </div>
      </div>
    );
  }

  if (content.type === "highlightText") {
    const colorClass = content.color === "orange"
      ? "text-[var(--orca-orange)]"
      : content.color === "blue"
      ? "text-[var(--orca-blue)]"
      : "text-[var(--orca-ink)]";

    return (
      <div className="h-full flex items-center justify-center p-12 pt-6">
        <p className={`text-3xl font-bold leading-relaxed ${colorClass}`}>
          {pageIndex !== undefined ? (
            <Editable path={[...basePath, "text"]} value={content.text} multiline />
          ) : (
            content.text
          )}
        </p>
      </div>
    );
  }

  if (content.type === "detailedText") {
    // Priority: explicit color on this block > guide-level accentTheme > "ink" (default).
    const resolvedColor = content.color ?? guideTheme ?? "ink";

    const bgColorClass = resolvedColor === "orange"
      ? "bg-[var(--orca-orange)]"
      : resolvedColor === "blue"
      ? "bg-[var(--orca-blue)]"
      : resolvedColor === "healthcareMist"
      ? "bg-[var(--orca-healthcare-mist)]"
      : resolvedColor === "black"
      ? "bg-[var(--orca-black)]"
      : resolvedColor === "green"
      ? "bg-[var(--orca-green)]"
      : "bg-[var(--orca-panel-light)]";

    // healthcareMist and the ink/default case are both LIGHT backgrounds,
    // so they need dark text — but each uses its own paired ink token
    // rather than sharing one, so they can be tuned independently later.
    // orange, blue, black, and green are all dark backgrounds, so white
    // text is correct for those.
    const textColorClass = resolvedColor === "healthcareMist"
      ? "text-[var(--orca-ink)]"
      : resolvedColor === "ink"
      ? "text-[var(--orca-panel-light-ink)]"
      : "text-white";

    return (
      <div className="h-full flex items-center justify-center p-12">
        <div className={`${bgColorClass} ${textColorClass} p-8 rounded-lg`}>
          <p className="text-base leading-relaxed">
            {pageIndex !== undefined ? (
              <Editable path={[...basePath, "text"]} value={content.text} multiline />
            ) : (
              content.text
            )}
          </p>
        </div>
      </div>
    );
  }

  if (content.type === "image") {
    const objectFitClass = content.objectFit === "contain" ? "object-contain" : "object-cover";
    return (
      <div className="h-full flex items-center justify-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={content.src}
          alt={content.alt || ""}
          className={`w-full h-full ${objectFitClass}`}
        />
      </div>
    );
  }

  if (content.type === "workflow") {
    return (
      <div className="h-full flex items-center justify-center p-12">
        <div className="space-y-6 w-full">
          {content.steps.map((step, index) => (
            <div key={index} className="relative">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[var(--orca-orange)] text-white flex items-center justify-center font-bold text-sm">
                  {step.number}
                </div>
                <div className="flex-1 pt-1">
                  <h4 className="text-base font-bold text-[var(--orca-ink)] mb-1">
                    {pageIndex !== undefined ? (
                      <Editable
                        path={[...basePath, "steps", index, "title"]}
                        value={step.title}
                      />
                    ) : (
                      step.title
                    )}
                  </h4>
                  {step.description && (
                    <p className="text-sm text-[var(--orca-muted)] leading-relaxed">
                      {pageIndex !== undefined ? (
                        <Editable
                          path={[...basePath, "steps", index, "description"]}
                          value={step.description}
                          multiline
                        />
                      ) : (
                        step.description
                      )}
                    </p>
                  )}
                </div>
              </div>
              {index < content.steps.length - 1 && (
                <div className="absolute left-5 top-10 w-0.5 h-6 bg-[var(--orca-orange)] opacity-30" />
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }

  return null;
}
