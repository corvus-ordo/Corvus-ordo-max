import { Router } from 'express';
import { getLogs } from '../controllers/activityController.js';
import { authMiddleware } from '../middleware/auth.js';
import { requireRole } from '../middleware/role.js';

const router = Router();

router.get('/', authMiddleware, requireRole('superadmin'), getLogs);

export default router;
