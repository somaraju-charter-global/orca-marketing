import { describe, it, expect } from 'vitest';
import { guides, getGuideBySlug } from '../registry';

describe('Registry', () => {
  describe('guides', () => {
    it('should export a guides object', () => {
      expect(guides).toBeDefined();
      expect(typeof guides).toBe('object');
    });

    it('should have valid guide entries', () => {
      Object.values(guides).forEach((guide) => {
        expect(guide).toHaveProperty('slug');
        expect(guide).toHaveProperty('title');
        expect(guide).toHaveProperty('pages');
        expect(Array.isArray(guide.pages)).toBe(true);
      });
    });

    it('should have unique slugs', () => {
      const slugs = Object.keys(guides);
      const uniqueSlugs = new Set(slugs);
      expect(slugs.length).toBe(uniqueSlugs.size);
    });
  });

  describe('getGuideBySlug', () => {
    it('should return guide when slug exists', async () => {
      const slug = Object.keys(guides)[0];
      if (slug) {
        const guide = await getGuideBySlug(slug, 'test-domain');
        expect(guide).toBeDefined();
        expect(guide?.slug).toBe(slug);
      }
    });

    it('should return null when slug does not exist', async () => {
      const guide = await getGuideBySlug('non-existent-slug', 'test-domain');
      expect(guide).toBeNull();
    });
  });
});
