import { MarketingGuide } from "./types";

// Copy this file to registry.ts and add your guides
// Import your guide files from the guides/ directory
// Example:
// import { myGuide } from "./guides/my-guide";

export const guides: Record<string, MarketingGuide> = {
  // [myGuide.slug]: myGuide,
};

export function getGuideBySlug(slug: string) {
  return guides[slug];
}
