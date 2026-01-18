// /core/controllers/pushController.js
import * as pushService from '../services/pushService.js';

export async function subscribe(req, res, next) {
  try {
    const sub = await pushService.saveSubscription(req.body, req.user?.id || null);
    res.status(201).json(sub);
  } catch (err) {
    next(err);
  }
}

export async function sendPush(req, res, next) {
  try {
    const { title, body } = req.body;
    const count = await pushService.sendPushToAll(title, body);
    res.json({ message: 'Push sent', recipients: count });
  } catch (err) {
    next(err);
  }
}
