// /core/controllers/roleController.js
import * as roleService from '../services/roleService.js';

export async function createRole(req, res, next) {
  try {
    const role = await roleService.createRole(req.body.name);
    res.status(201).json(role);
  } catch (err) {
    next(err);
  }
}

export async function getRoles(req, res, next) {
  try {
    const roles = await roleService.getRoles();
    res.json(roles);
  } catch (err) {
    next(err);
  }
}

export async function assignRole(req, res, next) {
  try {
    const updated = await roleService.assignRole(
      req.params.userId,
      req.body.roleId
    );
    res.json(updated);
  } catch (err) {
    next(err);
  }
}
