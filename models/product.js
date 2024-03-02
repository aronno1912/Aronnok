const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      maxlength: 32
    },
    sciname:{
      type: String,
    },
    description: {
      type: String,
      trim: true,
      required: true,
      maxlength: 2000
    },
    price: {
      type: Number,
      required: true,
      maxlength: 32,
      trim: true
    },
    category: {
      type: ObjectId,
      ref: "Category",
      required: true
    },
    stock: {
      type: Number
    },
    sold: {
      type: Number,
      default: 0
    },
    rating:{
        type: Number,
        default: 5
    },
    ratedBy:{
      type: Number,
      default: 1
  },
    photo: {
      type: String

    },
    tags:
    {
      type:[String],
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
