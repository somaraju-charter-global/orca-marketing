import React from "react";

type ValueMeasuresProps = {
  measures: {
    title: string;
    description: string;
  }[];
};

export function ValueMeasures({ measures }: ValueMeasuresProps) {
  return (
    <div className="grid grid-cols-3 gap-4">
      {measures.map((measure, idx) => (
        <div key={idx} className="border-l-2 border-[#ff4b1f] pl-3">
          <h3 className="text-sm font-semibold text-gray-800 mb-1 leading-tight">
            {measure.title}
          </h3>
          <p className="text-xs text-gray-600 leading-relaxed">
            {measure.description}
          </p>
        </div>
      ))}
    </div>
  );
}
