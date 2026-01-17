// /core/routes/categoryRoutes.js
import { Router } from 'express';
import {
  createCategory,
  getCategories,
  deleteCategory
} from '../controllers/categoryController.js';

import { authMiddleware } from '../middleware/auth.js';
import { requireRole } from '../middleware/role.js';

const router = Router();

router.get('/', getCategories);
router.post('/', authMiddleware, requireRole('admin'), createCategory);
router.delete('/:id', authMiddleware, requireRole('admin'), deleteCategory);

export default router;
