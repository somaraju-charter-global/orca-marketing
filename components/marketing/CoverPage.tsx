import React from "react";
import { CoverPageContent } from "@/content/types";
import { BrandMotif } from "./BrandMotif";
import { Editable } from "@/components/content-editor/Editable";
import { EditableImage } from "@/components/content-editor/EditableImage";

type CoverPageProps = CoverPageContent & { pageIndex?: number };

type TextPanelProps = {
  pageIndex: number;
  logoSrc: string;
  kicker?: string;
  title: string;
  subtitle?: string;
  sections?: { page: string; title: string }[];
  meta?: string[];
};

// Shared text column for the split and inset layouts: logo → eyebrow →
// headline → deck → (optional) mini-contents → (optional) meta line. The
// layouts differ only in how the image is treated beside this panel, so
// typography stays identical across them.
function TextPanel({ pageIndex, logoSrc, kicker, title, subtitle, sections, meta }: TextPanelProps) {
  return (
    <div className="h-full flex flex-col p-12">
      <div className="mb-auto">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logoSrc} alt="Orcaworks" className="h-auto w-40" />
      </div>

      <div className="flex-1 flex flex-col justify-center max-w-xl">
        {kicker && (
          <div className="text-[var(--orca-orange)] text-xs font-semibold tracking-[0.2em] uppercase mb-5">
            <Editable path={["pages", pageIndex, "kicker"]} value={kicker} />
          </div>
        )}
        <h1 className="text-[44px] font-bold leading-[1.1] tracking-tight mb-6">
          <Editable path={["pages", pageIndex, "title"]} value={title} />
        </h1>
        {subtitle && (
          <p className="text-lg text-[var(--cover-fg)]/75 leading-relaxed">
            <Editable path={["pages", pageIndex, "subtitle"]} value={subtitle} multiline />
          </p>
        )}
      </div>

      {sections && sections.length > 0 && (
        <div className="mt-8 pt-6 border-t border-[var(--cover-fg)]/15">
          <div className="text-xs font-semibold tracking-widest uppercase text-[var(--cover-fg)]/60 mb-4">
            Contents
          </div>
          <div className="grid grid-cols-2 gap-3">
            {sections.map((section, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="text-[var(--orca-orange)] text-sm font-bold">{section.page}</div>
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

      {meta && meta.length > 0 && (
        <div className="mt-8 pt-5 border-t border-[var(--cover-fg)]/15 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-[var(--cover-fg)]/60">
          {meta.map((item, index) => (
            <React.Fragment key={index}>
              {index > 0 && <span className="w-1 h-1 rounded-full bg-[var(--orca-orange)]" />}
              <span>
                <Editable path={["pages", pageIndex, "meta", index]} value={item} />
              </span>
            </React.Fragment>
          ))}
        </div>
      )}
    </div>
  );
}

export function CoverPage({
  pageIndex = 0,
  title,
  subtitle,
  kicker,
  logoVariant,
  image,
  imageTreatment = "fade",
  layout = "overlay",
  sections,
  meta,
  surface,
  background,
  textColor,
}: CoverPageProps) {
  // `surface` supplies light/dark defaults for background, text and logo.
  // Explicit `background`/`textColor`/`logoVariant` values still win —
  // they exist for off-palette choices like a teal cover.
  const isDarkSurface = surface !== "light";
  const logoSrc = (logoVariant ?? (isDarkSurface ? "white" : "dark")) === "white"
    ? "/logos/orcaworks-white.png"
    : "/logos/orcaworks-dark.png";

  const overrideVars = {
    "--cover-bg": background ?? (isDarkSurface ? "var(--orca-dark)" : "#f9feff"),
    "--cover-fg": textColor ?? (isDarkSurface ? "#ffffff" : "#0c0c09"),
  } as React.CSSProperties;

  const textPanel = (
    <TextPanel
      pageIndex={pageIndex}
      logoSrc={logoSrc}
      kicker={kicker}
      title={title}
      subtitle={subtitle}
      sections={sections}
      meta={meta}
    />
  );

  // Split layout: text on a solid panel, image bleeding the full height on
  // the right. A gradient at the seam and a light tint keep the photo from
  // reading as a pasted-in rectangle.
  if (layout === "split" && image) {
    return (
      <div
        id={`page-${pageIndex + 1}`}
        className="pdf-page bg-[var(--cover-bg)] text-[var(--cover-fg)] relative overflow-hidden"
        style={overrideVars}
      >
        <div className="h-full flex">
          <div className="w-[58%] h-full">{textPanel}</div>
          <div className="w-[42%] h-full relative">
            <EditableImage
              path={["pages", pageIndex, "image"]}
              src={image}
              alt=""
              fill
              optional
              className="object-cover"
            />
            <div className="absolute inset-0 bg-[var(--cover-bg)]/20 pointer-events-none" />
            <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[var(--cover-bg)] to-transparent pointer-events-none" />
            <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[var(--cover-bg)] to-transparent pointer-events-none" />
          </div>
        </div>
      </div>
    );
  }

  // Inset layout: text left, image as a framed card on the right with brand
  // offset blocks behind it. The card is sized close to a typical stock
  // image's native resolution, so small or landscape assets stay crisp.
  if (layout === "inset" && image) {
    return (
      <div
        id={`page-${pageIndex + 1}`}
        className="pdf-page bg-[var(--cover-bg)] text-[var(--cover-fg)] relative overflow-hidden"
        style={overrideVars}
      >
        <div className="h-full flex">
          <div className="w-[56%] h-full">{textPanel}</div>
          <div className="w-[44%] h-full relative flex items-center justify-center pr-12 pl-4">
            <div className="relative w-full aspect-[4/3]">
              <div className="absolute -right-5 -bottom-5 w-full h-full rounded-2xl bg-[var(--orca-orange)]" />
              <div className="absolute -left-4 -top-4 w-24 h-24 rounded-2xl bg-[var(--orca-frost)]" />
              <div className="absolute inset-0 rounded-2xl overflow-hidden shadow-2xl ring-1 ring-black/10">
                <EditableImage
                  path={["pages", pageIndex, "image"]}
                  src={image}
                  alt=""
                  fill
                  optional
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      id={`page-${pageIndex + 1}`}
      className="pdf-page bg-[var(--cover-bg)] text-[var(--cover-fg)] relative overflow-hidden"
      style={overrideVars}
    >
      <BrandMotif variant="orange" size="lg" className="top-0 right-0" />
      <BrandMotif variant="blue" size="md" className="bottom-0 left-0" />

      {image && (
        <div className="absolute inset-0 z-0">
          <EditableImage
            path={["pages", pageIndex, "image"]}
            src={image}
            alt=""
            fill
            optional
            className={`object-cover ${imageTreatment === "fade" ? "" : ""}`}
          />
          {imageTreatment === "fade" && (
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--cover-bg)] via-[var(--cover-bg)] to-transparent pointer-events-none" />
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

        {meta && meta.length > 0 && (
          <div className="mt-8 pt-5 border-t border-[var(--cover-fg)]/20 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-[var(--cover-fg)]/70">
            {meta.map((item, index) => (
              <React.Fragment key={index}>
                {index > 0 && <span className="w-1 h-1 rounded-full bg-[var(--orca-orange)]" />}
                <span>
                  <Editable path={["pages", pageIndex, "meta", index]} value={item} />
                </span>
              </React.Fragment>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
