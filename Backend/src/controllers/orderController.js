// src/controllers/orderController.js
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Order = require('../models/Order');
const Product = require('../models/Product');

// @desc    Create Stripe Checkout Session
// @route   POST /api/orders/checkout
// @access  Private (Logged in users only)
const createCheckoutSession = async (req, res) => {
  try {
    const { productId } = req.body;

    // 1. Find the product the user wants to buy
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // 2. Create a pending order in our database
    const order = await Order.create({
      user: req.user._id, // Got this from our 'protect' middleware!
      products: [product._id],
      totalAmount: product.price, 
      stripeSessionId: 'pending', // We will update this in a second
    });

    // 3. Create the Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: product.title,
              images: [product.coverImageUrl],
            },
            unit_amount: product.price, // Stripe expects prices in cents (e.g., $10.00 = 1000)
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      // Where Stripe sends the user after they pay (or cancel)
      success_url: `http://localhost:5173/success?orderId=${order._id}`,
      cancel_url: `http://localhost:5173/cancel`,
      // We pass our database Order ID to Stripe so they remember it
      client_reference_id: order._id.toString(), 
    });

    // 4. Update our database order with the real Stripe Session ID
    order.stripeSessionId = session.id;
    await order.save();

    // 5. Send the Stripe URL back to the frontend so React can redirect the user
    res.status(200).json({ url: session.url });

  } catch (error) {
    console.error("Stripe Error:", error);
    res.status(500).json({ message: 'Stripe checkout failed', error: error.message });
  }
};

module.exports = {
  createCheckoutSession,
};