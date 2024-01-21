const express = require('express');
const router = express.Router();

const { isSignedIn, isAuthenticated } = require('../controller/auth');
const { getUserById } = require('../controller/user');
const { getBkashToken, processBkashPayment, handleBkashCallback } = require('../controller/payment');

router.param('userId', getUserById);

// Route to get Bkash token
router.get('/payment/getbkashtoken/:userId', 
isSignedIn, 
// isAuthenticated, 
getBkashToken);

// Route to process Bkash payment
router.post('/payment/bkash/:userId', 
isSignedIn, 
// isAuthenticated, 
processBkashPayment);

// Route to handle Bkash callback
router.get('/payment/bkash-callback', handleBkashCallback);

module.exports = router;
