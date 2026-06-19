import React from "react";

type SystemsTouchedStripProps = {
  systems: string[];
};

export function SystemsTouchedStrip({ systems }: SystemsTouchedStripProps) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {systems.map((system, idx) => (
        <span
          key={idx}
          className="px-2 py-0.5 bg-gray-100 text-gray-600 text-[10px] font-medium rounded-full"
        >
          {system}
        </span>
      ))}
    </div>
  );
}
