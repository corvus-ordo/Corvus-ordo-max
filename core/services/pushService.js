// /core/services/pushService.js
import webpush from 'web-push';
import db from '../db/index.js';

webpush.setVapidDetails(
  'mailto:admin@example.com',
  process.env.VAPID_PUBLIC,
  process.env.VAPID_PRIVATE
);

export async function saveSubscription(data, userId = null) {
  return db.PushSubscription.create({
    userId,
    endpoint: data.endpoint,
    p256dh: data.keys.p256dh,
    auth: data.keys.auth
  });
}

export async function sendPushToAll(title, body) {
  const subs = await db.PushSubscription.findAll();

  for (const sub of subs) {
    await webpush.sendNotification(
      {
        endpoint: sub.endpoint,
        keys: {
          p256dh: sub.p256dh,
          auth: sub.auth
        }
      },
      JSON.stringify({ title, body })
    );
  }

  return subs.length;
}
