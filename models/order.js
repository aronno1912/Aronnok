var mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
const cartItemSchema = new mongoose.Schema({
  product: {
    type: ObjectId,
    ref: 'Product',
    required: true,
  },
  quantity: {
    type: Number,
    default: 1,
    min: 1,
  },
});
const orderSchema = new mongoose.Schema(
  {
    // products: [
    //     {
    //         type: ObjectId,
    //         ref: 'Cart',
    //     },
    // ],
    products: [cartItemSchema],
    //i don't know which one is better, doesn't depend on favorites or wishlist
    //i am just hoping to God that the order won't be too diverse
    // transactionId: {
    //     type: Number,
    //     required: true,
    //     unique: true,
    // },
    amount: {
      type: Number,
      required: true
    },
    address: String,
    status: {
      type: String,
      default: "Processing",
      enum: ["Cancelled", "Delivered", "Shipped", "Processing", "Recieved"],
    },
    placedOn: {
      type: Date,
      default: Date.now(),
    },
    paidOn: Date,
    deliveryFee:
    {
      type: Number,
    },
    user: {
      type: ObjectId,
      ref: "User",
      required: true,
    },
    paidBy: {
      type: String,
      // default: "Cash on delivery",
      enum: ["Cash on delivery", "Bkash online payment"],
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;