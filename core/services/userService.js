// /core/services/userService.js
import db from '../db/index.js';
import bcrypt from 'bcrypt';

export async function registerUser({ email, password }) {
  const existing = await db.User.findOne({ where: { email } });
  if (existing) throw new Error('User already exists');

  const passwordHash = await bcrypt.hash(password, 10);

  return db.User.create({
    email,
    passwordHash,
    role: 'user'
  });
}

export async function loginUser({ email, password }) {
  const user = await db.User.findOne({ where: { email } });
  if (!user) throw new Error('Invalid credentials');

  const match = await bcrypt.compare(password, user.passwordHash);
  if (!match) throw new Error('Invalid credentials');

  return user;
}
