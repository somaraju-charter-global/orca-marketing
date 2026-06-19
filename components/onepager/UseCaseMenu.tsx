import React from "react";

type UseCaseMenuProps = {
  useCases: {
    title: string;
    description: string;
  }[];
};

export function UseCaseMenu({ useCases }: UseCaseMenuProps) {
  return (
    <div className="space-y-3">
      {useCases.map((useCase, idx) => (
        <div key={idx} className="flex gap-4 items-start">
          <span className="text-lg font-bold text-[#ff4b1f] leading-none">
            {String(idx + 1).padStart(2, "0")}
          </span>
          <div className="flex-1">
            <h3 className="text-sm font-bold text-gray-800 mb-1 leading-tight">
              {useCase.title}
            </h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              {useCase.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
