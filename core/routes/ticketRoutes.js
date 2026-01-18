// /core/routes/ticketRoutes.js
import { Router } from 'express';
import {
  create,
  reply,
  changeStatus,
  myTickets,
  allTickets
} from '../controllers/ticketController.js';

import { authMiddleware } from '../middleware/auth.js';
import { requireRole } from '../middleware/role.js';

const router = Router();

router.post('/', authMiddleware, create);
router.get('/mine', authMiddleware, myTickets);

router.post('/:id/reply', authMiddleware, reply);
router.patch('/:id/status', authMiddleware, requireRole('admin'), changeStatus);

router.get('/', authMiddleware, requireRole('admin'), allTickets);

export default router;
