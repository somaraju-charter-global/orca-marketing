"use client";

import { useState } from "react";

type Section = "marketing" | "onepagers" | "two-pagers";
type PdfFormat = "guide" | "onepager";

interface GeneratePdfButtonProps {
  slug: string;
  section: Section;
  /** Overrides the section's default page format ("guide" = landscape, "onepager" = portrait). */
  format?: PdfFormat;
  className?: string;
}

export function GeneratePdfButton({
  slug,
  section,
  format,
  className,
}: GeneratePdfButtonProps) {
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");

  async function handleClick() {
    setStatus("loading");
    try {
      const response = await fetch("/api/generate-pdf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin",
        body: JSON.stringify({ slug, section, format }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => null);
        throw new Error(data?.error ?? "Failed to generate PDF");
      }

      const blob = await response.blob();
      const downloadUrl = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = `${slug}.pdf`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(downloadUrl);

      setStatus("idle");
    } catch (error) {
      console.error(error);
      setStatus("error");
      window.alert(
        error instanceof Error ? error.message : "Failed to generate PDF"
      );
    }
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={status === "loading"}
      className={className}
    >
      {status === "loading" ? "Generating PDF…" : "Generate PDF"}
    </button>
  );
}
