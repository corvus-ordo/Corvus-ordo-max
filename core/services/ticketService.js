// /core/services/ticketService.js
import db from '../db/index.js';

export async function createTicket(userId, subject, message) {
  return db.Ticket.create({ userId, subject, message });
}

export async function replyToTicket(ticketId, userId, message) {
  return db.TicketReply.create({ ticketId, userId, message });
}

export async function changeStatus(ticketId, status) {
  const ticket = await db.Ticket.findByPk(ticketId);
  if (!ticket) throw new Error('Not found');
  ticket.status = status;
  return ticket.save();
}

export async function getUserTickets(userId) {
  return db.Ticket.findAll({
    where: { userId },
    include: [db.TicketReply],
    order: [['createdAt', 'DESC']]
  });
}

export async function getAllTickets() {
  return db.Ticket.findAll({
    include: [db.User, db.TicketReply],
    order: [['createdAt', 'DESC']]
  });
}
