import { describe, it, expect } from 'vitest';
import { onePagers, getOnePagerBySlug } from '../onepager-registry';

describe('OnePager Registry', () => {
  describe('onePagers', () => {
    it('should export a onePagers object', () => {
      expect(onePagers).toBeDefined();
      expect(typeof onePagers).toBe('object');
    });

    it('should have valid two-pager entries', () => {
      Object.values(onePagers).forEach((onePager) => {
        expect(onePager).toHaveProperty('slug');
        expect(onePager).toHaveProperty('layout');
        expect(onePager).toHaveProperty('hero');
        expect(onePager).toHaveProperty('page1');
        expect(onePager).toHaveProperty('page2');
      });
    });

    it('should have unique slugs', () => {
      const slugs = Object.keys(onePagers);
      const uniqueSlugs = new Set(slugs);
      expect(slugs.length).toBe(uniqueSlugs.size);
    });
  });

  describe('getOnePagerBySlug', () => {
    it('should return two-pager when slug exists', async () => {
      const slug = Object.keys(onePagers)[0];
      if (slug) {
        const onePager = await getOnePagerBySlug(slug, 'test-domain');
        expect(onePager).toBeDefined();
        expect(onePager?.slug).toBe(slug);
      }
    });

    it('should return null when slug does not exist', async () => {
      const onePager = await getOnePagerBySlug('non-existent-slug', 'test-domain');
      expect(onePager).toBeNull();
    });
  });
});
