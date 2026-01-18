// /core/controllers/newsletterController.js
import * as newsletterService from '../services/newsletterService.js';

export async function subscribe(req, res, next) {
  try {
    const sub = await newsletterService.subscribe(req.body.email);
    res.status(201).json(sub);
  } catch (err) {
    next(err);
  }
}

export async function confirm(req, res, next) {
  try {
    await newsletterService.confirmSubscription(req.params.token);
    res.json({ message: 'Subscription confirmed' });
  } catch (err) {
    next(err);
  }
}

export async function listSubscribers(req, res, next) {
  try {
    const subs = await newsletterService.getSubscribers();
    res.json(subs);
  } catch (err) {
    next(err);
  }
}

export async function sendNewsletter(req, res, next) {
  try {
    const { subject, html } = req.body;
    const count = await newsletterService.sendNewsletterToAll(subject, html);
    res.json({ message: 'Newsletter sent', recipients: count });
  } catch (err) {
    next(err);
  }
}
