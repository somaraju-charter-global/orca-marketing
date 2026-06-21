import React from "react";

interface ValueMetric {
  label: string;
  before: string;
  after: string;
  impact: string;
}

interface PilotStep {
  number: string;
  title: string;
  description: string;
}

interface PilotValueCaseProps {
  valueMetrics: ValueMetric[];
  pilotSteps: PilotStep[];
  goodFirstPilots: string[];
}

export function PilotValueCase({ valueMetrics, pilotSteps, goodFirstPilots }: PilotValueCaseProps) {
  return (
    <div className="bg-gray-50 border border-gray-200 rounded-xl p-8">
      {/* Value to Prove - Primary Visual Element */}
      <div className="mb-8">
        <div className={`grid gap-4 ${valueMetrics.length === 3 ? 'grid-cols-3' : 'grid-cols-4'}`}>
          {valueMetrics.map((metric, index) => (
            <div key={index} className="bg-white border border-gray-200 rounded-lg p-4 flex flex-col">
              <div className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-3 h-8 flex items-start">
                {metric.label}
              </div>
              <div className="flex items-center justify-center mb-3">
                <span className="text-sm text-gray-700">
                  {metric.before} → <span className="font-bold text-[#ff4b1f]">{metric.after}</span>
                </span>
              </div>
              <div className="text-xs text-gray-600 leading-snug text-center">
                {metric.impact}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Compact Pilot Pathway - Secondary */}
      <div className="mb-6 pb-6 border-b border-gray-300">
        <div className="flex items-start gap-6">
          {pilotSteps.map((step, index) => (
            <React.Fragment key={index}>
              <div className="flex-1">
                <div className="flex items-start gap-2 mb-1">
                  <div className="shrink-0 w-5 h-5 bg-[#ff4b1f] text-white text-xs font-bold rounded-full flex items-center justify-center">
                    {step.number}
                  </div>
                  <div className="flex-1">
                    <div className="text-xs font-bold text-gray-900 mb-1">
                      {step.title}
                    </div>
                    <div className="text-xs text-gray-600 leading-relaxed">
                      {step.description}
                    </div>
                  </div>
                </div>
              </div>
              {index < pilotSteps.length - 1 && (
                <div className="shrink-0 pt-2">
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Good First Pilots - Compact */}
      <div>
        <div className="flex items-start gap-3">
          <span className="text-xs font-semibold text-gray-600 uppercase tracking-wide shrink-0">
            Good first pilots:
          </span>
          <p className="text-xs text-gray-700">
            {goodFirstPilots.join(" · ")}
          </p>
        </div>
      </div>
    </div>
  );
}
