import db from '../db/index.js';

export async function logActivity(userId, action, entity, entityId = null, before = null, after = null) {
  return db.ActivityLog.create({
    userId,
    action,
    entity,
    entityId,
    before,
    after
  });
}

export async function getLogs(limit = 100) {
  return db.ActivityLog.findAll({
    limit,
    order: [['createdAt', 'DESC']],
    include: [db.User]
  });
}
