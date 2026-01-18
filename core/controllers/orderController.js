// /core/controllers/orderController.js
import * as orderService from '../services/orderService.js';
import * as cartService from '../services/cartService.js';
import * as couponService from '../services/couponService.js';

export async function createOrder(req, res, next) {
  try {
    const userId = req.user.id;
    const cartItems = await cartService.getCart(userId);

    if (!cartItems.length) {
      return res.status(400).json({ error: 'Cart is empty' });
    }

    let total = 0;

    for (const item of cartItems) {
      total += Number(item.Publication.price) * item.quantity;
    }

    if (req.body.couponCode) {
      const coupon = await couponService.validateCoupon(
        req.body.couponCode,
        userId
      );

      total = await couponService.applyCoupon(coupon, total);

      await couponService.markCouponUsed(coupon.id);
    }

    const order = await orderService.createOrder({
      userId,
      items: cartItems,
      total
    });

    await cartService.clearCart(userId);

    res.status(201).json(order);
  } catch (err) {
    next(err);
  }
}

export async function getMyOrders(req, res, next) {
  try {
    const orders = await orderService.getUserOrders(req.user.id);
    res.json(orders);
  } catch (err) {
    next(err);
  }
}

export async function getOrder(req, res, next) {
  try {
    const order = await orderService.getOrderById(req.params.id);
    if (!order) return res.status(404).json({ error: 'Not found' });
    res.json(order);
  } catch (err) {
    next(err);
  }
}
