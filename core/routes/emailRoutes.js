// /core/routes/emailRoutes.js
import { Router } from 'express';
import { testEmail } from '../controllers/emailTestController.js';
import { authMiddleware } from '../middleware/auth.js';

const router = Router();

router.post('/test', authMiddleware, testEmail);

export default router;
