// /core/services/passwordResetService.js
import crypto from 'crypto';
import db from '../db/index.js';
import bcrypt from 'bcrypt';
import { sendPasswordReset } from './emailService.js';

export async function createResetToken(email) {
  const user = await db.User.findOne({ where: { email } });
  if (!user) return;

  const token = crypto.randomBytes(20).toString('hex');
  const expiresAt = new Date(Date.now() + 1000 * 60 * 60);

  await db.PasswordResetToken.create({
    userId: user.id,
    token,
    expiresAt
  });

  await sendPasswordReset(user.email, token);
}

export async function resetPassword(token, newPassword) {
  const reset = await db.PasswordResetToken.findOne({
    where: { token, used: false }
  });

  if (!reset) throw new Error('Invalid token');
  if (reset.expiresAt < new Date()) throw new Error('Token expired');

  const user = await db.User.findByPk(reset.userId);
  if (!user) throw new Error('User not found');

  user.passwordHash = await bcrypt.hash(newPassword, 10);
  await user.save();

  reset.used = true;
  await reset.save();

  return user;
}
