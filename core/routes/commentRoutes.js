// /core/routes/commentRoutes.js
import { Router } from 'express';
import {
  addComment,
  removeComment,
  getPublicationComments
} from '../controllers/commentController.js';

import { authMiddleware } from '../middleware/auth.js';

const router = Router();

router.get('/:pubId', getPublicationComments);
router.post('/:pubId', authMiddleware, addComment);
router.delete('/:id', authMiddleware, removeComment);

export default router;
