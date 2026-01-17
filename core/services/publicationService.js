// /core/services/publicationService.js
import db from '../db/index.js';
import { Op } from 'sequelize';

export async function createPublication(data) {
  return db.Publication.create(data);
}

export async function updatePublication(id, data) {
  const pub = await db.Publication.findByPk(id);
  if (!pub) throw new Error('Publication not found');
  return pub.update(data);
}

export async function deletePublication(id) {
  const pub = await db.Publication.findByPk(id);
  if (!pub) throw new Error('Publication not found');
  return pub.destroy();
}

export async function getPublicationBySlug(slug) {
  return db.Publication.findOne({ where: { slug, isActive: true } });
}

export async function getAllPublications() {
  return db.Publication.findAll({
    where: { isActive: true },
    order: [['createdAt', 'DESC']]
  });
}

export async function searchPublications(query) {
  return db.Publication.findAll({
    where: {
      title: { [Op.iLike]: `%${query}%` },
      isActive: true
    }
  });
}
