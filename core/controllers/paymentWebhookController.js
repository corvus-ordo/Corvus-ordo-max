import Stripe from 'stripe';
import { handleWebhook } from '../integrations/payments/stripe.js';

const stripe = new Stripe(process.env.STRIPE_SECRET);

export async function handleStripeWebhook(req, res) {
  const sig = req.headers['stripe-signature'];

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    return res.status(400).send(`Webhook error: ${err.message}`);
  }

  await handleWebhook(event);

  res.json({ received: true });
}
