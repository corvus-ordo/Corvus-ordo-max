// /core/services/newsletterService.js
import crypto from 'crypto';
import db from '../db/index.js';
import { sendMail } from '../utils/mailer.js';

export async function subscribe(email) {
  const token = crypto.randomBytes(20).toString('hex');

  const existing = await db.NewsletterSubscriber.findOne({ where: { email } });
  if (existing) return existing;

  const sub = await db.NewsletterSubscriber.create({
    email,
    confirmToken: token
  });

  await sendMail({
    to: email,
    subject: 'Confirm your subscription',
    html: `<p>Click to confirm: ${process.env.FRONTEND_URL}/newsletter/confirm/${token}</p>`
  });

  return sub;
}

export async function confirmSubscription(token) {
  const sub = await db.NewsletterSubscriber.findOne({ where: { confirmToken: token } });
  if (!sub) throw new Error('Invalid token');

  sub.isConfirmed = true;
  return sub.save();
}

export async function getSubscribers() {
  return db.NewsletterSubscriber.findAll({ where: { isConfirmed: true } });
}

export async function sendNewsletterToAll(subject, html) {
  const subs = await db.NewsletterSubscriber.findAll({
    where: { isConfirmed: true }
  });

  for (const sub of subs) {
    await sendMail({
      to: sub.email,
      subject,
      html
    });
  }

  return subs.length;
}
