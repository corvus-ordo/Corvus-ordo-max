// /core/controllers/commentController.js
import * as commentService from '../services/commentService.js';

export async function addComment(req, res, next) {
  try {
    const comment = await commentService.addComment({
      userId: req.user.id,
      publicationId: req.params.pubId,
      content: req.body.content
    });
    res.status(201).json(comment);
  } catch (err) {
    next(err);
  }
}

export async function removeComment(req, res, next) {
  try {
    await commentService.deleteComment(req.params.id, req.user.id);
    res.json({ message: 'Comment deleted' });
  } catch (err) {
    next(err);
  }
}

export async function getPublicationComments(req, res, next) {
  try {
    const comments = await commentService.getComments(req.params.pubId);
    res.json(comments);
  } catch (err) {
    next(err);
  }
}

