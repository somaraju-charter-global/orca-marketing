import React from "react";

type BrandMotifProps = {
  variant?: "orange" | "blue";
  size?: "sm" | "md" | "lg";
  className?: string;
};

export function BrandMotif({ variant = "orange", size = "md", className = "" }: BrandMotifProps) {
  const sizeStyles = {
    sm: "w-16 h-16",
    md: "w-32 h-32",
    lg: "w-48 h-48",
  };

  const colorStyles = {
    orange: "bg-[var(--orca-orange)]",
    blue: "bg-[var(--orca-blue)]",
  };

  return (
    <div
      className={`absolute ${sizeStyles[size]} ${colorStyles[variant]} rounded-full ${className}`}
    />
  );
}
