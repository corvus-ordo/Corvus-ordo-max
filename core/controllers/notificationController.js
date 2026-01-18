// /core/controllers/notificationController.js
import * as notificationService from '../services/notificationService.js';

export async function getAll(req, res, next) {
  try {
    const notifs = await notificationService.getNotifications();
    res.json(notifs);
  } catch (err) {
    next(err);
  }
}

export async function markRead(req, res, next) {
  try {
    await notificationService.markAsRead(req.params.id);
    res.json({ message: 'Marked as read' });
  } catch (err) {
    next(err);
  }
}
