// const express = require('express');
// const router = express.Router();
// const { registerUser, loginUser, updateUserProfile } = require('../controllers/userController');
// const { protect } = require('../middleware/authMiddleware');

// router.post('/register', registerUser);
// router.post('/login', loginUser);
// router.put('/profile', protect, updateUserProfile);

// module.exports = router;

const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
  updateUserProfile,
} = require("../controllers/userController");

const { protect } = require("../middleware/authMiddleware");

// AUTH ROUTES
router.post("/register", registerUser);
router.post("/login", loginUser);

// PROTECTED ROUTE
router.put("/profile", protect, updateUserProfile);

module.exports = router;
