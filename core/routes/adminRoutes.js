// core/routes/adminRoutes.js
import { Router } from 'express';
import {
  getUsers,
  updateUser,
  getAllOrders,
  updateOrder,
  getDashboardStats
} from '../controllers/adminController.js';

import {
  createCoupon,
  updateCoupon,
  deleteCoupon,
  listCoupons
} from '../controllers/adminCouponController.js';

import {
  getAllTickets,
  replyToTicket,
  changeTicketStatus
} from '../controllers/adminTicketController.js';

import {
  createPost,
  updatePost,
  deletePost,
  listPosts
} from '../controllers/adminBlogController.js';

import {
  listSubscribers,
  sendNewsletter
} from '../controllers/adminNewsletterController.js';

import {
  getAllNotifications,
  markNotificationRead
} from '../controllers/adminNotificationController.js';

import { authMiddleware } from '../middleware/auth.js';
import { requireRole } from '../middleware/role.js';

const router = Router();

// 🔹 Użytkownicy
router.get('/users', authMiddleware, requireRole('admin'), getUsers);
router.put('/users/:id', authMiddleware, requireRole('admin'), updateUser);

// 🔹 Zamówienia
router.get('/orders', authMiddleware, requireRole('admin'), getAllOrders);
router.put('/orders/:id', authMiddleware, requireRole('admin'), updateOrder);

// 🔹 Statystyki
router.get('/stats', authMiddleware, requireRole('admin'), getDashboardStats);

// 🔹 Kupony
router.get('/coupons', authMiddleware, requireRole('admin'), listCoupons);
router.post('/coupons', authMiddleware, requireRole('admin'), createCoupon);
router.put('/coupons/:id', authMiddleware, requireRole('admin'), updateCoupon);
router.delete('/coupons/:id', authMiddleware, requireRole('admin'), deleteCoupon);

// 🔹 Tickety
router.get('/tickets', authMiddleware, requireRole('admin'), getAllTickets);
router.post('/tickets/:id/reply', authMiddleware, requireRole('admin'), replyToTicket);
router.patch('/tickets/:id/status', authMiddleware, requireRole('admin'), changeTicketStatus);

// 🔹 Blog
router.get('/blog', authMiddleware, requireRole('admin'), listPosts);
router.post('/blog', authMiddleware, requireRole('admin'), createPost);
router.put('/blog/:id', authMiddleware, requireRole('admin'), updatePost);
router.delete('/blog/:id', authMiddleware, requireRole('admin'), deletePost);

// 🔹 Newsletter
router.get('/newsletter/subscribers', authMiddleware, requireRole('admin'), listSubscribers);
router.post('/newsletter/send', authMiddleware, requireRole('admin'), sendNewsletter);

// 🔹 Powiadomienia
router.get('/notifications', authMiddleware, requireRole('admin'), getAllNotifications);
router.patch('/notifications/:id/read', authMiddleware, requireRole('admin'), markNotificationRead);

export default router;
