import React from "react";
import { DarkEditorialPageContent } from "@/content/types";
import { PageShell } from "./PageShell";
import { BrandMotif } from "./BrandMotif";

type DarkEditorialPageProps = DarkEditorialPageContent;

export function DarkEditorialPage({
  eyebrow,
  headline,
  body,
  image,
  callout,
  pageNumber,
}: DarkEditorialPageProps) {
  return (
    <PageShell variant="dark" pageNumber={pageNumber} showFooter={false}>
      <BrandMotif variant="orange" size="md" className="top-20 right-20" />
      
      <div className="h-full flex">
        <div className="w-1/2 p-12 flex flex-col justify-center">
          {eyebrow && (
            <div className="text-[var(--orca-orange)] text-xs font-semibold tracking-widest uppercase mb-4">
              {eyebrow}
            </div>
          )}
          <h2 className="text-5xl font-bold leading-tight mb-6 text-[var(--orca-blue)]">
            {headline}
          </h2>
          {body && (
            <p className="text-white/70 text-lg leading-relaxed">
              {body}
            </p>
          )}
        </div>
        
        <div className="w-1/2 relative">
          <img
            src={image}
            alt=""
            className="w-full h-full object-cover"
          />
          {callout && (
            <div className="absolute bottom-12 left-12 right-12 bg-[var(--orca-orange)] text-white p-6">
              <p className="text-lg font-semibold">{callout}</p>
            </div>
          )}
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-px bg-white/10" />
    </PageShell>
  );
}
