// /core/routes/publicRoutes.js
import { Router } from 'express';
import { getHome, search } from '../controllers/publicController.js';

const router = Router();

router.get('/home', getHome);
router.get('/search', search);

export default router;
