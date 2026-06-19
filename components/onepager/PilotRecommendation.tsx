import React from "react";

type PilotRecommendationProps = {
  title: string;
  workflow: string;
  whyThisPilot: string;
  scope: string[];
};

export function PilotRecommendation({
  title,
  workflow,
  whyThisPilot,
  scope,
}: PilotRecommendationProps) {
  return (
    <div className="border-l-4 border-[#ff4b1f] bg-[#fff0ea] p-4 rounded-r-lg">
      <h3 className="text-xs font-bold text-[#ff4b1f] uppercase tracking-wider mb-2">
        RECOMMENDED FIRST PILOT
      </h3>
      <p className="text-sm font-semibold text-gray-800 mb-2">{workflow}</p>
      <p className="text-xs text-gray-700 leading-relaxed">
        {scope.join(" · ")}
      </p>
    </div>
  );
}
