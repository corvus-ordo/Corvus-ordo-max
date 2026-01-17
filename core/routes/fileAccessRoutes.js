// /core/routes/fileAccessRoutes.js
import { Router } from 'express';
import { downloadPublicationFile } from '../controllers/fileAccessController.js';
import { authMiddleware } from '../middleware/auth.js';

const router = Router();

router.get('/download/:orderId/:pubId', authMiddleware, downloadPublicationFile);

export default router;
