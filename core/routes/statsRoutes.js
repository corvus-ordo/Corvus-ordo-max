// /core/routes/statsRoutes.js
import { Router } from 'express';
import {
  getSummary,
  getMonthlyStats,
  getTopPublications
} from '../controllers/statsController.js';

import { authMiddleware } from '../middleware/auth.js';
import { requireRole } from '../middleware/role.js';

const router = Router();

router.get('/summary', authMiddleware, requireRole('admin'), getSummary);
router.get('/monthly', authMiddleware, requireRole('admin'), getMonthlyStats);
router.get('/top-publications', authMiddleware, requireRole('admin'), getTopPublications);

export default router;
