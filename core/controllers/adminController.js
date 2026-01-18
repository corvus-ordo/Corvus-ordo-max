// core/controllers/adminController.js
import db from '../db/index.js';
import slugify from 'slugify';

// 🔹 Użytkownicy
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

// 🔹 Zamówienia
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

// 🔹 Statystyki
export async function getDashboardStats(req, res, next) {
  try {
    const users = await db.User.count();
    const orders = await db.Order.count();
    const revenue = await db.Order.sum('totalAmount', {
      where: { status: 'completed' }
    });

    res.json({ users, orders, revenue });
  } catch (err) {
    next(err);
  }
}

// 🔹 Kupony
export async function listCoupons(req, res, next) {
  try {
    const coupons = await db.Coupon.findAll();
    res.json(coupons);
  } catch (err) {
    next(err);
  }
}

export async function createCoupon(req, res, next) {
  try {
    const coupon = await db.Coupon.create(req.body);
    res.status(201).json(coupon);
  } catch (err) {
    next(err);
  }
}

export async function updateCoupon(req, res, next) {
  try {
    const coupon = await db.Coupon.findByPk(req.params.id);
    if (!coupon) return res.status(404).json({ error: 'Not found' });

    await coupon.update(req.body);
    res.json(coupon);
  } catch (err) {
    next(err);
  }
}

export async function deleteCoupon(req, res, next) {
  try {
    const coupon = await db.Coupon.findByPk(req.params.id);
    if (!coupon) return res.status(404).json({ error: 'Not found' });

    await coupon.destroy();
    res.json({ message: 'Deleted' });
  } catch (err) {
    next(err);
  }
}

// 🔹 Tickety
export async function getAllTickets(req, res, next) {
  try {
    const tickets = await db.Ticket.findAll({
      include: [db.User, db.TicketReply]
    });
    res.json(tickets);
  } catch (err) {
    next(err);
  }
}

export async function replyToTicket(req, res, next) {
  try {
    const reply = await db.TicketReply.create({
      ticketId: req.params.id,
      userId: req.user.id,
      message: req.body.message
    });
    res.status(201).json(reply);
  } catch (err) {
    next(err);
  }
}

export async function changeTicketStatus(req, res, next) {
  try {
    const ticket = await db.Ticket.findByPk(req.params.id);
    if (!ticket) return res.status(404).json({ error: 'Not found' });

    ticket.status = req.body.status;
    await ticket.save();
    res.json(ticket);
  } catch (err) {
    next(err);
  }
}

// 🔹 Blog
export async function listPosts(req, res, next) {
  try {
    const posts = await db.BlogPost.findAll({
      include: [db.BlogTag],
      order: [['createdAt', 'DESC']]
    });
    res.json(posts);
  } catch (err) {
    next(err);
  }
}

export async function createPost(req, res, next) {
  try {
    const slug = slugify(req.body.title, { lower: true, strict: true });
    const post = await db.BlogPost.create({ ...req.body, slug });
    res.status(201).json(post);
  } catch (err) {
    next(err);
  }
}

export async function updatePost(req, res, next) {
  try {
    const post = await db.BlogPost.findByPk(req.params.id);
    if (!post) return res.status(404).json({ error: 'Not found' });

    if (req.body.title) {
      req.body.slug = slugify(req.body.title, { lower: true, strict: true });
    }

    await post.update(req.body);
    res.json(post);
  } catch (err) {
    next(err);
  }
}

export async function deletePost(req, res, next) {
  try {
    const post = await db.BlogPost.findByPk(req.params.id);
    if (!post) return res.status(404).json({ error: 'Not found' });

    await post.destroy();
    res.json({ message: 'Deleted' });
  } catch (err) {
    next(err);
  }
}

// 🔹 Newsletter
export async function listSubscribers(req, res, next) {
  try {
    const subs = await db.NewsletterSubscriber.findAll();
    res.json(subs);
  } catch (err) {
    next(err);
  }
}

export async function sendNewsletter(req, res, next) {
  try {
    // Tu można zintegrować z zewnętrzną usługą wysyłki
    res.json({ message: 'Newsletter sent (mock)' });
  } catch (err) {
    next(err);
  }
}

// 🔹 Powiadomienia
export async function getAllNotifications(req, res, next) {
  try {
    const notifs = await db.Notification.findAll({
      order: [['createdAt', 'DESC']]
    });
    res.json(notifs);
  } catch (err) {
    next(err);
  }
}

export async function markNotificationRead(req, res, next) {
  try {
    const notif = await db.Notification.findByPk(req.params.id);
    if (!notif) return res.status(404).json({ error: 'Not found' });

    notif.isRead = true;
    await notif.save();
    res.json({ message: 'Marked as read' });
  } catch (err) {
    next(err);
  }
}

export async function setRole(req, res, next) {
  try {
    const user = await db.User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ error: 'Not found' });

    user.role = req.body.role;
    await user.save();

    res.json({ message: 'Role updated', user });
  } catch (err) {
    next(err);
  }
}
