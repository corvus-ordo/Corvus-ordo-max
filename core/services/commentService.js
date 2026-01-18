// /core/services/commentService.js
import db from '../db/index.js';

export async function addComment(data) {
  return db.Comment.create(data);
}

export async function deleteComment(id, userId) {
  const comment = await db.Comment.findOne({ where: { id, userId } });
  if (!comment) throw new Error('Not found');
  return comment.destroy();
}

export async function getComments(publicationId) {
  return db.Comment.findAll({
    where: { publicationId },
    include: [{ model: db.User, attributes: ['id', 'email'] }],
    order: [['createdAt', 'ASC']]
  });
}
