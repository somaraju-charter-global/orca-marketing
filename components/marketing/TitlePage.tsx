import React from "react";
import { TitlePageContent } from "@/content/types";
import { BrandMotif } from "./BrandMotif";

type TitlePageProps = TitlePageContent;

export function TitlePage({
  title,
  subtitle,
  kicker,
  logoVariant = "white",
  image,
}: TitlePageProps) {
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
      
      <div className="relative z-10 h-full flex flex-col p-12 justify-center items-center text-center">
        <div className="mb-8">
          <img src={logoSrc} alt="Orcaworks" className="h-12 w-auto" />
        </div>
        
        <div className="max-w-3xl">
          {kicker && (
            <div className="text-[var(--orca-orange)] text-sm font-semibold tracking-widest uppercase mb-6">
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
      </div>
    </div>
  );
}
