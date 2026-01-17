// /core/routes/publicationRoutes.js
import { Router } from 'express';
import {
  createPublication,
  updatePublication,
  deletePublication,
  getPublication,
  getAllPublications
} from '../controllers/publicationController.js';

import { authMiddleware } from '../middleware/auth.js';

const router = Router();

// public
router.get('/', getAllPublications);
router.get('/:slug', getPublication);

// admin only
router.post('/', authMiddleware, createPublication);
router.put('/:id', authMiddleware, updatePublication);
router.delete('/:id', authMiddleware, deletePublication);

export default router;
