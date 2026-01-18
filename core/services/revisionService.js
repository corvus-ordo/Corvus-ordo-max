import db from '../db/index.js';

export async function saveRevision(publicationId, userId, data, status = 'revision') {
  return db.PublicationRevision.create({
    publicationId,
    userId,
    ...data,
    status
  });
}

export async function getRevisions(publicationId) {
  return db.PublicationRevision.findAll({
    where: { publicationId },
    order: [['createdAt', 'DESC']]
  });
}

export async function restoreRevision(revisionId) {
  const revision = await db.PublicationRevision.findByPk(revisionId);
  if (!revision) throw new Error('Not found');

  const publication = await db.Publication.findByPk(revision.publicationId);
  if (!publication) throw new Error('Publication not found');

  await publication.update({
    title: revision.title,
    description: revision.description,
    price: revision.price,
    coverImage: revision.coverImage
  });

  return publication;
}
