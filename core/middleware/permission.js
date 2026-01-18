import { permissions } from '../config/permissions.js';

export function requirePermission(permission) {
  return (req, res, next) => {
    const role = req.user.role;

    if (!role) return res.status(403).json({ error: 'No role assigned' });

    if (permissions[role]?.includes('*')) return next();

    if (!permissions[role]?.includes(permission)) {
      return res.status(403).json({ error: 'Insufficient permissions' });
    }

    next();
  };
}
