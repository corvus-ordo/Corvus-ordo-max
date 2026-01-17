// /core/routes/tagRoutes.js
import { Router } from 'express';
import {
  createTag,
  getTags,
  deleteTag
} from '../controllers/tagController.js';

import { authMiddleware } from '../middleware/auth.js';
import { requireRole } from '../middleware/role.js';

const router = Router();

router.get('/', getTags);
router.post('/', authMiddleware, requireRole('admin'), createTag);
router.delete('/:id', authMiddleware, requireRole('admin'), deleteTag);

export default router;
