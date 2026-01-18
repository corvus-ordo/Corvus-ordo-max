import * as revisionService from '../services/revisionService.js';

export async function createRevision(req, res, next) {
  try {
    const revision = await revisionService.saveRevision(
      req.params.id,
      req.user.id,
      req.body
    );
    res.status(201).json(revision);
  } catch (err) {
    next(err);
  }
}

export async function listRevisions(req, res, next) {
  try {
    const revisions = await revisionService.getRevisions(req.params.id);
    res.json(revisions);
  } catch (err) {
    next(err);
  }
}

export async function restore(req, res, next) {
  try {
    const publication = await revisionService.restoreRevision(req.params.revisionId);
    res.json(publication);
  } catch (err) {
    next(err);
  }
}
