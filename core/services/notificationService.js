// /core/services/notificationService.js
import db from '../db/index.js';

export async function createNotification(type, message) {
  return db.Notification.create({ type, message });
}

export async function getNotifications() {
  return db.Notification.findAll({
    order: [['createdAt', 'DESC']]
  });
}

export async function markAsRead(id) {
  const notif = await db.Notification.findByPk(id);
  if (!notif) throw new Error('Not found');
  notif.isRead = true;
  return notif.save();
}
