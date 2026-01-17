// /core/controllers/authController.js
import * as userService from '../services/userService.js';
import jwt from 'jsonwebtoken';

export async function register(req, res, next) {
  try {
    const user = await userService.registerUser(req.body);
    res.status(201).json({ message: 'User created', user });
  } catch (err) {
    next(err);
  }
}

export async function login(req, res, next) {
  try {
    const user = await userService.loginUser(req.body);

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({ token, user });
  } catch (err) {
    next(err);
  }
}
