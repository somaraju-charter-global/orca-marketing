import React from "react";

type MiniWorkflowDiagramProps = {
  inputs: string[];
  orcaworksActions: string[];
  outputs: string[];
};

export function MiniWorkflowDiagram({
  inputs,
  orcaworksActions,
  outputs,
}: MiniWorkflowDiagramProps) {
  return (
    <div className="grid grid-cols-5 gap-4 items-center">
      <div className="space-y-2">
        <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
          INPUTS
        </h4>
        {inputs.slice(0, 4).map((input, idx) => (
          <div key={idx} className="flex items-start gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-gray-400 mt-1.5 flex-shrink-0" />
            <span className="text-sm text-gray-700 leading-tight">{input}</span>
          </div>
        ))}
      </div>
      <div className="text-center text-[#ff4b1f] text-2xl font-light">→</div>
      <div className="bg-[#030712] p-6 rounded-lg">
        <h4 className="text-xs font-semibold text-[#ff4b1f] uppercase tracking-wider mb-4">
          ORCAWORKS GOVERNED EXECUTION
        </h4>
        {orcaworksActions.slice(0, 5).map((action, idx) => (
          <div key={idx} className="flex items-start gap-2 mb-2">
            <div className="w-1.5 h-1.5 rounded-full bg-[#ff4b1f] mt-1.5 flex-shrink-0" />
            <span className="text-sm text-white leading-tight">{action}</span>
          </div>
        ))}
      </div>
      <div className="text-center text-[#ff4b1f] text-2xl font-light">→</div>
      <div className="space-y-2">
        <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
          OUTPUTS
        </h4>
        {outputs.slice(0, 4).map((output, idx) => (
          <div key={idx} className="flex items-start gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-gray-400 mt-1.5 flex-shrink-0" />
            <span className="text-sm text-gray-700 leading-tight">{output}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
