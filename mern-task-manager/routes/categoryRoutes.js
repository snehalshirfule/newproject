const express = require('express');
const Category = require('../models/Category');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

// Create a new category (POST /categories)
router.post('/', authMiddleware, async (req, res) => {
  const { name } = req.body;

  try {
    const category = new Category({
      name,
      user: req.user.userId,  // The user who owns the category
    });
    await category.save();
    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all categories for the authenticated user (GET /categories)
router.get('/', authMiddleware, async (req, res) => {
  try {
    const categories = await Category.find({ user: req.user.userId });  // Fetch user-specific categories
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete a category (DELETE /categories/:id)
router.delete('/:id', authMiddleware, async (req, res) => {
  const { id } = req.params;
  
  try {
    await Category.findByIdAndDelete(id);
    res.status(200).json({ message: 'Category deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
