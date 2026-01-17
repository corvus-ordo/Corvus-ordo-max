// /core/controllers/passwordResetController.js
import * as passwordResetService from '../services/passwordResetService.js';

export async function requestPasswordReset(req, res, next) {
  try {
    const { email } = req.body;
    await passwordResetService.createResetToken(email);
    res.json({ message: 'If the email exists, reset link was sent' });
  } catch (err) {
    next(err);
  }
}

export async function performPasswordReset(req, res, next) {
  try {
    const { token, password } = req.body;
    await passwordResetService.resetPassword(token, password);
    res.json({ message: 'Password updated' });
  } catch (err) {
    next(err);
  }
}
