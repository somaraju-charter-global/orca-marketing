import { ninetyDayGuide } from "./guides/ninety-day-guide";
import { supplyChainUseCasesGuide } from "./guides/supply-chain-use-cases";

export const guides = {
  [ninetyDayGuide.slug]: ninetyDayGuide,
  [supplyChainUseCasesGuide.slug]: supplyChainUseCasesGuide,
};

export function getGuideBySlug(slug: string) {
  return guides[slug];
}
