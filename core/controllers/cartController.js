// /core/controllers/cartController.js
import * as cartService from '../services/cartService.js';

export async function getMyCart(req, res, next) {
  try {
    const items = await cartService.getCart(req.user.id);
    res.json(items);
  } catch (err) {
    next(err);
  }
}

export async function addCartItem(req, res, next) {
  try {
    const { publicationId, quantity } = req.body;
    const item = await cartService.addToCart(
      req.user.id,
      publicationId,
      quantity || 1
    );
    res.status(201).json(item);
  } catch (err) {
    next(err);
  }
}

export async function updateCartItem(req, res, next) {
  try {
    const { quantity } = req.body;
    const item = await cartService.updateCartItem(
      req.user.id,
      req.params.id,
      quantity
    );
    res.json(item);
  } catch (err) {
    next(err);
  }
}

export async function removeCartItem(req, res, next) {
  try {
    await cartService.removeFromCart(req.user.id, req.params.id);
    res.json({ message: 'Removed from cart' });
  } catch (err) {
    next(err);
  }
}

export async function clearMyCart(req, res, next) {
  try {
    await cartService.clearCart(req.user.id);
    res.json({ message: 'Cart cleared' });
  } catch (err) {
    next(err);
  }
}
