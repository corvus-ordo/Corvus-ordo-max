// /core/routes/auditRoutes.js
import { Router } from 'express';
import { getAuditLogs } from '../controllers/auditController.js';
import { authMiddleware } from '../middleware/auth.js';
import { requireRole } from '../middleware/role.js';

const router = Router();

router.get('/', authMiddleware, requireRole('admin'), getAuditLogs);

export default router;
