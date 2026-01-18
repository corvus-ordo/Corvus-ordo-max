// /core/routes/seoRoutes.js
import { Router } from 'express';
import { sitemap, robots, meta } from '../controllers/seoController.js';

const router = Router();

router.get('/sitemap.xml', sitemap);
router.get('/robots.txt', robots);
router.get('/meta/:slug', meta);

export default router;
