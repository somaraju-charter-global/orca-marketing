import React from "react";

type SelectionCriteriaProps = {
  criteria: {
    title: string;
    description: string;
  }[];
};

export function SelectionCriteria({ criteria }: SelectionCriteriaProps) {
  return (
    <div className="border border-gray-200 bg-gray-50 p-4 rounded-lg">
      <div className="grid grid-cols-2 gap-4">
        {criteria.map((item, idx) => (
          <div key={idx}>
            <h3 className="text-xs font-bold text-gray-800 mb-1 leading-tight">
              {item.title}
            </h3>
            <p className="text-xs text-gray-600 leading-tight">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
