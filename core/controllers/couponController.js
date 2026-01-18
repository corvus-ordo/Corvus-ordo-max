// /core/controllers/couponController.js
import * as couponService from '../services/couponService.js';

export async function createCoupon(req, res, next) {
  try {
    const coupon = await couponService.createCoupon(req.body);
    res.status(201).json(coupon);
  } catch (err) {
    next(err);
  }
}

export async function validate(req, res, next) {
  try {
    const coupon = await couponService.validateCoupon(
      req.body.code,
      req.user.id
    );
    res.json(coupon);
  } catch (err) {
    next(err);
  }
}
