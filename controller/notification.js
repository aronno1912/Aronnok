const Notification = require('../models/notification');

// Controller for getting all notifications for a user
exports.getUserNotifications = async (req, res) => {
  try {
    const userId = req.params.userId;
    const notifications = await Notification.findOne({ user: userId }).sort({ createdAt: -1 });
        res.status(200).json(notifications);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Controller for marking a notification as read
exports.markNotificationAsRead = async (req, res) => {
  try {
    const notificationId = req.params.notificationId;
    const notification = await Notification.findById(notificationId);
    if (!notification) {
      return res.status(404).json({ error: 'Notification not found' });
    }
    notification.messages.forEach(message => {
      message.read = true;
    });
    await notification.save();
    res.status(200).json({ message: 'Notification marked as read' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.postUserNotifications = async (req, res) => {
  try {
    const userId = req.params.userId;
    let notification = await Notification.findOne({ user: userId }).sort({ createdAt: -1 });
    
    if (!notification) {
      // If no notification exists for the user, create a new one
      notification = new Notification({ user: userId, messages: [] });
    }

    // Add the new message to the notification
    notification.messages.push({
      message: req.body.message,
      type: req.body.type,
      // Add link if needed
    });

    // Save the notification
    await notification.save();

    res.status(200).json(notification);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.deleteUserNotifications = async (req, res) => {
  try {
    const userId = req.params.userId;
    // let allnotification = await Notification.findOne({ user: userId }).sort({ createdAt: -1 });
    
    // if (!notification) {
      // If no notification exists for the user, create a new one
      // notification = new Notification({ user: userId, messages: [] });
    // }

    // Add the new message to the notification
    Notification.findOneAndUpdate(
      { user: userId },
      { $pull: { messages: { _id: req.params.notificationId } } },
      { new: true }
    )
      .then((notification) => {
        if (!notification) {
          return res.status(404).json({
            error: 'Wishlist not found for the user',
          });
        }
        res.json(notification);
      })
      .catch((err) => {
        res.status(400).json({
          error: 'Error adding wishlist product',
        });
      });

    // Save the notification
    // await allnotification.save();

    // res.status(200).json(notification);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
