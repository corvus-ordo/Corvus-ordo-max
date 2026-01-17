// /core/services/auditService.js
import db from '../db/index.js';

export async function logAction({ userId, action, entity, entityId, metadata }) {
  return db.AuditLog.create({
    userId,
    action,
    entity,
    entityId,
    metadata
  });
}

export async function getLogs(limit = 100) {
  return db.AuditLog.findAll({
    order: [['createdAt', 'DESC']],
    limit,
    include: [{ model: db.User, attributes: ['id', 'email'] }]
  });
}
