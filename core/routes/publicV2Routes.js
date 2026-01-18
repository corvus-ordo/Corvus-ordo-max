import { Router } from 'express';
import { listPublications } from '../controllers/publicV2Controller.js';
import { publicApiLimiter } from '../middleware/rateLimit.js';

const router = Router();

router.get('/publications', publicApiLimiter, listPublications);

export default router;
