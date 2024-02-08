const express = require('express');
const router = express.Router();
const { check, validationResult,oneOf } = require("express-validator");
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
  } = require('../controller/auction');

router.param("auctionId", getAuctionById);
// Define routes for auction functionalities
router.post('/auction/create', createAuction);
router.get('/auction/get-auction/:auctionId', getAuction);
router.get('/auctions', getAllAuctions);
router.get('/auction/:auctionId/products', getAuctionProducts);
router.post('/auction/add-product/:auctionId', [
    check('name').not().isEmpty().withMessage('Product name is required'),
    check('description').not().isEmpty().withMessage('Product description is required'),
    // check('photo').not().isEmpty().withMessage('Product photo is required'),
  ], addProductToAuction);
router.post('/auction/:auctionId/products/:productId/bid', placeBid);
router.put('/auction/close-bidding/:auctionId/:productId', closeBidding);
// Get past auctions
router.get('/auction/past', getPastAuctions);

// Get ongoing auctions
router.get('/auction/ongoing', getOngoingAuctions);

// Get future auctions
router.get('/auction/future', getFutureAuctions);
router.get('/auction/:auctionId/top', getTopSellingProductsInAnAuction);
router.get('/auction/:auctionId/remainingTime',remainingTime);

///IGNORE THIS, ETA LAGBE NA TODER
router.post('/auction/:auctionId/:productId', addProductToAuctionById);
module.exports = router;
