// /core/controllers/adminController.js
import db from '../db/index.js';

export async function getUsers(req, res, next) {
  try {
    const users = await db.User.findAll({
      attributes: ['id', 'email', 'role', 'isActive', 'createdAt']
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
}

export async function updateUser(req, res, next) {
  try {
    const user = await db.User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ error: 'Not found' });

    const { email, role, isActive } = req.body;

    if (email) user.email = email;
    if (role) user.role = role;
    if (typeof isActive === 'boolean') user.isActive = isActive;

    await user.save();
    res.json(user);
  } catch (err) {
    next(err);
  }
}

export async function getAllOrders(req, res, next) {
  try {
    const orders = await db.Order.findAll({
      include: [db.OrderItem, db.Payment, db.Delivery, db.User]
    });
    res.json(orders);
  } catch (err) {
    next(err);
  }
}

export async function updateOrder(req, res, next) {
  try {
    const order = await db.Order.findByPk(req.params.id);
    if (!order) return res.status(404).json({ error: 'Not found' });

    const { status, deliveryId } = req.body;

    if (status) order.status = status;
    if (deliveryId) order.deliveryId = deliveryId;

    await order.save();
    res.json(order);
  } catch (err) {
    next(err);
  }
}

export async function getDashboardStats(req, res, next) {
  try {
    const users = await db.User.count();
    const orders = await db.Order.count();
    const revenue = await db.Order.sum('totalAmount', { where: { status: 'completed' } });

    res.json({
      users,
      orders,
      revenue
    });
  } catch (err) {
    next(err);
  }
}
