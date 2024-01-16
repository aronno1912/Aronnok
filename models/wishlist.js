var mongoose = require("mongoose");

var wishlist = new mongoose.Schema(
  {
    user_id: {
      type: Number,
      required: true,
    },
    plant_id:
     {
      type: Number,
      required:true,
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
