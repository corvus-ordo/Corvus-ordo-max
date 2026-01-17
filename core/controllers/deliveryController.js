// /core/controllers/deliveryController.js
import * as deliveryService from '../services/deliveryService.js';

export async function createDelivery(req, res, next) {
  try {
    const delivery = await deliveryService.createDelivery(req.body);
    res.status(201).json(delivery);
  } catch (err) {
    next(err);
  }
}

export async function updateDelivery(req, res, next) {
  try {
    const delivery = await deliveryService.updateDelivery(req.params.id, req.body);
    res.json(delivery);
  } catch (err) {
    next(err);
  }
}

export async function deleteDelivery(req, res, next) {
  try {
    await deliveryService.deleteDelivery(req.params.id);
    res.json({ message: 'Delivery method deleted' });
  } catch (err) {
    next(err);
  }
}

export async function getDeliveries(req, res, next) {
  try {
    const deliveries = await deliveryService.getAllDeliveries();
    res.json(deliveries);
  } catch (err) {
    next(err);
  }
}
