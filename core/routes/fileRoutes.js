// /core/routes/fileRoutes.js
import { Router } from 'express';
import { upload } from '../utils/upload.js';
import { uploadFile } from '../controllers/fileController.js';
import { authMiddleware } from '../middleware/auth.js';

const router = Router();

router.post('/upload', authMiddleware, upload.single('file'), uploadFile);

export default router;
