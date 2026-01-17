// /core/routes/reviewRoutes.js
import { Router } from 'express';
import {
  addReview,
  editReview,
  removeReview,
  getPublicationReviews
} from '../controllers/reviewController.js';

import { authMiddleware } from '../middleware/auth.js';

const router = Router();

router.get('/:pubId', getPublicationReviews);
router.post('/:pubId', authMiddleware, addReview);
router.put('/:id', authMiddleware, editReview);
router.delete('/:id', authMiddleware, removeReview);

export default router;
