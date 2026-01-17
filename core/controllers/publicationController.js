// /core/controllers/publicationController.js
import * as publicationService from '../services/publicationService.js';

export async function createPublication(req, res, next) {
  try {
    const pub = await publicationService.createPublication(req.body);
    res.status(201).json(pub);
  } catch (err) {
    next(err);
  }
}

export async function updatePublication(req, res, next) {
  try {
    const pub = await publicationService.updatePublication(req.params.id, req.body);
    res.json(pub);
  } catch (err) {
    next(err);
  }
}

export async function deletePublication(req, res, next) {
  try {
    await publicationService.deletePublication(req.params.id);
    res.json({ message: 'Publication deleted' });
  } catch (err) {
    next(err);
  }
}

export async function getPublication(req, res, next) {
  try {
    const pub = await publicationService.getPublicationBySlug(req.params.slug);
    if (!pub) return res.status(404).json({ error: 'Not found' });
    res.json(pub);
  } catch (err) {
    next(err);
  }
}

export async function getAllPublications(req, res, next) {
  try {
    const pubs = await publicationService.getAllPublications();
    res.json(pubs);
  } catch (err) {
    next(err);
  }
}
