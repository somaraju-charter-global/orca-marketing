import { getJson, listJsons } from "@/lib/storage";
import { validateTwoPageVerticalBrief } from "@/lib/validation";
import type { OnePager } from "./onepager-types";

const staticOnePagers: Record<string, OnePager> = {};

export const onePagers: Record<string, OnePager> = staticOnePagers;

export async function getOnePagerBySlug(
  slug: string,
  domain: string
): Promise<OnePager | null> {
  try {
    const blobData = await getJson(slug, domain);
    if (blobData) {
      const validation = validateTwoPageVerticalBrief(blobData);
      if (validation.success) {
        return validation.data;
      }
    }
  } catch (error) {
    console.error(`getOnePagerBySlug("${slug}") failed:`, error);
    // fall through to static registry
  }

  return staticOnePagers[slug] ?? null;
}

export async function getAllOnePagers(domain: string): Promise<OnePager[]> {
  const merged = new Map<string, OnePager>();

  for (const [slug, onePager] of Object.entries(staticOnePagers)) {
    merged.set(slug, onePager);
  }

  try {
    const jsonBlobs = await listJsons(domain);
    for (const blob of jsonBlobs) {
      const slug = blob.pathname.replace(/^domains\/[\w.-]+\/jsons\//, "").replace(/\.json$/, "");
      if (!slug) continue;

      const data = await getJson(slug, domain);
      const validation = validateTwoPageVerticalBrief(data);
      if (validation.success) {
        merged.set(slug, validation.data);
      }
    }
  } catch (error) {
    console.error("getAllOnePagers failed:", error);
    // ignore blob errors and return static list only
  }

  return Array.from(merged.values());
}
