// /core/controllers/publicController.js
import * as publicService from '../services/publicService.js';

export async function getHome(req, res, next) {
  try {
    const pubs = await publicService.getHomePublications();
    res.json(pubs);
  } catch (err) {
    next(err);
  }
}

export async function search(req, res, next) {
  try {
    const { q, categoryId, tagId } = req.query;
    const pubs = await publicService.searchPublications(q, { categoryId, tagId });
    res.json(pubs);
  } catch (err) {
    next(err);
  }
}
