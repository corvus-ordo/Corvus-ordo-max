// /core/controllers/paymentController.js
import * as paymentService from '../services/paymentService.js';
import * as orderService from '../services/orderService.js';

export async function initPayment(req, res, next) {
  try {
    const { orderId, provider } = req.body;

    const order = await orderService.getOrderById(orderId);
    if (!order) return res.status(404).json({ error: 'Order not found' });

    const payment = await paymentService.createPayment({
      orderId,
      provider,
      amount: order.totalAmount
    });

    res.status(201).json(payment);
  } catch (err) {
    next(err);
  }
}

export async function updatePayment(req, res, next) {
  try {
    const { status, rawResponse } = req.body;

    const payment = await paymentService.updatePaymentStatus(
      req.params.id,
      status,
      rawResponse
    );

    res.json(payment);
  } catch (err) {
    next(err);
  }
}

export async function getPayment(req, res, next) {
  try {
    const payment = await paymentService.getPaymentByOrder(req.params.orderId);
    if (!payment) return res.status(404).json({ error: 'Not found' });
    res.json(payment);
  } catch (err) {
    next(err);
  }
}
