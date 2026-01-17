// /core/routes/orderRoutes.js
import { Router } from 'express';
import {
  createOrder,
  getMyOrders,
  getOrder,
  updateOrderStatus
} from '../controllers/orderController.js';

import { authMiddleware } from '../middleware/auth.js';

const router = Router();

// user
router.post('/', authMiddleware, createOrder);
router.get('/me', authMiddleware, getMyOrders);

// admin
router.get('/:id', authMiddleware, getOrder);
router.put('/:id/status', authMiddleware, updateOrderStatus);

export default router;
