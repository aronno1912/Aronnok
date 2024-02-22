const express = require('express');
const router = express.Router();
const { check, validationResult, oneOf } = require("express-validator");
const { isSignedIn, isAuthenticated, isAdmin } = require("../controller/auth");
const {
  getAuctionById,
  createAuction,
  getAuction,
  getAllAuctions,
  getAuctionProducts,
  addProductToAuction,
  placeBid,
  closeBidding,
  getPastAuctions,
  getOngoingAuctions,
  getFutureAuctions,
  getTopSellingProductsInAnAuction,
  addProductToAuctionById,
  remainingTime,
  getIndividualProductInOneAuction,
  sellRequest,
  requestApproval,
  getAllRequestsForIndividualAuction,
  getIndividualRequest,
  getProductsByHighestBidder,
  currentRemainingTime,
} = require('../controller/auction');
const {
  // getUserNotifications,
  // // getAuctionMessages,
  // markNotificationAsRead,
  postUserNotifications,
} = require('../controller/notification');
const { getUserById } = require("../controller/user");
const { paymentAuction } = require('../controller/payment');
router.param("userId", getUserById);
router.param("auctionId", getAuctionById);
// Define routes for auction functionalities
router.post('/auction/create', 
// isSignedIn,
// isAuthenticated,
// isAdmin,
createAuction);
router.get('/auction/get-auction/:auctionId', 
// isSignedIn,
// isAuthenticated,
// isAdmin,
getAuction);
router.get('/auctions', getAllAuctions);
router.get('/auction/:auctionId/products', getAuctionProducts);
router.post('/auction/add-product/:auctionId', [
  check('name').not().isEmpty().withMessage('Product name is required'),
  check('description').not().isEmpty().withMessage('Product description is required'),
  // check('photo').not().isEmpty().withMessage('Product photo is required'),
], addProductToAuction);
router.post('/auction/:auctionId/products/:productId/bid', placeBid);
router.put('/auction/close-bidding/:auctionId/:productId', closeBidding,postUserNotifications);
// Get past auctions
router.get('/auction/past', getPastAuctions);

// Get ongoing auctions
router.get('/auction/ongoing', getOngoingAuctions);

// Get future auctions
router.get('/auction/future', getFutureAuctions);
router.get('/auction/:auctionId/top', getTopSellingProductsInAnAuction);
router.get('/auction/:auctionId/remainingTime', remainingTime);
router.get('/auction/remainingTime', currentRemainingTime);

///IGNORE THIS, ETA LAGBE NA TODER
router.post('/auction/:auctionId/:productId', addProductToAuctionById);
router.get('/auction/:auctionId/:productId', getIndividualProductInOneAuction);
router.post('/auction/auction-request/:auctionId/:userId', sellRequest);
router.post('/auction/auction-request-approval/:auctionId/:reqId', //userId just to check if it's admin
// isSignedIn,
requestApproval);
router.get('/auction/all/:auctionId/auction-request', getAllRequestsForIndividualAuction);
router.get('/auction/all/:auctionId/:reqId/auction-ind-request', getIndividualRequest);
router.post('/auction/:auctionId/:productId/payment', 
// closeBidding,
paymentAuction);
router.get('/auction/highestBidder/:auctionId/:userId', getProductsByHighestBidder);
module.exports = router;
