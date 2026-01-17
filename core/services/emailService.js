// /core/services/emailService.js
import { sendMail } from '../utils/mailer.js';

export function sendOrderConfirmation(userEmail, order) {
  return sendMail({
    to: userEmail,
    subject: 'Order Confirmation',
    html: `<h1>Your order is confirmed</h1><p>Order ID: ${order.id}</p>`
  });
}

export function sendPaymentSuccess(userEmail, order) {
  return sendMail({
    to: userEmail,
    subject: 'Payment Successful',
    html: `<h1>Payment received</h1><p>Your order ${order.id} is now completed.</p>`
  });
}

export function sendPasswordReset(userEmail, token) {
  return sendMail({
    to: userEmail,
    subject: 'Password Reset',
    html: `<p>Reset token: ${token}</p>`
  });
}
