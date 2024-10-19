const express = require('express');
const Task = require('../models/Task');
const authMiddleware = require('../middleware/authMiddleware'); // Middleware for auth
const router = express.Router();

// Create a task (POST /tasks)
router.post('/', authMiddleware, async (req, res) => {
  const { title, description, status, dueDate, category } = req.body;
  try {
    const task = new Task({
      title,
      description,
      status,
      dueDate,
      category,
      user: req.user.userId,  // Get the user from the auth middleware
    });
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all tasks for the authenticated user (GET /tasks)
router.get('/', authMiddleware, async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.userId });  // Find tasks specific to the user
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update task status or other properties (PUT /tasks/:id)
router.put('/:id', authMiddleware, async (req, res) => {
  const { id } = req.params;
  const { title, description, status, dueDate, category } = req.body;
  try {
    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { title, description, status, dueDate, category },
      { new: true }  // Return the updated task
    );
    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete a task (DELETE /tasks/:id)
router.delete('/:id', authMiddleware, async (req, res) => {
  const { id } = req.params;
  try {
    await Task.findByIdAndDelete(id);
    res.status(200).json({ message: 'Task deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
