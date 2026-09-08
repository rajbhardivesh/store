import type { APIRoute } from 'astro';

const pages = [
  { url: 'https://rdhrobotics.in/', priority: '1.0', changefreq: 'daily' },
  { url: 'https://rdhrobotics.in/products/', priority: '0.9', changefreq: 'weekly' },
  { url: 'https://rdhrobotics.in/products/rf-hunter/', priority: '0.9', changefreq: 'weekly' },
  { url: 'https://rdhrobotics.in/products/usb-d-byte/', priority: '0.9', changefreq: 'weekly' },
  { url: 'https://rdhrobotics.in/about/', priority: '0.7', changefreq: 'monthly' },
  { url: 'https://rdhrobotics.in/contact/', priority: '0.7', changefreq: 'monthly' },
  { url: 'https://rdhrobotics.in/blog/', priority: '0.6', changefreq: 'weekly' },
];

export const GET: APIRoute = () => {
  const lastmod = new Date().toISOString().split('T')[0];
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${pages
  .map(
    (page) => `  <url>
    <loc>${page.url}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'X-Robots-Tag': 'noindex', // Sitemap file itself doesn't need to be indexed as a search result
    },
  });
};

