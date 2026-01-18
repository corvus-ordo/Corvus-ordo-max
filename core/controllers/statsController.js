// /core/controllers/statsController.js
import * as statsService from '../services/statsService.js';

export async function getSummary(req, res, next) {
  try {
    const summary = await statsService.getSalesSummary();
    res.json(summary);
  } catch (err) {
    next(err);
  }
}

export async function getMonthlyStats(req, res, next) {
  try {
    const stats = await statsService.getSalesByMonth();
    res.json(stats);
  } catch (err) {
    next(err);
  }
}

export async function getTopPublications(req, res, next) {
  try {
    const top = await statsService.getTopPublications();
    res.json(top);
  } catch (err) {
    next(err);
  }
}
