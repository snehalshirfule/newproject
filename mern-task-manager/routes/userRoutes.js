const express = require('express');
const User = require('../models/User'); // Import the User model
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');

// GET /users: Fetch all users
router.get('/users', async (req, res) => {
  try {
    // Fetch users from the database (excluding the password)
    const users = await User.find({}, 'username email createdAt');
    res.status(200).json(users); // Send the users data as a response
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// DELETE /users/:id: Delete a user by ID
router.delete('/users/:id', authMiddleware, async (req, res) => {
  console.log('In delete route');
  
  const { id } = req.params; // Get the user ID from the URL parameters

  try {
  console.log('In delete route1');

    // Find the user by ID and delete
    const user = await User.findByIdAndDelete(id);
    console.log('In delete route 2');

    // If no user is found, return a 404 error
    if (!user) {
  console.log('In delete route 3');

      return res.status(404).json({ message: 'User not found' });
    }

    // Success response
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    // Handle any errors that occur
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});


module.exports = router;
