var mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

//just normal favorites list
const favouritesSchema = new mongoose.Schema(
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
          ref: "Product",
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


module.exports = mongoose.model("Favourites", favouritesSchema);
