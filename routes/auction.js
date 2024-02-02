const express = require('express');
const router = express.Router();
const { check, validationResult,oneOf } = require("express-validator");
const {
    getAuctionById,
    createAuction,
    getAuctionProducts,
    addProductToAuction,
    placeBid,
    closeBidding
  } = require('../controller/auction');

router.param("auctionId", getAuctionById);
// Define routes for auction functionalities
router.post('/auction/create', createAuction);
router.get('/auction/:auctionId/products', getAuctionProducts);
router.post('/auction/add-product/:auctionId', [
    check('name').not().isEmpty().withMessage('Product name is required'),
    check('description').not().isEmpty().withMessage('Product description is required'),
    check('photo').not().isEmpty().withMessage('Product photo is required'),
  ], addProductToAuction);
router.post('/auction/:auctionId/products/:productId/bid', placeBid);
router.put('/auction/close-bidding/:auctionId/:productId', closeBidding);
module.exports = router;