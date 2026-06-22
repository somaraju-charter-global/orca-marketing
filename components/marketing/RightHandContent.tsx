import React from "react";

export type RightHandContentType = 
  | { type: "quote"; quote: string; source?: string }
  | { type: "detailedText"; text: string; color?: "orange" | "blue" | "ink" }
  | { type: "image"; src: string; alt?: string; objectFit?: "cover" | "contain" }
  | { type: "workflow"; steps: { number: string; title: string; description?: string }[] };

type RightHandContentProps = {
  content: RightHandContentType;
};

export function RightHandContent({ content }: RightHandContentProps) {
  if (content.type === "quote") {
    return (
      <div className="h-full flex items-center justify-center p-12">
        <div className="bg-[var(--orca-orange)] text-white p-8 rounded-lg">
          <p className="text-xl font-semibold mb-4">&ldquo;{content.quote}&rdquo;</p>
          {content.source && (
            <p className="text-sm opacity-80">— {content.source}</p>
          )}
        </div>
      </div>
    );
  }

  if (content.type === "detailedText") {
    const colorClass = content.color === "orange" 
      ? "text-[var(--orca-orange)]" 
      : content.color === "blue" 
      ? "text-[var(--orca-blue)]" 
      : "text-[var(--orca-ink)]";

    return (
      <div className="h-full flex items-center justify-center p-12 pt-6">
        <p className={`text-3xl font-bold leading-relaxed ${colorClass}`}>
          {content.text}
        </p>
      </div>
    );
  }

  if (content.type === "image") {
    const objectFitClass = content.objectFit === "contain" ? "object-contain" : "object-cover";
    return (
      <div className="h-full flex items-center justify-center">
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
                    {step.title}
                  </h4>
                  {step.description && (
                    <p className="text-sm text-[var(--orca-muted)] leading-relaxed">
                      {step.description}
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
