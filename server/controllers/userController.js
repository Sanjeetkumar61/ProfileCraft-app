const User = require('../models/user');
const jwt = require('jsonwebtoken');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

// Helper to get user data for response
const getUserData = (user) => ({
  _id: user._id, name: user.name, email: user.email,
  bio: user.bio, education: user.education, location: user.location,
  resumeUrl: user.resumeUrl, social: user.social,
});

exports.registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Please enter all fields' });
    }
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User with this email already exists' });
    }
    const user = await User.create({ name, email, password });
    if (user) {
      res.status(201).json({ ...getUserData(user), token: generateToken(user._id) });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (err) {
    next(err);
  }
};

exports.loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
      res.json({ ...getUserData(user), token: generateToken(user._id) });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (err) {
    next(err);
  }
};

exports.updateUserProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.bio = req.body.bio ?? user.bio;
      user.education = req.body.education ?? user.education;
      user.location = req.body.location ?? user.location;
      user.resumeUrl = req.body.resumeUrl ?? user.resumeUrl; // <-- Yahan add kiya gaya hai
      if (req.body.social) {
        user.social = req.body.social;
      }
      if (req.body.password && req.body.password !== '') {
        user.password = req.body.password;
      }
      const updatedUser = await user.save();
      res.json({ ...getUserData(updatedUser), token: generateToken(updatedUser._id) });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (err) {
    next(err);
  }
};