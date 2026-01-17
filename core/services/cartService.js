// /core/services/cartService.js
import db from '../db/index.js';

export async function getCart(userId) {
  return db.CartItem.findAll({
    where: { userId },
    include: [db.Publication]
  });
}

export async function addToCart(userId, publicationId, quantity = 1) {
  const existing = await db.CartItem.findOne({
    where: { userId, publicationId }
  });

  if (existing) {
    existing.quantity += quantity;
    return existing.save();
  }

  return db.CartItem.create({ userId, publicationId, quantity });
}

export async function updateCartItem(userId, id, quantity) {
  const item = await db.CartItem.findOne({ where: { id, userId } });
  if (!item) throw new Error('Not found');
  item.quantity = quantity;
  return item.save();
}

export async function removeFromCart(userId, id) {
  const item = await db.CartItem.findOne({ where: { id, userId } });
  if (!item) throw new Error('Not found');
  return item.destroy();
}

export async function clearCart(userId) {
  return db.CartItem.destroy({ where: { userId } });
}
