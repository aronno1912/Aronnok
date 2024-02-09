const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  messages: [{
    message: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ['order', 'auction', 'promotion', 'reminder', 'other'],
      default: 'other',
    },
    link: {//the url
      type: String,
      // required: true,
    },
    read: {
      type: Boolean,
      default: false,
    },
  }],
}, { timestamps: true });

const Notification = mongoose.model('Notification', notificationSchema);

module.exports = Notification;
