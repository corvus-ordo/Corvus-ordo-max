// /core/controllers/categoryController.js
import * as categoryService from '../services/categoryService.js';

export async function createCategory(req, res, next) {
  try {
    const cat = await categoryService.createCategory(req.body);
    res.status(201).json(cat);
  } catch (err) {
    next(err);
  }
}

export async function getCategories(req, res, next) {
  try {
    const cats = await categoryService.getCategories();
    res.json(cats);
  } catch (err) {
    next(err);
  }
}

export async function deleteCategory(req, res, next) {
  try {
    await categoryService.deleteCategory(req.params.id);
    res.json({ message: 'Category deleted' });
  } catch (err) {
    next(err);
  }
}
