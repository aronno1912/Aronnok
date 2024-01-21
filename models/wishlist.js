var mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

var wishlist = new mongoose.Schema(
  {
    user_id: {
        type: ObjectId,
        ref: "User",
        required: true,
      },
    
      product_id: {
        type: ObjectId,
        ref: "Product",
        required: true,
      },
      
    bought: {
        type: Number,
        required:true,
      },
  }
  ,
  { timestamps: true }
);


wishlist.
module.exports = mongoose.model("Wishlist", wishlist);
