import React from "react";

type MetricsPanelProps = {
  metrics: string[];
};

export function MetricsPanel({ metrics }: MetricsPanelProps) {
  return (
    <div>
      <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wider mb-4">
        How value is measured
      </h3>
      <div className="flex flex-wrap gap-3">
        {metrics.slice(0, 5).map((metric, idx) => (
          <span key={idx} className="text-sm text-gray-700">
            {metric}
            {idx < metrics.slice(0, 5).length - 1 && <span className="text-gray-400 mx-2">·</span>}
          </span>
        ))}
      </div>
    </div>
  );
}
