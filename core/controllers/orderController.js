// /core/controllers/orderController.js
import * as orderService from '../services/orderService.js';

export async function createOrder(req, res, next) {
  try {
    const userId = req.user.id;
    const { items } = req.body;

    const order = await orderService.createOrder({ userId, items });
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

export async function updateOrderStatus(req, res, next) {
  try {
    const order = await orderService.updateOrderStatus(req.params.id, req.body.status);
    res.json(order);
  } catch (err) {
    next(err);
  }
}
