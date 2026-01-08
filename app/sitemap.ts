import {MetadataRoute} from 'next';
export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'https://businesswebhero.com';
  return [{ url: `${base}/`, lastModified: new Date() }, { url: `${base}/fr`, lastModified: new Date() }];
}
