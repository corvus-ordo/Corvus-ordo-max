// /core/controllers/userController.js
import db from '../db/index.js';
import bcrypt from 'bcrypt';

export async function getMe(req, res, next) {
  try {
    const user = await db.User.findByPk(req.user.id, {
      attributes: ['id', 'email', 'role', 'isActive', 'createdAt']
    });
    res.json(user);
  } catch (err) {
    next(err);
  }
}

export async function updateProfile(req, res, next) {
  try {
    const user = await db.User.findByPk(req.user.id);
    if (!user) return res.status(404).json({ error: 'Not found' });

    const { email, password } = req.body;

    if (email) user.email = email;
    if (password) user.passwordHash = await bcrypt.hash(password, 10);

    await user.save();
    res.json(user);
  } catch (err) {
    next(err);
  }
}

export async function getMyOrders(req, res, next) {
  try {
    const orders = await db.Order.findAll({
      where: { userId: req.user.id },
      include: [db.OrderItem, db.Payment, db.Delivery]
    });
    res.json(orders);
  } catch (err) {
    next(err);
  }
}

export async function getMyFiles(req, res, next) {
  try {
    const orders = await db.Order.findAll({
      where: { userId: req.user.id, status: 'completed' },
      include: [{ model: db.OrderItem, include: [db.Publication] }]
    });

    const files = orders.flatMap(order =>
      order.OrderItems.map(item => ({
        title: item.Publication.title,
        fileUrl: item.Publication.fileUrl
      }))
    );

    res.json(files);
  } catch (err) {
    next(err);
  }
}
