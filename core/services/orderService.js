// /core/services/orderService.js
import db from '../db/index.js';

export async function createOrder({ userId, items }) {
  const publications = await db.Publication.findAll({
    where: { id: items.map(i => i.publicationId), isActive: true }
  });

  const totalAmount = items.reduce((sum, item) => {
    const pub = publications.find(p => p.id === item.publicationId);
    return sum + Number(pub.price) * item.quantity;
  }, 0);

  const order = await db.Order.create(
    {
      userId,
      totalAmount,
      status: 'pending',
      OrderItems: items.map(item => {
        const pub = publications.find(p => p.id === item.publicationId);
        return {
          publicationId: item.publicationId,
          quantity: item.quantity,
          unitPrice: pub.price
        };
      })
    },
    { include: [db.OrderItem] }
  );

  return order;
}

export async function getUserOrders(userId) {
  return db.Order.findAll({
    where: { userId },
    include: [db.OrderItem, db.Payment]
  });
}

export async function getOrderById(id) {
  return db.Order.findByPk(id, {
    include: [db.OrderItem, db.Payment, db.User]
  });
}

export async function updateOrderStatus(id, status) {
  const order = await db.Order.findByPk(id);
  if (!order) throw new Error('Order not found');
  return order.update({ status });
}
