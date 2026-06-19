import React from "react";

type HumanControlsPanelProps = {
  humanControls: string[];
  exceptionTriggers: string[];
};

export function HumanControlsPanel({
  humanControls,
  exceptionTriggers,
}: HumanControlsPanelProps) {
  return (
    <div className="border-t border-gray-200 pt-6">
      <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wider mb-4">
        Governed automation, not black-box automation
      </h3>
      <div className="grid grid-cols-2 gap-8">
        <div>
          <h4 className="text-xs font-semibold text-gray-600 uppercase tracking-wider mb-3">
            Humans decide
          </h4>
          <p className="text-sm text-gray-700 leading-tight">
            {humanControls.join(" · ")}
          </p>
        </div>
        <div>
          <h4 className="text-xs font-semibold text-gray-600 uppercase tracking-wider mb-3">
            Orcaworks escalates
          </h4>
          <p className="text-sm text-gray-700 leading-tight">
            {exceptionTriggers.join(" · ")}
          </p>
        </div>
      </div>
    </div>
  );
}
