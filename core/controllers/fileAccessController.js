// /core/controllers/fileAccessController.js
import db from '../db/index.js';
import path from 'path';

export async function downloadPublicationFile(req, res, next) {
  try {
    const orderItem = await db.OrderItem.findOne({
      where: {
        orderId: req.params.orderId,
        publicationId: req.params.pubId
      },
      include: [
        {
          model: db.Order,
          where: {
            userId: req.user.id,
            status: 'completed'
          }
        },
        {
          model: db.Publication
        }
      ]
    });

    if (!orderItem || !orderItem.Publication?.fileUrl) {
      return res.status(403).json({ error: 'Access denied or file missing' });
    }

    const filePath = path.join('uploads', orderItem.Publication.fileUrl);
    res.download(filePath);
  } catch (err) {
    next(err);
  }
}
