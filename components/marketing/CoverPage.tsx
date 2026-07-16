import React from "react";
import { CoverPageContent } from "@/content/types";
import { BrandMotif } from "./BrandMotif";
import { Editable } from "@/components/content-editor/Editable";

type CoverPageProps = CoverPageContent & { pageIndex?: number };

export function CoverPage({
  pageIndex = 0,
  title,
  subtitle,
  kicker,
  logoVariant = "white",
  image,
  imageTreatment = "fade",
  sections,
  background,
  textColor,
}: CoverPageProps) {
  const logoSrc = logoVariant === "white"
    ? "/logos/orcaworks-white.png"
    : "/logos/orcaworks-dark.png";

  // `background`/`textColor` are optional per-page overrides. When omitted,
  // this falls back to the original dark-panel look (which itself tracks
  // whatever the guide's accentTheme resolves --orca-dark to). Setting them
  // only affects this page — the rest of the guide keeps using the theme.
  const overrideVars = {
    "--cover-bg": background ?? "var(--orca-dark)",
    "--cover-fg": textColor ?? "#ffffff",
  } as React.CSSProperties;

  return (
    <div
      className="pdf-page bg-[var(--cover-bg)] text-[var(--cover-fg)] relative overflow-hidden"
      style={overrideVars}
    >
      <BrandMotif variant="orange" size="lg" className="top-0 right-0" />
      <BrandMotif variant="blue" size="md" className="bottom-0 left-0" />

      {image && (
        <div className="absolute inset-0 z-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={image}
            alt=""
            className={`w-full h-full object-cover ${imageTreatment === "fade" ? "" : ""}`}
          />
          {imageTreatment === "fade" && (
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--cover-bg)] via-[var(--cover-bg)] to-transparent" />
          )}
        </div>
      )}

      <div className="relative z-10 h-full flex flex-col p-12">
        <div className="mb-auto">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={logoSrc} alt="Orcaworks" className="h-auto w-48" />
        </div>

        <div className="flex-1 flex flex-col justify-center max-w-3xl">
          {kicker && (
            <div className="text-[var(--orca-orange)] text-sm font-semibold tracking-widest uppercase mb-4">
              <Editable path={["pages", pageIndex, "kicker"]} value={kicker} />
            </div>
          )}
          <h1 className="text-6xl font-bold leading-tight mb-6">
            <Editable path={["pages", pageIndex, "title"]} value={title} />
          </h1>
          {subtitle && (
            <p className="text-2xl text-[var(--cover-fg)] font-light">
              <Editable path={["pages", pageIndex, "subtitle"]} value={subtitle} multiline />
            </p>
          )}
        </div>

        {sections && sections.length > 0 && (
          <div className="mt-12 pt-8 border-t border-[var(--cover-fg)]/20">
            <div className="text-xs font-semibold tracking-widest uppercase text-[var(--cover-fg)] mb-6">
              Contents
            </div>
            <div className="grid grid-cols-2 gap-4">
              {sections.map((section, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className="text-[var(--orca-orange)] text-sm font-bold">
                    {section.page}
                  </div>
                  <div className="text-sm text-[var(--cover-fg)]">
                    <Editable
                      path={["pages", pageIndex, "sections", index, "title"]}
                      value={section.title}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
