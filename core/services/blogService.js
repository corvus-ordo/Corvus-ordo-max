// /core/services/blogService.js
import db from '../db/index.js';
import slugify from 'slugify';

export async function createPost(data) {
  const slug = slugify(data.title, { lower: true, strict: true });
  const post = await db.BlogPost.create({ ...data, slug });

  if (data.tags?.length) {
    const tags = await db.BlogTag.findAll({ where: { id: data.tags } });
    await post.setBlogTags(tags);
  }

  return post;
}

export async function updatePost(id, data) {
  const post = await db.BlogPost.findByPk(id);
  if (!post) throw new Error('Not found');

  if (data.title) {
    data.slug = slugify(data.title, { lower: true, strict: true });
  }

  await post.update(data);

  if (data.tags) {
    const tags = await db.BlogTag.findAll({ where: { id: data.tags } });
    await post.setBlogTags(tags);
  }

  return post;
}

export async function getPost(slug) {
  return db.BlogPost.findOne({
    where: { slug, status: 'published' },
    include: [db.BlogTag, db.BlogComment]
  });
}

export async function listPosts() {
  return db.BlogPost.findAll({
    where: { status: 'published' },
    include: [db.BlogTag],
    order: [['createdAt', 'DESC']]
  });
}
