// /core/routes/userRoutes.js
import { Router } from 'express';
import {
  getMe,
  updateProfile,
  getMyOrders,
  getMyFiles
} from '../controllers/userController.js';

import { authMiddleware } from '../middleware/auth.js';

const router = Router();

router.get('/me', authMiddleware, getMe);
router.put('/me', authMiddleware, updateProfile);
router.get('/me/orders', authMiddleware, getMyOrders);
router.get('/me/files', authMiddleware, getMyFiles);

export default router;
