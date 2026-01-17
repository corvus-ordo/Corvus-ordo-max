// /core/routes/adminRoutes.js
import { Router } from 'express';
import {
  getUsers,
  updateUser,
  getAllOrders,
  updateOrder,
  getDashboardStats
} from '../controllers/adminController.js';

import { authMiddleware } from '../middleware/auth.js';

const router = Router();

router.get('/users', authMiddleware, getUsers);
router.put('/users/:id', authMiddleware, updateUser);

router.get('/orders', authMiddleware, getAllOrders);
router.put('/orders/:id', authMiddleware, updateOrder);

router.get('/stats', authMiddleware, getDashboardStats);

export default router;
