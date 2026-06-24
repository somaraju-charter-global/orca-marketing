import { templateGuide } from "./guides/template";
import { supplyChainGuide } from "./guides/supply-chain-guide";

export const guides = {
  [templateGuide.slug]: templateGuide,
  [supplyChainGuide.slug]: supplyChainGuide,
};

export function getGuideBySlug(slug: string) {
  return guides[slug];
}
