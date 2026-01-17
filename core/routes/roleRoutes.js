// /core/routes/roleRoutes.js
import { Router } from 'express';
import {
  createRole,
  getRoles,
  assignRole
} from '../controllers/roleController.js';

import { authMiddleware } from '../middleware/auth.js';
import { requireRole } from '../middleware/role.js';

const router = Router();

router.get('/', authMiddleware, requireRole('admin'), getRoles);
router.post('/', authMiddleware, requireRole('admin'), createRole);
router.put('/:userId', authMiddleware, requireRole('admin'), assignRole);

export default router;
