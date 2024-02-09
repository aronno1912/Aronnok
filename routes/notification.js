const express = require('express');
const router = express.Router();
const {
    getUserNotifications,
    // getAuctionMessages,
    markNotificationAsRead,
} = require('../controllers/notification');

// Route for getting all notifications for a user
router.get('/notification/:userId', getUserNotifications);
// router.get('/:userId/getAuctionMsg',getAuctionMessages);
// Route for marking a notification as read
router.put('/:notificationId/read', markNotificationAsRead);

module.exports = router;
