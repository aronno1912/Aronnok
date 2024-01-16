var mongoose = require("mongoose");

var cart_products= new mongoose.Schema(
  {
    cart_id: {
      type: Number,
      required: true,
      unique: true,
    },

    product_id: {
      type: Number,
      required:true,
    },
    
  }
  ,
  { timestamps: true }
);


cart_products.
module.exports = mongoose.model("Cart_products", cart_products);