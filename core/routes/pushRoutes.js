// /core/routes/pushRoutes.js
import { Router } from 'express';
import { subscribe, sendPush } from '../controllers/pushController.js';
import { authMiddleware } from '../middleware/auth.js';
import { requireRole } from '../middleware/role.js';

const router = Router();

router.post('/subscribe', subscribe);
router.post('/send', authMiddleware, requireRole('admin'), sendPush);

export default router;
