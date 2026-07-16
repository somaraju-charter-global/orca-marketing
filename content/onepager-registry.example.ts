import type { TwoPageVerticalBrief } from "./onepager-types";

// Copy this file to onepager-registry.ts and add your two-pagers
// Import your two-pager files from the two-pagers/ directory
// Example:
// import { myTwoPager } from "./two-pagers/my-two-pager";

export const onePagers: Record<string, TwoPageVerticalBrief> = {
  // [myTwoPager.slug]: myTwoPager,
};

export function getOnePagerBySlug(slug: string) {
  return onePagers[slug as keyof typeof onePagers];
}
