const express = require('express');
const router = express.Router();
const {
    getUserNotifications,
    // getAuctionMessages,
    markNotificationAsRead,
    postUserNotifications,
} = require('../controller/notification');

// Route for getting all notifications for a user
router.get('/notification/:userId', getUserNotifications);
// router.get('/:userId/getAuctionMsg',getAuctionMessages);
// Route for marking a notification as read
router.put('/notification/:notificationId/read', markNotificationAsRead);
router.post('/notification/:userId', postUserNotifications);
router.post('/:userId/notification/delete/:notificationId', postUserNotifications);

module.exports = router;
