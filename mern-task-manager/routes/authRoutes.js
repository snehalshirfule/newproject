const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

// User Signup
router.post('/signup', async (req, res) => {
  console.log("Signup API hit");
  
  const { username, email, password } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = new User({ username, email, password });
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// User Login
router.post('/login', async (req, res) => {
  console.log("signIN  API hit");
  console.log(req.body);

  const { email, password } = req.body;
  console.log("signIN  API hit2");

  try {
    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
  console.log("signIN  API hit 3");

      return res.status(400).json({ message: 'User not found' });
    }

    // Check if the password is correct
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
  console.log("signIN  API hit4");

      return res.status(400).json({ message: 'Invalid password' });
    }

    // Generate JWT
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// User Logout (Simple front-end JWT removal)
router.post('/logout', (req, res) => {
  // Just return a message since JWT is stored client-side
  res.json({ message: 'User logged out' });
});

module.exports = router;
