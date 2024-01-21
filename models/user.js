var mongoose = require("mongoose");
const crypto = require("crypto");
const { v1: uuidv1 } = require('uuid');

var userSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
      maxlength: 32,
    },
    lastname: {
      type: String,
      maxlength: 32,
    },
    username: {
        type: String,
        unique: true,
        required:true,
        maxlength: 32,
      },
      dob: {
        type: Date,
        maxlength: 12,
      },
      religion: {
        type: String,
        maxlength: 32,
      },
      mobile: {
        type: Number,
        required:true,
        maxlength: 11,
      },
    email: {
      type: String,
      required: true,
      unique: true
    },
    present_addr: {
      type: String,
      maxlength:100,
      trim: true
    },
    encry_password: {
      type: String,
      required: true
    },
    salt: String,
    //MERN
    role: {
      type: Number,
      default: 0
    },
    photo: {
      data: Buffer,
      contentType: String
    }
    // purchases: {
    //   type: Array,
    //   default: []
    // },

  }
  ,
  { timestamps: true }
);

userSchema
  .virtual("password")
  .set(function(password) {
    this._password = password;
    this.salt = uuidv1();
    this.encry_password = this.securePassword(password);
  })
  .get(function() {
    return this._password;
  });

userSchema.methods = {
  autheticate: function(plainpassword) {
    return this.securePassword(plainpassword) === this.encry_password;
  },

  securePassword: function(plainpassword) {
    if (!plainpassword) return "";
    try {
      return crypto
        .createHmac("sha256", this.salt)
        .update(plainpassword)
        .digest("hex");
    } catch (err) {
      return "";
    }
  }
};

module.exports = mongoose.model("User", userSchema);