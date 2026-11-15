import type { MetadataRoute } from 'next';
import { projects, site } from '@/constants';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    '/',
    ...projects.map((p) => `/work/${p.slug}`),
  ].map((path) => ({
    url: `${site.url}${path}`,
  }));
}
