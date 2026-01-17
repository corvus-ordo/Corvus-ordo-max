// /core/services/reviewService.js
import db from '../db/index.js';

export async function createReview(data) {
  return db.Review.create(data);
}

export async function updateReview(id, userId, data) {
  const review = await db.Review.findOne({ where: { id, userId } });
  if (!review) throw new Error('Not found');
  return review.update(data);
}

export async function deleteReview(id, userId) {
  const review = await db.Review.findOne({ where: { id, userId } });
  if (!review) throw new Error('Not found');
  return review.destroy();
}

export async function getReviewsForPublication(publicationId) {
  return db.Review.findAll({
    where: { publicationId },
    include: [{ model: db.User, attributes: ['id', 'email'] }],
    order: [['createdAt', 'DESC']]
  });
}
