const mongoose=require('mongoose')

// src/models/Order.js
const OrderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
  totalAmount: { type: Number, required: true },
  stripeSessionId: { type: String, required: true }, // <-- Make sure it is lowercase 's'
  paymentStatus: { type: String, enum: ['pending', 'completed', 'failed'], default: 'pending' },
}, { timestamps: true });

module.exports=mongoose.model("Order",OrderSchema);