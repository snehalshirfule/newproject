const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },  // Task title (required)
  description: { type: String },            // Task description (optional)
  status: {                                  // Status: pending, in-progress, or completed
    type: String,
    enum: ['pending', 'in-progress', 'completed'],
    default: 'pending',
  },
  dueDate: { type: Date },                  // Due date (optional)
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category'},    // Reference to Category
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },  // Reference to the user
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Task', taskSchema);
