// /core/services/publicService.js
import db from '../db/index.js';
import { Op } from 'sequelize';

export async function getHomePublications() {
  return db.Publication.findAll({
    where: { isActive: true },
    order: [['createdAt', 'DESC']],
    limit: 12,
    include: [db.Category, db.Tag]
  });
}

export async function searchPublications(query, filters) {
  const where = { isActive: true };

  if (query) {
    where[Op.or] = [
      { title: { [Op.iLike]: `%${query}%` } },
      { description: { [Op.iLike]: `%${query}%` } }
    ];
  }

  if (filters?.categoryId) {
    where.categoryId = filters.categoryId;
  }

  const include = [];

  if (filters?.tagId) {
    include.push({
      model: db.Tag,
      where: { id: filters.tagId }
    });
  } else {
    include.push(db.Tag);
  }

  return db.Publication.findAll({
    where,
    include,
    order: [['createdAt', 'DESC']]
  });
}
