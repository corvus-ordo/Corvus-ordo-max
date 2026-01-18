import db from '../db/index.js';
import { getCache, setCache } from '../services/cacheService.js';

export async function listPublications(req, res, next) {
  try {
    const cacheKey = `pubs:${JSON.stringify(req.query)}`;
    const cached = getCache(cacheKey);
    if (cached) return res.json({ success: true, data: cached });

    const { page = 1, limit = 20, sort, category, tags } = req.query;

    const where = {};
    if (category) where.categoryId = category;
    if (tags) where['$Tags.id$'] = tags.split(',');

    const order = [];
    if (sort === 'price_asc') order.push(['price', 'ASC']);
    if (sort === 'price_desc') order.push(['price', 'DESC']);
    if (sort === 'newest') order.push(['createdAt', 'DESC']);

    const publications = await db.Publication.findAll({
      where,
      include: [db.Tag, db.Category],
      limit: Number(limit),
      offset: (page - 1) * limit,
      order
    });

    setCache(cacheKey, publications, 60);

    res.json({ success: true, data: publications });
  } catch (err) {
    next(err);
  }
}
