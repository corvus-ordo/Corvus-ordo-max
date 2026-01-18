// /core/controllers/blogController.js
import * as blogService from '../services/blogService.js';

export async function create(req, res, next) {
  try {
    const post = await blogService.createPost(req.body);
    res.status(201).json(post);
  } catch (err) {
    next(err);
  }
}

export async function update(req, res, next) {
  try {
    const post = await blogService.updatePost(req.params.id, req.body);
    res.json(post);
  } catch (err) {
    next(err);
  }
}

export async function get(req, res, next) {
  try {
    const post = await blogService.getPost(req.params.slug);
    if (!post) return res.status(404).json({ error: 'Not found' });
    res.json(post);
  } catch (err) {
    next(err);
  }
}

export async function list(req, res, next) {
  try {
    const posts = await blogService.listPosts();
    res.json(posts);
  } catch (err) {
    next(err);
  }
}
