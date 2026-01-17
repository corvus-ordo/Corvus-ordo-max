// /core/services/deliveryService.js
import db from '../db/index.js';

export async function createDelivery(data) {
  return db.Delivery.create(data);
}

export async function updateDelivery(id, data) {
  const delivery = await db.Delivery.findByPk(id);
  if (!delivery) throw new Error('Delivery method not found');
  return delivery.update(data);
}

export async function deleteDelivery(id) {
  const delivery = await db.Delivery.findByPk(id);
  if (!delivery) throw new Error('Delivery method not found');
  return delivery.destroy();
}

export async function getAllDeliveries() {
  return db.Delivery.findAll({
    where: { isActive: true },
    order: [['price', 'ASC']]
  });
}

export async function getDeliveryById(id) {
  return db.Delivery.findByPk(id);
}
