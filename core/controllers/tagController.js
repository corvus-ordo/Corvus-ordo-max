// /core/controllers/tagController.js
import * as tagService from '../services/tagService.js';

export async function createTag(req, res, next) {
  try {
    const tag = await tagService.createTag(req.body);
    res.status(201).json(tag);
  } catch (err) {
    next(err);
  }
}

export async function getTags(req, res, next) {
  try {
    const tags = await tagService.getTags();
    res.json(tags);
  } catch (err) {
    next(err);
  }
}

export async function deleteTag(req, res, next) {
  try {
    await tagService.deleteTag(req.params.id);
    res.json({ message: 'Tag deleted' });
  } catch (err) {
    next(err);
  }
}
