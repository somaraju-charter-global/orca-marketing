import React from "react";
import { DarkEditorialPageContent } from "@/content/types";
import { PageShell } from "./PageShell";
import { BrandMotif } from "./BrandMotif";
import { Editable } from "@/components/content-editor/Editable";
import { EditableImage } from "@/components/content-editor/EditableImage";

type DarkEditorialPageProps = DarkEditorialPageContent & { pageIndex?: number };

export function DarkEditorialPage({
  pageIndex = 0,
  eyebrow,
  headline,
  body,
  image,
  callout,
  surface,
  pageNumber,
}: DarkEditorialPageProps) {
  return (
    <PageShell variant="dark" surface={surface} pageNumber={pageNumber} showFooter={false}>
      <BrandMotif variant="orange" size="md" className="top-20 right-20" />

      <div className="h-full flex">
        <div className="w-1/2 p-12 flex flex-col justify-start">
          {eyebrow && (
            <div className="text-[var(--orca-orange)] text-xs font-semibold tracking-widest uppercase mb-4">
              <Editable path={["pages", pageIndex, "eyebrow"]} value={eyebrow} />
            </div>
          )}
          <h2 className="text-5xl font-bold leading-tight mb-6 text-[var(--page-fg)]">
            <Editable path={["pages", pageIndex, "headline"]} value={headline} multiline />
          </h2>
          {body && (
            <p className="text-[var(--page-fg)] text-lg leading-relaxed">
              <Editable path={["pages", pageIndex, "body"]} value={body} multiline />
            </p>
          )}
        </div>

        <div className="w-1/2 relative">
          <EditableImage
            path={["pages", pageIndex, "image"]}
            src={image}
            alt=""
            fill
            className="object-cover"
          />
          {callout && (
            <div className="absolute bottom-12 left-12 right-12 bg-[var(--orca-orange)] text-white p-6">
              <p className="text-lg font-semibold">
                <Editable path={["pages", pageIndex, "callout"]} value={callout} multiline />
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-[var(--page-line)]" />
    </PageShell>
  );
}
