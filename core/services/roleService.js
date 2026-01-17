// /core/services/roleService.js
import db from '../db/index.js';

export async function createRole(name) {
  return db.Role.create({ name });
}

export async function getRoles() {
  return db.Role.findAll();
}

export async function assignRole(userId, roleId) {
  const user = await db.User.findByPk(userId);
  if (!user) throw new Error('User not found');
  user.roleId = roleId;
  return user.save();
}
