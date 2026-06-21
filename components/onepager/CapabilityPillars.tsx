import React from "react";

type CapabilityPillarsProps = {
  strategicPillars: {
    title: string;
    description: string;
  }[];
};

export function CapabilityPillars({ strategicPillars }: CapabilityPillarsProps) {
  return (
    <div className="grid grid-cols-3 gap-6">
      {strategicPillars.map((pillar, idx) => (
        <div key={idx} className="flex gap-3">
          <div className="w-0.5 bg-[#ff4b1f]"></div>
          <div className="flex-1">
            <h3 className="text-sm font-bold text-gray-800 mb-2 leading-tight">
              {pillar.title}
            </h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              {pillar.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
