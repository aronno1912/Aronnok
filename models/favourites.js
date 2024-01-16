var mongoose = require("mongoose");


var favourites = new mongoose.Schema(
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


favourites.
module.exports = mongoose.model("Favourites", favourites);
