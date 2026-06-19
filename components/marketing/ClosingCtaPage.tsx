import React from "react";
import { ClosingCtaPageContent } from "@/content/types";
import { BrandMotif } from "./BrandMotif";

type ClosingCtaPageProps = ClosingCtaPageContent;

export function ClosingCtaPage({
  headline,
  body,
  cta,
  website,
  pageNumber,
}: ClosingCtaPageProps) {
  return (
    <div className="pdf-page bg-[var(--orca-dark)] text-white relative overflow-hidden">
      <BrandMotif variant="orange" size="lg" className="top-0 right-0" />
      <BrandMotif variant="blue" size="md" className="bottom-0 left-0" />
      
      <div className="relative z-10 h-full flex flex-col p-12">
        <div className="mb-auto">
          <img src="/logos/orcaworks-white.png" alt="Orcaworks" className="h-12 w-auto" />
        </div>
        
        <div className="flex-1 flex flex-col justify-center max-w-2xl">
          <h2 className="text-5xl font-bold leading-tight mb-6">
            {headline}
          </h2>
          <p className="text-xl text-white/80 font-light mb-8">
            {body}
          </p>
          <div className="inline-block bg-[var(--orca-orange)] text-white px-8 py-4 rounded-lg font-semibold text-lg">
            {cta}
          </div>
          {website && (
            <div className="mt-6 text-white/60 text-sm">
              {website}
            </div>
          )}
        </div>
        
        <div className="mt-auto pt-8 border-t border-white/10 flex justify-between items-center">
          <div className="text-xs opacity-50">Orcaworks</div>
          {pageNumber && (
            <div className="text-xs opacity-50">{pageNumber}</div>
          )}
        </div>
      </div>
    </div>
  );
}
