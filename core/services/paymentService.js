// /core/services/paymentService.js
import db from '../db/index.js';

export async function createPayment({ orderId, provider, amount }) {
  return db.Payment.create({
    orderId,
    provider,
    amount,
    status: 'pending'
  });
}

export async function updatePaymentStatus(id, status, rawResponse = null) {
  const payment = await db.Payment.findByPk(id);
  if (!payment) throw new Error('Payment not found');

  return payment.update({
    status,
    rawResponse
  });
}

export async function getPaymentByOrder(orderId) {
  return db.Payment.findOne({ where: { orderId } });
}
