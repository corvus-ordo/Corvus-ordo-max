// /core/routes/recommendationRoutes.js
import { Router } from 'express';
import {
  similar,
  boughtTogether,
  wishlistBased
} from '../controllers/recommendationController.js';

import { authMiddleware } from '../middleware/auth.js';

const router = Router();

router.get('/similar/:id', similar);
router.get('/bought-together/:id', boughtTogether);
router.get('/wishlist', authMiddleware, wishlistBased);

export default router;
