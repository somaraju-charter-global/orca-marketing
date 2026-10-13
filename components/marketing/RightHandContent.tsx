"use client";

import React from "react";
import { Editable } from "@/components/content-editor/Editable";

export type RightHandContentType =
  | { type: "quote"; quote: string; source?: string; presentation?: "card" | "band" | "bare" | "panel"; citation?: { text: string; url: string } }
  | { type: "stat"; value: string; label: string; source?: string }
  | { type: "image"; src: string; alt?: string; objectFit?: "cover" | "contain" };

type RightHandContentProps = {
  content: RightHandContentType;
  /** Page index within the guide, used to build edit paths for this block. */
  pageIndex?: number;
};

export function RightHandContent({ content, pageIndex }: RightHandContentProps) {
  const basePath = ["pages", pageIndex, "rightContent"] as (string | number)[];

  if (content.type === "quote") {
    if (content.presentation === "band") {
      // Rendered by the page as a full-width foot band, not in this column.
      return null;
    }

    if (content.presentation === "panel") {
      // Same tonal card as the darkEditorial statement callout, built from
      // the page tokens so it follows the light/dark surface.
      return (
        <div className="h-full flex items-center p-12">
          <div
            className="relative w-full rounded-2xl overflow-hidden px-10 pt-20 pb-10"
            style={{
              background:
                "linear-gradient(135deg, color-mix(in srgb, var(--page-panel) 35%, var(--page-bg)) 0%, var(--page-panel) 100%)",
            }}
          >
            <span
              aria-hidden="true"
              className="absolute top-6 left-8 text-[8rem] leading-[0.7] font-serif select-none text-[var(--page-accent)] opacity-15"
            >
              &ldquo;
            </span>
            <blockquote className="relative">
              <p className="text-2xl font-semibold leading-snug text-[var(--page-fg)]">
                {pageIndex !== undefined ? (
                  <Editable path={[...basePath, "quote"]} value={content.quote} multiline />
                ) : (
                  content.quote
                )}
              </p>
              {content.source && (
                <footer className="mt-8 flex items-center gap-4">
                  <span className="h-0.5 w-10 shrink-0 bg-[var(--orca-orange)]" />
                  <span className="text-xs font-semibold tracking-widest uppercase text-[var(--page-accent)]">
                    {pageIndex !== undefined ? (
                      <Editable path={[...basePath, "source"]} value={content.source} />
                    ) : (
                      content.source
                    )}
                  </span>
                </footer>
              )}
            </blockquote>
          </div>
        </div>
      );
    }

    if (content.presentation === "bare") {
      return (
        <div className="h-full relative flex items-center p-12">
          <div
            aria-hidden
            className="absolute -top-6 right-4 font-serif text-[13rem] leading-none text-[var(--page-fg)] opacity-[0.06] select-none pointer-events-none"
          >
            &ldquo;
          </div>
          <div>
            <p className="text-2xl font-semibold text-[var(--page-fg)] leading-snug mb-6">
              {pageIndex !== undefined ? (
                <Editable path={[...basePath, "quote"]} value={content.quote} multiline />
              ) : (
                content.quote
              )}
            </p>
            {content.source && (
              <div className="flex items-center gap-3">
                <div className="w-6 h-0.5 bg-[var(--orca-orange)]" />
                <p className="text-xs font-semibold tracking-widest uppercase text-[var(--page-muted)]">
                  {pageIndex !== undefined ? (
                    <Editable path={[...basePath, "source"]} value={content.source} />
                  ) : (
                    content.source
                  )}
                </p>
              </div>
            )}
          </div>
        </div>
      );
    }

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

  if (content.type === "stat") {
    // Market-research figure — a tonal panel, deliberately different from
    // the solid-orange practitioner quote card.
    return (
      <div className="h-full flex items-center justify-center p-12">
        <div className="bg-[var(--page-panel)] text-[var(--page-panel-fg)] p-10 rounded-lg ring-1 ring-[var(--page-line)] w-full">
          <p className="text-6xl font-bold text-[var(--orca-orange)] mb-4 leading-none">
            {pageIndex !== undefined ? (
              <Editable path={[...basePath, "value"]} value={content.value} />
            ) : (
              content.value
            )}
          </p>
          <p className="text-base leading-relaxed mb-6">
            {pageIndex !== undefined ? (
              <Editable path={[...basePath, "label"]} value={content.label} multiline />
            ) : (
              content.label
            )}
          </p>
          {content.source && (
            <div className="flex items-center gap-3">
              <div className="w-6 h-0.5 bg-[var(--orca-orange)]" />
              <p className="text-xs font-semibold tracking-widest uppercase opacity-70">
                {pageIndex !== undefined ? (
                  <Editable path={[...basePath, "source"]} value={content.source} />
                ) : (
                  content.source
                )}
              </p>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (content.type === "image") {
    // Inset rather than edge-to-edge: padded, rounded and ringed so the
    // photo reads as a framed object on the page, not a half-bleed panel.
    const objectFitClass = content.objectFit === "contain" ? "object-contain" : "object-cover";
    return (
      // Extra bottom padding keeps the frame clear of the absolutely-
      // positioned page footer.
      <div className="h-full flex items-center justify-center p-10 pb-24">
        <div className="w-full h-full rounded-lg overflow-hidden ring-1 ring-[var(--page-line)]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={content.src}
            alt={content.alt || ""}
            className={`w-full h-full ${objectFitClass}`}
          />
        </div>
      </div>
    );
  }

  return null;
}
