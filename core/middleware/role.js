// /core/middleware/role.js
export function requireRole(roleName) {
  return (req, res, next) => {
    if (!req.user || req.user.role !== roleName) {
      return res.status(403).json({ error: 'Forbidden' });
    }
    next();
  };
}
