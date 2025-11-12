const express = require('express');
const router = express.Router();
const searchController = require('../controllers/searchController');
const { protect } = require('../middleware/authMiddleware'); // Middleware import karein

// Search route ko 'protect' karein
router.get('/', protect, searchController.search);

module.exports = router;