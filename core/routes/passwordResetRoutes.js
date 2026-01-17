// /core/routes/passwordResetRoutes.js
import { Router } from 'express';
import {
  requestPasswordReset,
  performPasswordReset
} from '../controllers/passwordResetController.js';

const router = Router();

router.post('/request', requestPasswordReset);
router.post('/reset', performPasswordReset);

export default router;
