// /core/routes/newsletterRoutes.js
import { Router } from 'express';
import {
  subscribe,
  confirm,
  listSubscribers,
  sendNewsletter
} from '../controllers/newsletterController.js';

import { authMiddleware } from '../middleware/auth.js';
import { requireRole } from '../middleware/role.js';

const router = Router();

router.post('/subscribe', subscribe);
router.get('/confirm/:token', confirm);
router.get('/subscribers', authMiddleware, requireRole('admin'), listSubscribers);
router.post('/send', authMiddleware, requireRole('admin'), sendNewsletter);

export default router;
