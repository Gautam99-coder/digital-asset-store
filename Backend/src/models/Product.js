const mongoose=require("mongoose")

const ProductSchema=new mongoose.Schema({
    title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true }, // We will store this in cents for Stripe (e.g., $10.00 = 1000)
  coverImageUrl: { type: String, required: true },
  assetFileUrl: { type: String, required: true },
}, { timestamps: true });

const ProductModel=mongoose.model("Product",ProductSchema);

module.exports=ProductModel;