// /core/routes/cartRoutes.js
import { Router } from 'express';
import {
  getMyCart,
  addCartItem,
  updateCartItem,
  removeCartItem,
  clearMyCart
} from '../controllers/cartController.js';

import { authMiddleware } from '../middleware/auth.js';

const router = Router();

router.get('/', authMiddleware, getMyCart);
router.post('/', authMiddleware, addCartItem);
router.put('/:id', authMiddleware, updateCartItem);
router.delete('/:id', authMiddleware, removeCartItem);
router.delete('/', authMiddleware, clearMyCart);

export default router;
