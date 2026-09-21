// src/controllers/webhookController.js
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Order = require('../models/Order');

// @desc    Handle Stripe Webhooks
// @route   POST /api/webhook
// @access  Public (Stripe calls this)
const stripeWebhook = async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    // Verify that this request actually came from Stripe
    event = stripe.webhooks.constructEvent(
      req.body, // This MUST be raw data, not JSON!
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error(`Webhook Error: ${err.message}`);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event when a payment is successful
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;

    // Get the order ID we passed as client_reference_id earlier
    const orderId = session.client_reference_id;

    try {
      // Find the pending order and mark it as completed!
      const order = await Order.findById(orderId);
      if (order) {
        order.paymentStatus = 'completed';
        await order.save();
        console.log(`✅ Order ${orderId} successfully marked as PAID!`);
      }
    } catch (error) {
      console.error('Error updating order:', error);
    }
  }

  // Return a 200 response to acknowledge receipt of the event
  res.send();
};

module.exports = { stripeWebhook };