import { logActivity } from '../services/activityService.js';

export function logAction(action, entity) {
  return async (req, res, next) => {
    const userId = req.user?.id || null;

    const before = req.beforeState || null;

    res.on('finish', async () => {
      if (res.statusCode < 400) {
        await logActivity(
          userId,
          action,
          entity,
          req.params.id || null,
          before,
          req.body || null
        );
      }
    });

    next();
  };
}
