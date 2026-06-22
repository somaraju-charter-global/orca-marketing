import { templateGuide } from "./guides/template";
import { retailSupplyChainGuide as supplyChainGuide } from "./guides/retail-supply-chain-guide";

export const guides = {
  [templateGuide.slug]: templateGuide,
  [supplyChainGuide.slug]: supplyChainGuide,
};

export function getGuideBySlug(slug: string) {
  return guides[slug];
}
