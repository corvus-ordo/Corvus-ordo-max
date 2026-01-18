// /core/routes/couponRoutes.js
import { Router } from 'express';
import {
  createCoupon,
  validate
} from '../controllers/couponController.js';

import { authMiddleware } from '../middleware/auth.js';
import { requireRole } from '../middleware/role.js';

const router = Router();

router.post('/', authMiddleware, requireRole('admin'), createCoupon);
router.post('/validate', authMiddleware, validate);

export default router;
