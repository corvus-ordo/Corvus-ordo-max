// /core/services/categoryService.js
import db from '../db/index.js';

export async function createCategory(data) {
  return db.Category.create(data);
}

export async function getCategories() {
  return db.Category.findAll();
}

export async function deleteCategory(id) {
  const cat = await db.Category.findByPk(id);
  if (!cat) throw new Error('Not found');
  return cat.destroy();
}
