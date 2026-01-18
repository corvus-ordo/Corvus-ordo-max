import * as activityService from '../services/activityService.js';

export async function getLogs(req, res, next) {
  try {
    const logs = await activityService.getLogs(200);
    res.json(logs);
  } catch (err) {
    next(err);
  }
}
