// /core/utils/mailer.js
import nodemailer from 'nodemailer';

export const mailer = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: Number(process.env.MAIL_PORT),
  secure: false,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS
  }
});

export function sendMail({ to, subject, html }) {
  return mailer.sendMail({
    from: process.env.MAIL_FROM,
    to,
    subject,
    html
  });
}
