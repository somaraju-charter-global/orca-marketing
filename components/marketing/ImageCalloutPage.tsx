import React from "react";
import { ImageCalloutPageContent } from "@/content/types";
import { PageShell } from "./PageShell";
import { Editable } from "@/components/content-editor/Editable";
import { EditableImage } from "@/components/content-editor/EditableImage";

type ImageCalloutPageProps = ImageCalloutPageContent & { pageIndex?: number };

export function ImageCalloutPage({
  pageIndex = 0,
  eyebrow,
  headline,
  body,
  image,
  callout,
  surface,
  pageNumber,
}: ImageCalloutPageProps) {
  return (
    <PageShell variant="light" surface={surface} pageNumber={pageNumber} showFooter={false}>
      <div className="h-full flex">
        <div className="w-3/5 relative">
          <EditableImage
            path={["pages", pageIndex, "image"]}
            src={image}
            alt=""
            fill
            className="object-cover"
          />
        </div>

        <div className="w-2/5 p-12 flex flex-col justify-center relative">
          {eyebrow && (
            <div className="text-[var(--orca-orange)] text-xs font-semibold tracking-widest uppercase mb-4">
              <Editable path={["pages", pageIndex, "eyebrow"]} value={eyebrow} />
            </div>
          )}
          <h2 className="text-4xl font-bold leading-tight mb-6 text-[var(--page-fg)]">
            <Editable path={["pages", pageIndex, "headline"]} value={headline} multiline />
          </h2>
          {body && (
            <p className="text-[var(--page-muted)] text-base leading-relaxed mb-8">
              <Editable path={["pages", pageIndex, "body"]} value={body} multiline />
            </p>
          )}

          <div className="relative border-2 border-[var(--orca-orange)] p-6 bg-white">
            <div className="absolute -top-3 -left-3 w-6 h-6 border-t-2 border-l-2 border-[var(--orca-orange)]" />
            <div className="absolute -top-3 -right-3 w-6 h-6 border-t-2 border-r-2 border-[var(--orca-orange)]" />
            <div className="absolute -bottom-3 -left-3 w-6 h-6 border-b-2 border-l-2 border-[var(--orca-orange)]" />
            <div className="absolute -bottom-3 -right-3 w-6 h-6 border-b-2 border-r-2 border-[var(--orca-orange)]" />

            <p className="text-[var(--orca-orange)] text-xl font-bold">
              <Editable path={["pages", pageIndex, "callout"]} value={callout} multiline />
            </p>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-[var(--page-line)]" />
    </PageShell>
  );
}
