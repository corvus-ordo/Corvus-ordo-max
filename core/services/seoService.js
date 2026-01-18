// /core/services/seoService.js
import db from '../db/index.js';

export async function generateSitemap() {
  const publications = await db.Publication.findAll({
    where: { isActive: true },
    attributes: ['id', 'slug', 'updatedAt']
  });

  const urls = publications.map(pub => {
    return `
  <url>
    <loc>${process.env.FRONTEND_URL}/publication/${pub.slug}</loc>
    <lastmod>${pub.updatedAt.toISOString()}</lastmod>
  </url>`;
  });

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('\n')}
</urlset>`;
}

export function generateRobotsTxt() {
  return `User-agent: *
Allow: /
Sitemap: ${process.env.FRONTEND_URL}/sitemap.xml`;
}

export async function getMetaTags(slug) {
  const pub = await db.Publication.findOne({
    where: { slug },
    include: [db.Category, db.Tag]
  });

  if (!pub) return null;

  return {
    title: `${pub.title} | ${pub.Category?.name}`,
    description: pub.description.slice(0, 160),
    image: pub.coverImage,
    url: `${process.env.FRONTEND_URL}/publication/${slug}`
  };
}
