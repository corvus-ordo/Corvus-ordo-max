import Stripe from 'stripe';
import db from '../../db/index.js';

const stripe = new Stripe(process.env.STRIPE_SECRET);

export async function createPaymentSession(order) {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    mode: 'payment',
    line_items: order.items.map(item => ({
      price_data: {
        currency: 'usd',
        product_data: { name: item.title },
        unit_amount: item.price * 100
      },
      quantity: item.quantity
    })),
    success_url: `${process.env.FRONTEND_URL}/success?order=${order.id}`,
    cancel_url: `${process.env.FRONTEND_URL}/cancel?order=${order.id}`
  });

  return session.url;
}

export async function handleWebhook(event) {
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;

    await db.Order.update(
      { status: 'paid' },
      { where: { id: session.client_reference_id } }
    );
  }
}
