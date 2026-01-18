// /core/routes/blogRoutes.js
import { Router } from 'express';
import { create, update, get, list } from '../controllers/blogController.js';
import { authMiddleware } from '../middleware/auth.js';
import { requireRole } from '../middleware/role.js';

const router = Router();

router.post('/', authMiddleware, requireRole('admin'), create);
router.patch('/:id', authMiddleware, requireRole('admin'), update);

router.get('/', list);
router.get('/:slug', get);

export default router;
