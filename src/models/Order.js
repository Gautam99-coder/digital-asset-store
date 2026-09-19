const mongoose=require('mongoose')

const OrderSchema=new mongoose.Schema({
    user:{type:mongoose.Schema.Types.ObjectId,ref:"User",required:true},
    products:{type:mongoose.Schema.Types.ObjectId,ref:"Product",required:true},
    totalAmount:{type:Number,required:true},
    StripeSessionId:{type:String,required:true},
    paymentStatus:{type:String,enum:["pending","completed","failed"],default:"pending"}
},{timestamps:true})

module.exports=mongoose.model("Order",OrderSchema);