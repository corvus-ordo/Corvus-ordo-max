// /core/controllers/fileController.js
export async function uploadFile(req, res, next) {
  try {
    if (!req.file) return res.status(400).json({ error: 'No file' });
    res.json({ filename: req.file.filename });
  } catch (err) {
    next(err);
  }
}
