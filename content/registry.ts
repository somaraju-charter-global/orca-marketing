import { cache } from "react";
import { getGuideJson, listGuideJsons } from "@/lib/storage";
import { validateMarketingGuide } from "@/lib/guide-validation";
import type { MarketingGuide } from "./types";

const staticGuides: Record<string, MarketingGuide> = {};

export const guides = staticGuides;

export const getGuideBySlug = cache(async function getGuideBySlug(
  slug: string,
  domain: string
): Promise<MarketingGuide | null> {
  try {
    const blobData = await getGuideJson(slug, domain);
    if (blobData) {
      const validation = validateMarketingGuide(blobData);
      if (validation.success) {
        return validation.data;
      }
    }
  } catch (error) {
    console.error(`getGuideBySlug("${slug}") failed:`, error);
  }

  return staticGuides[slug] ?? null;
});

export async function getAllGuides(domain: string): Promise<MarketingGuide[]> {
  const merged = new Map<string, MarketingGuide>();

  for (const [slug, guide] of Object.entries(staticGuides)) {
    merged.set(slug, guide);
  }

  try {
    const jsonBlobs = await listGuideJsons(domain);
    for (const blob of jsonBlobs) {
      const slug = blob.pathname
        .replace(/^domains\/[\w.-]+\/guide-jsons\//, "")
        .replace(/\.json$/, "");
      if (!slug) continue;

      const data = await getGuideJson(slug, domain);
      const validation = validateMarketingGuide(data);
      if (validation.success) {
        merged.set(slug, validation.data);
      }
    }
  } catch (error) {
    console.error("getAllGuides failed:", error);
  }

  return Array.from(merged.values());
}
