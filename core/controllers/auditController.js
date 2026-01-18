// /core/controllers/auditController.js
import * as auditService from '../services/auditService.js';

export async function getAuditLogs(req, res, next) {
  try {
    const logs = await auditService.getLogs();
    res.json(logs);
  } catch (err) {
    next(err);
  }
}

import db from '../db/index.js';

export async function getAuditLogs(req, res, next) {
  try {
    const logs = await db.AuditLog.findAll({
      order: [['createdAt', 'DESC']],
      limit: 200
    });
    res.json(logs);
  } catch (err) {
    next(err);
  }
}
