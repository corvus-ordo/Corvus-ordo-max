// /core/controllers/emailTestController.js
import { sendMail } from '../utils/mailer.js';

export async function testEmail(req, res, next) {
  try {
    await sendMail({
      to: req.body.to,
      subject: 'Test Email',
      html: '<p>Test message</p>'
    });
    res.json({ message: 'Sent' });
  } catch (err) {
    next(err);
  }
}
