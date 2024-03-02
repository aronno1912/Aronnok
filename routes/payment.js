const express = require('express');
const router = express.Router();

const { isSignedIn, isAuthenticated } = require('../controller/auth');
const { getUserById } = require('../controller/user');
const {
    success,
    fail,
    successSell,
} = require('../controller/payment');
// const { getBkashToken, processBkashPayment, handleBkashCallback } = require('../controller/payment');

// router.param('userId', getUserById);
// Route to get Bkash token
// router.get('/payment/init/:userId', 
// // isSignedIn, 
// // isAuthenticated, 
// // getBkashToken
// payment
// );

// // Route to process Bkash payment
// router.post('/payment/bkash/:userId', 
// isSignedIn, 
// // isAuthenticated, 
// processBkashPayment);

// // Route to handle Bkash callback
// router.get('/payment/bkash-callback', handleBkashCallback);
router.post('/payment/success/:transId', success);
router.post('/payment/success/sell/:transId', successSell);
router.post('/payment/fail/:transId', fail);

module.exports = router;
