// src/routes/webhookRoutes.js
const express = require('express');
const router = express.Router();
const { stripeWebhook } = require('../controllers/webhookController');

// We must parse this specific route as RAW data, not JSON
router.post('/', express.raw({ type: 'application/json' }), stripeWebhook);

module.exports = router;