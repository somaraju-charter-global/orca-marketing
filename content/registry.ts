import { templateGuide } from "./guides/template";

export const guides = {
  [templateGuide.slug]: templateGuide,
};

export function getGuideBySlug(slug: string) {
  return guides[slug];
}
