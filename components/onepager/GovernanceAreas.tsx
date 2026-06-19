import React from "react";

type GovernanceAreasProps = {
  areas: {
    title: string;
    question: string;
  }[];
};

export function GovernanceAreas({ areas }: GovernanceAreasProps) {
  return (
    <div className="flex items-center gap-4">
      {areas.map((area, idx) => (
        <React.Fragment key={idx}>
          <div className="flex-1">
            <h3 className="text-sm font-bold text-gray-800 mb-1 leading-tight">
              {area.title}
            </h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              {area.question}
            </p>
          </div>
          {idx < areas.length - 1 && (
            <div className="text-[#ff4b1f] text-xl font-light">→</div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}
