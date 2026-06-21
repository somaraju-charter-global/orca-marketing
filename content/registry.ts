import { templateGuide } from "./guides/template";
import { retailSupplyChainGuide } from "./guides/retail-supply-chain-guide";

export const guides = {
  [templateGuide.slug]: templateGuide,
  [retailSupplyChainGuide.slug]: retailSupplyChainGuide,
};

export function getGuideBySlug(slug: string) {
  return guides[slug];
}
