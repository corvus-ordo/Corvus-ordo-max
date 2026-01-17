// /core/routes/deliveryRoutes.js
import { Router } from 'express';
import {
  createDelivery,
  updateDelivery,
  deleteDelivery,
  getDeliveries
} from '../controllers/deliveryController.js';

import { authMiddleware } from '../middleware/auth.js';

const router = Router();

// public
router.get('/', getDeliveries);

// admin
router.post('/', authMiddleware, createDelivery);
router.put('/:id', authMiddleware, updateDelivery);
router.delete('/:id', authMiddleware, deleteDelivery);

export default router;
