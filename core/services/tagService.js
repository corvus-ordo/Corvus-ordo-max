// /core/services/tagService.js
import db from '../db/index.js';

export async function createTag(data) {
  return db.Tag.create(data);
}

export async function getTags() {
  return db.Tag.findAll();
}

export async function deleteTag(id) {
  const tag = await db.Tag.findByPk(id);
  if (!tag) throw new Error('Not found');
  return tag.destroy();
}
