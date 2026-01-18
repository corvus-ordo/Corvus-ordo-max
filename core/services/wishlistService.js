// /core/services/wishlistService.js
import db from '../db/index.js';

export async function getWishlist(userId) {
  return db.WishlistItem.findAll({
    where: { userId },
    include: [db.Publication]
  });
}

export async function addToWishlist(userId, publicationId) {
  const exists = await db.WishlistItem.findOne({
    where: { userId, publicationId }
  });

  if (exists) return exists;

  return db.WishlistItem.create({ userId, publicationId });
}

export async function removeFromWishlist(userId, id) {
  const item = await db.WishlistItem.findOne({ where: { id, userId } });
  if (!item) throw new Error('Not found');
  return item.destroy();
}
