// /core/controllers/seoController.js
import * as seoService from '../services/seoService.js';

export async function sitemap(req, res, next) {
  try {
    const xml = await seoService.generateSitemap();
    res.header('Content-Type', 'application/xml').send(xml);
  } catch (err) {
    next(err);
  }
}

export async function robots(req, res, next) {
  try {
    const txt = seoService.generateRobotsTxt();
    res.header('Content-Type', 'text/plain').send(txt);
  } catch (err) {
    next(err);
  }
}

export async function meta(req, res, next) {
  try {
    const tags = await seoService.getMetaTags(req.params.slug);
    if (!tags) return res.status(404).json({ error: 'Not found' });
    res.json(tags);
  } catch (err) {
    next(err);
  }
}
