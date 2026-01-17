// /core/routes/paymentRoutes.js
import { Router } from 'express';
import {
  initPayment,
  updatePayment,
  getPayment
} from '../controllers/paymentController.js';

import { authMiddleware } from '../middleware/auth.js';

const router = Router();

// user
router.post('/init', authMiddleware, initPayment);
router.get('/order/:orderId', authMiddleware, getPayment);

// provider callback (np. Stripe webhook)
router.put('/:id', updatePayment);

export default router;
