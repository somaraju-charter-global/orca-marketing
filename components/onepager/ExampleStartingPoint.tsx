import React from "react";

type ExampleStartingPointProps = {
  examples: {
    title: string;
    scope: string;
  }[];
};

export function ExampleStartingPoint({ examples }: ExampleStartingPointProps) {
  return (
    <div className="border-l-4 border-[#ff4b1f] bg-[#fff0ea] p-3 rounded-r-lg">
      {examples.map((example, idx) => (
        <div key={idx} className={idx > 0 ? "mt-3 pt-3 border-t border-[#ff4b1f]/20" : ""}>
          <h3 className="text-sm font-bold text-gray-800 mb-1 leading-tight">
            {example.title}
          </h3>
          <p className="text-xs text-gray-600 leading-relaxed">
            {example.scope}
          </p>
        </div>
      ))}
    </div>
  );
}
