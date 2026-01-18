export const permissions = {
  user: [],
  moderator: ['comments:delete', 'tickets:view'],
  support: ['tickets:reply', 'tickets:view'],
  editor: ['blog:create', 'blog:update', 'blog:delete'],
  admin: [
    'users:manage',
    'orders:manage',
    'coupons:manage',
    'blog:manage',
    'tickets:manage',
    'stats:view',
    'notifications:view'
  ],
  superadmin: ['*']
};
