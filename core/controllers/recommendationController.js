// /core/controllers/recommendationController.js
import * as recommendationService from '../services/recommendationService.js';

export async function similar(req, res, next) {
  try {
    const pubs = await recommendationService.getSimilarPublications(req.params.id);
    res.json(pubs);
  } catch (err) {
    next(err);
  }
}

export async function boughtTogether(req, res, next) {
  try {
    const pubs = await recommendationService.getBoughtTogether(req.params.id);
    res.json(pubs);
  } catch (err) {
    next(err);
  }
}

export async function wishlistBased(req, res, next) {
  try {
    const pubs = await recommendationService.getWishlistBased(req.user.id);
    res.json(pubs);
  } catch (err) {
    next(err);
  }
}
