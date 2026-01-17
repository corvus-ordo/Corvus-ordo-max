// /core/controllers/reviewController.js
import * as reviewService from '../services/reviewService.js';

export async function addReview(req, res, next) {
  try {
    const review = await reviewService.createReview({
      userId: req.user.id,
      publicationId: req.params.pubId,
      rating: req.body.rating,
      content: req.body.content
    });
    res.status(201).json(review);
  } catch (err) {
    next(err);
  }
}

export async function editReview(req, res, next) {
  try {
    const review = await reviewService.updateReview(
      req.params.id,
      req.user.id,
      req.body
    );
    res.json(review);
  } catch (err) {
    next(err);
  }
}

export async function removeReview(req, res, next) {
  try {
    await reviewService.deleteReview(req.params.id, req.user.id);
    res.json({ message: 'Review deleted' });
  } catch (err) {
    next(err);
  }
}

export async function getPublicationReviews(req, res, next) {
  try {
    const reviews = await reviewService.getReviewsForPublication(req.params.pubId);
    res.json(reviews);
  } catch (err) {
    next(err);
  }
}
