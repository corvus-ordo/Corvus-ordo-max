// /core/services/couponService.js
import db from '../db/index.js';
import { Op } from 'sequelize';

export async function createCoupon(data) {
  return db.Coupon.create(data);
}

export async function validateCoupon(code, userId) {
  const coupon = await db.Coupon.findOne({
    where: {
      code,
      [Op.or]: [{ userId }, { userId: null }]
    }
  });

  if (!coupon) throw new Error('Invalid coupon');
  if (coupon.expiresAt && coupon.expiresAt < new Date()) throw new Error('Expired');
  if (coupon.usedCount >= coupon.maxUses) throw new Error('Usage limit reached');

  return coupon;
}

export async function applyCoupon(coupon, total) {
  if (coupon.type === 'percent') {
    return total - (total * Number(coupon.value)) / 100;
  }

  if (coupon.type === 'fixed') {
    return Math.max(0, total - Number(coupon.value));
  }

  return total;
}

export async function markCouponUsed(couponId) {
  const coupon = await db.Coupon.findByPk(couponId);
  coupon.usedCount += 1;
  return coupon.save();
}
