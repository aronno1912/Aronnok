var mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
//this is purchase_list after delivery_status becomes true, and when false then it is active order list
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
  selected:
  {
    type: Boolean,
    default: false,
  }
});
const cartSchema = new mongoose.Schema({
  user: {
    type: ObjectId,
    ref: 'User',
    required: true,
  },
  items: [cartItemSchema],
  total: {
    type: Number,
    required: true,
    default: 0,
  },
  // totalQuantity: {
  //   type: Number,
  //   required: true,
  //   default: 0,
  // },
}, { timestamps: true });


const Cart = mongoose.model('Cart', cartSchema);
module.exports = Cart;