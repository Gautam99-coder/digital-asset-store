// src/routes/orderRoutes.js
const express = require('express');
const router = express.Router();
const { createCheckoutSession } = require('../controllers/orderController');
const { protect } = require('../middlewares/authMiddleware');

// Route is protected - user must have a valid cookie
router.post('/checkout', protect, createCheckoutSession);

module.exports = router;