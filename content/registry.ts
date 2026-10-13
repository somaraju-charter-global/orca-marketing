import { getGuideJson, listGuideJsons } from "@/lib/storage";
import { validateMarketingGuide } from "@/lib/guide-validation";
import type { MarketingGuide } from "./types";

const staticGuides: Record<string, MarketingGuide> = {};

export const guides = staticGuides;

export async function getGuideBySlug(slug: string): Promise<MarketingGuide | null> {
  try {
    const blobData = await getGuideJson(slug);
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
}

export async function getAllGuides(): Promise<MarketingGuide[]> {
  const merged = new Map<string, MarketingGuide>();

  for (const [slug, guide] of Object.entries(staticGuides)) {
    merged.set(slug, guide);
  }

  try {
    const jsonBlobs = await listGuideJsons();
    for (const blob of jsonBlobs) {
      const slug = blob.pathname
        .replace(/^guide-jsons\//, "")
        .replace(/\.json$/, "");
      if (!slug) continue;

      const data = await getGuideJson(slug);
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
