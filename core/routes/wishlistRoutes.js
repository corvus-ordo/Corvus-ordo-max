// /core/routes/wishlistRoutes.js
import { Router } from 'express';
import {
  getMyWishlist,
  addWishlistItem,
  removeWishlistItem
} from '../controllers/wishlistController.js';

import { authMiddleware } from '../middleware/auth.js';

const router = Router();

router.get('/', authMiddleware, getMyWishlist);
router.post('/', authMiddleware, addWishlistItem);
router.delete('/:id', authMiddleware, removeWishlistItem);

export default router;
