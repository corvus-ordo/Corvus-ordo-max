// /core/controllers/wishlistController.js
import * as wishlistService from '../services/wishlistService.js';

export async function getMyWishlist(req, res, next) {
  try {
    const items = await wishlistService.getWishlist(req.user.id);
    res.json(items);
  } catch (err) {
    next(err);
  }
}

export async function addWishlistItem(req, res, next) {
  try {
    const { publicationId } = req.body;
    const item = await wishlistService.addToWishlist(
      req.user.id,
      publicationId
    );
    res.status(201).json(item);
  } catch (err) {
    next(err);
  }
}

export async function removeWishlistItem(req, res, next) {
  try {
    await wishlistService.removeFromWishlist(req.user.id, req.params.id);
    res.json({ message: 'Removed from wishlist' });
  } catch (err) {
    next(err);
  }
}
