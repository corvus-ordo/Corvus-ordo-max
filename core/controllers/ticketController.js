// /core/controllers/ticketController.js
import * as ticketService from '../services/ticketService.js';
import * as notificationService from '../services/notificationService.js';

export async function create(req, res, next) {
  try {
    const ticket = await ticketService.createTicket(
      req.user.id,
      req.body.subject,
      req.body.message
    );

    await notificationService.createNotification(
      'ticket',
      `Nowy ticket od użytkownika ${req.user.email}`
    );

    res.status(201).json(ticket);
  } catch (err) {
    next(err);
  }
}

export async function reply(req, res, next) {
  try {
    const reply = await ticketService.replyToTicket(
      req.params.id,
      req.user.id,
      req.body.message
    );

    res.status(201).json(reply);
  } catch (err) {
    next(err);
  }
}

export async function changeStatus(req, res, next) {
  try {
    const ticket = await ticketService.changeStatus(
      req.params.id,
      req.body.status
    );

    res.json(ticket);
  } catch (err) {
    next(err);
  }
}

export async function myTickets(req, res, next) {
  try {
    const tickets = await ticketService.getUserTickets(req.user.id);
    res.json(tickets);
  } catch (err) {
    next(err);
  }
}

export async function allTickets(req, res, next) {
  try {
    const tickets = await ticketService.getAllTickets();
    res.json(tickets);
  } catch (err) {
    next(err);
  }
}
