var mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

var cart_products= new mongoose.Schema(
  {
    cart_id: {
        type: ObjectId,
        ref: "Cart_details",
        required: true,
    },

    product_id: {
        type: ObjectId,
        ref: "Product",
        required: true,
      },

  }
  ,
  { timestamps: true }
);


cart_products.
module.exports = mongoose.model("Cart_products", cart_products);