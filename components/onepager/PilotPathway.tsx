import React from "react";

interface PilotStep {
  number: string;
  title: string;
  description: string;
  chips: string[];
}

interface PilotPathwayProps {
  steps: PilotStep[];
  goodFirstPilots: string[];
}

export function PilotPathway({ steps, goodFirstPilots }: PilotPathwayProps) {
  return (
    <div className="bg-gray-50 border border-gray-200 rounded-xl p-8">
      <div className="grid grid-cols-3 gap-6 mb-8 relative">
        {steps.map((step, index) => (
          <React.Fragment key={index}>
            <div className="relative">
              <div className="bg-white border border-gray-200 rounded-lg p-5 h-full flex flex-col">
                <div className="inline-flex items-center justify-center w-8 h-8 bg-[#ff4b1f] text-white text-xs font-bold rounded-full mb-3">
                  {step.number}
                </div>
                <h3 className="text-sm font-bold text-gray-900 mb-2 leading-tight">
                  {step.title}
                </h3>
                <p className="text-xs text-gray-600 mb-4 leading-relaxed">
                  {step.description}
                </p>
                <div className="flex flex-wrap gap-2 mt-auto">
                  {step.chips.map((chip, chipIndex) => (
                    <span
                      key={chipIndex}
                      className="inline-block px-2.5 py-1 bg-gray-100 text-gray-700 text-xs rounded border border-gray-200"
                    >
                      {chip}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            {index < steps.length - 1 && (
              <div className="absolute left-1/3 top-8 w-1/3 flex items-center justify-center pointer-events-none">
                <div className="w-full h-0.5 bg-[#ff4b1f] opacity-30 relative">
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-0 h-0 border-l-4 border-l-[#ff4b1f] border-y-2 border-y-transparent opacity-60"></div>
                </div>
              </div>
            )}
          </React.Fragment>
        ))}
      </div>

      <div className="border-t border-gray-300 pt-6">
        <div className="flex items-start gap-3">
          <span className="text-xs font-bold text-gray-700 uppercase tracking-wider whitespace-nowrap pt-1">
            Good first pilots:
          </span>
          <div className="flex flex-wrap gap-2">
            {goodFirstPilots.map((pilot, index) => (
              <span
                key={index}
                className="inline-block px-3 py-1.5 bg-white border border-[#ff4b1f] text-[#ff4b1f] text-xs font-medium rounded"
              >
                {pilot}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
