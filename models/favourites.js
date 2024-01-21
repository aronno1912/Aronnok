var mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

var favourites = new mongoose.Schema(
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


favourites.
module.exports = mongoose.model("Favourites", favourites);
