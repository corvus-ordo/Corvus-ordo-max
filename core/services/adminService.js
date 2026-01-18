// /core/services/adminService.js
import db from '../db/index.js';

export async function getDashboard() {
  const users = await db.User.count();
  const orders = await db.Order.count();
  const revenue = await db.Order.sum('total');
  const tickets = await db.Ticket.count();
  const posts = await db.BlogPost.count();

  const recentOrders = await db.Order.findAll({
    limit: 5,
    order: [['createdAt', 'DESC']],
    include: [db.User]
  });

  const recentTickets = await db.Ticket.findAll({
    limit: 5,
    order: [['createdAt', 'DESC']],
    include: [db.User]
  });

  const recentUsers = await db.User.findAll({
    limit: 5,
    order: [['createdAt', 'DESC']]
  });

  return {
    stats: { users, orders, revenue, tickets, posts },
    recent: { recentOrders, recentTickets, recentUsers }
  };
}

export async function listUsers() {
  return db.User.findAll({
    order: [['createdAt', 'DESC']]
  });
}

export async function changeRole(userId, role) {
  const user = await db.User.findByPk(userId);
  if (!user) throw new Error('Not found');
  user.role = role;
  return user.save();
}

export async function toggleBan(userId) {
  const user = await db.User.findByPk(userId);
  if (!user) throw new Error('Not found');
  user.isBanned = !user.isBanned;
  return user.save();
}
