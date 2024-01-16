var mongoose = require("mongoose");

//this is purchase_list after delivery_status becomes true, and when false then it is active order list
var cart_details = new mongoose.Schema(
  {
    cart_id: {
      type: Number,
      required: true,
      unique: true,
    },

    user_id: {
      type: Number,
      required:true,
    },

    order_date: {
      type: Date,
      required:true,
    },

    delivery_date: {
      type: Date,
    },

    delivery_status: {
      type: Boolean,
      default: false,
      required:true,
    },

    total_products: {
      type: Number,
      required:true,
    },

    total_price: {
      type: Number,
      required:true,
    },
    
  }
  ,
  { timestamps: true }
);


cart_details.
module.exports = mongoose.model("Cart_details", cart_details);