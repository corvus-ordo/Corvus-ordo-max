import { Router } from 'express';
import { createRevision, listRevisions, restore } from '../controllers/revisionController.js';
import { authMiddleware } from '../middleware/auth.js';
import { requirePermission } from '../middleware/permission.js';

const router = Router();

router.post('/:id/revision', authMiddleware, requirePermission('publication:edit'), createRevision);
router.get('/:id/revisions', authMiddleware, requirePermission('publication:view'), listRevisions);
router.post('/revision/:revisionId/restore', authMiddleware, requirePermission('publication:edit'), restore);

export default router;
