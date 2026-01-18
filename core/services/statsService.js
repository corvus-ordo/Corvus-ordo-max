// /core/services/statsService.js
import db from '../db/index.js';
import { Op } from 'sequelize';

export async function getSalesSummary() {
  const totalRevenue = await db.Order.sum('total');
  const totalOrders = await db.Order.count();
  const totalUsers = await db.User.count();

  return { totalRevenue, totalOrders, totalUsers };
}

export async function getSalesByMonth() {
  return db.Order.findAll({
    attributes: [
      [db.sequelize.fn('DATE_TRUNC', 'month', db.sequelize.col('createdAt')), 'month'],
      [db.sequelize.fn('SUM', db.sequelize.col('total')), 'revenue'],
      [db.sequelize.fn('COUNT', db.sequelize.col('id')), 'orders']
    ],
    group: ['month'],
    order: [[db.sequelize.literal('month'), 'ASC']]
  });
}

export async function getTopPublications(limit = 10) {
  return db.OrderItem.findAll({
    attributes: [
      'publicationId',
      [db.sequelize.fn('SUM', db.sequelize.col('quantity')), 'sold']
    ],
    include: [{ model: db.Publication }],
    group: ['publicationId', 'Publication.id'],
    order: [[db.sequelize.literal('sold'), 'DESC']],
    limit
  });
}
