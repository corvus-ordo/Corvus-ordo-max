// /core/services/recommendationService.js
import db from '../db/index.js';
import { Op } from 'sequelize';

export async function getSimilarPublications(publicationId) {
  const pub = await db.Publication.findByPk(publicationId, {
    include: [db.Tag, db.Category]
  });

  if (!pub) return [];

  const tagIds = pub.Tags.map(t => t.id);

  return db.Publication.findAll({
    where: {
      id: { [Op.ne]: pub.id },
      [Op.or]: [
        { categoryId: pub.categoryId },
        { '$Tags.id$': { [Op.in]: tagIds } }
      ]
    },
    include: [db.Tag],
    limit: 10
  });
}

export async function getBoughtTogether(publicationId) {
  const items = await db.OrderItem.findAll({
    where: { publicationId },
    include: [{ model: db.Order }]
  });

  const orderIds = items.map(i => i.Order.id);

  return db.OrderItem.findAll({
    where: {
      orderId: { [Op.in]: orderIds },
      publicationId: { [Op.ne]: publicationId }
    },
    include: [db.Publication],
    group: ['publicationId', 'Publication.id'],
    limit: 10
  });
}

export async function getWishlistBased(userId) {
  const wishlist = await db.WishlistItem.findAll({
    where: { userId },
    include: [db.Publication]
  });

  const tagIds = wishlist
    .flatMap(w => w.Publication.Tags?.map(t => t.id) || [])
    .filter(Boolean);

  if (!tagIds.length) return [];

  return db.Publication.findAll({
    where: {
      '$Tags.id$': { [Op.in]: tagIds }
    },
    include: [db.Tag],
    limit: 10
  });
}
