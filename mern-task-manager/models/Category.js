const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },  // Category name (e.g., "Work", "Personal")
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },  // The user who owns the category
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Category', categorySchema);
