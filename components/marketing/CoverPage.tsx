import React from "react";
import { CoverPageContent } from "@/content/types";
import { BrandMotif } from "./BrandMotif";

type CoverPageProps = CoverPageContent;

export function CoverPage({
  title,
  subtitle,
  kicker,
  logoVariant = "white",
  image,
  sections,
}: CoverPageProps) {
  const logoSrc = logoVariant === "white" 
    ? "/logos/orcaworks-white.png" 
    : "/logos/orcaworks-dark.png";

  return (
    <div className="pdf-page bg-[var(--orca-dark)] text-white relative overflow-hidden">
      <BrandMotif variant="orange" size="lg" className="top-0 right-0" />
      <BrandMotif variant="blue" size="md" className="bottom-0 left-0" />
      
      {image && (
        <div className="absolute inset-0 z-0">
          <img src={image} alt="" className="w-full h-full object-cover opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--orca-dark)] via-[var(--orca-dark)]/80 to-transparent" />
        </div>
      )}
      
      <div className="relative z-10 h-full flex flex-col p-12">
        <div className="mb-auto">
          <img src={logoSrc} alt="Orcaworks" className="h-12 w-auto" />
        </div>
        
        <div className="flex-1 flex flex-col justify-center max-w-3xl">
          {kicker && (
            <div className="text-[var(--orca-orange)] text-sm font-semibold tracking-widest uppercase mb-4">
              {kicker}
            </div>
          )}
          <h1 className="text-6xl font-bold leading-tight mb-6">
            {title}
          </h1>
          {subtitle && (
            <p className="text-2xl text-white/80 font-light">
              {subtitle}
            </p>
          )}
        </div>
        
        {sections && sections.length > 0 && (
          <div className="mt-12 pt-8 border-t border-white/20">
            <div className="text-xs font-semibold tracking-widest uppercase text-white/50 mb-6">
              Contents
            </div>
            <div className="grid grid-cols-2 gap-4">
              {sections.map((section, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className="text-[var(--orca-orange)] text-sm font-bold">
                    {section.page}
                  </div>
                  <div className="text-sm text-white/70">{section.title}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
