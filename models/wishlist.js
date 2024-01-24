var mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

//for the products that are out of stock, or maybe you wish to buy, the cart can do the same thing in the second case
//we are doing both
var wishlistSchema = new mongoose.Schema(
  {
    user: {
      type: ObjectId,
      ref: "User",
      required: true,
    },
    product: [
      {
        product: {
          type: ObjectId,
          ref: 'Product',
          required: true,
        },
        addedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    bought: {
      type: Boolean,
      default: false,
      required: true,
    },
  }
  ,
  { timestamps: true }
);


module.exports = mongoose.model("Wishlist", wishlistSchema);
