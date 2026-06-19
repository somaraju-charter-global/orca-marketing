import React from "react";

type CapabilityPillarsProps = {
  capabilities: {
    title: string;
    description: string;
  }[];
};

export function CapabilityPillars({ capabilities }: CapabilityPillarsProps) {
  return (
    <div className="grid grid-cols-3 gap-6">
      {capabilities.map((capability, idx) => (
        <div key={idx} className="flex gap-3">
          <div className="w-0.5 bg-[#ff4b1f]"></div>
          <div className="flex-1">
            <h3 className="text-sm font-bold text-gray-800 mb-2 leading-tight">
              {capability.title}
            </h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              {capability.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
