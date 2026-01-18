// /core/routes/notificationRoutes.js
import { Router } from 'express';
import { getAll, markRead } from '../controllers/notificationController.js';
import { authMiddleware } from '../middleware/auth.js';
import { requireRole } from '../middleware/role.js';

const router = Router();

router.get('/', authMiddleware, requireRole('admin'), getAll);
router.patch('/:id/read', authMiddleware, requireRole('admin'), markRead);

export default router;
