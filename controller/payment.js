// const axios = require('axios');
const User = require("../models/user");
const { Auction, AuctionProduct, RequestedAuctionProduct } = require('../models/auction');
const { SellProduct } = require('../models/sell');
const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
const SSLCommerzPayment = require('sslcommerz-lts');
const product = require('../models/product');
const store_id = 'aronn65c4e1445f6f7'
const store_passwd = 'aronn65c4e1445f6f7@ssl'
const is_live = false //true for live, false for sandbox
const tran_id = new ObjectId().toString();
exports.paymentOrder = async (req, res) => {
  const order = req.order;
  const user = await User.findById(order.user);
  const data = {
    total_amount: order.amount,
    currency: 'BDT',
    tran_id: tran_id, // use unique tran_id for each api call
    success_url: `http://localhost:8000/api/payment/success/${tran_id}`,
    fail_url: `http://localhost:8000/api/payment/fail/${tran_id}`,
    cancel_url: 'http://localhost:8000/cancel',
    ipn_url: 'http://localhost:8000/ipn',
    shipping_method: 'Courier',
    product_name: 'Computer.',
    product_category: 'Electronic',
    product_profile: 'general',
    cus_name: user.username,
    cus_email: user.email,
    cus_add1: order.address,
    cus_add2: user.present_addr,
    cus_city: 'Dhaka',
    cus_state: 'Dhaka',
    cus_postcode: '1000',
    cus_country: 'Bangladesh',
    cus_phone: '897987097',
    cus_fax: '01711111111',
    ship_name: user.username,
    ship_add1: order.address,
    ship_add2: user.present_addr,
    ship_city: 'Dhaka',
    ship_state: 'Dhaka',
    ship_postcode: 1000,
    ship_country: 'Bangladesh',
  };
  const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live)
  sslcz.init(data).then(apiResponse => {
    // Redirect the user to payment gateway
    let GatewayPageURL = apiResponse.GatewayPageURL
    // console.log(GatewayPageURL)
    // res.redirect(GatewayPageURL)
    res.status(200).json({ "url": GatewayPageURL })
    // console.log('Redirecting to: ', GatewayPageURL)
  });
};

exports.success = async (req, res) => {

  // res.status(200).json({"message": `${req.params.transId} is successful`});
  // console.log(`${req.params.transId} is successful`);
  res.redirect(`http://localhost:3000/home/659ef1753bec420af571c082`);
};
exports.successSell = async (req, res) => {
  const { pname, pdescription, pprice, pphoto,reqId } = req.query;
  // console.log(reqId);
  // res.status(200).json({"message": `${req.params.transId} is successful`});
  // console.log(`${req.params.transId} is successful`);
  res.redirect(`http://localhost:3000/admin/viewsellrequests/review?pname=${encodeURIComponent(pname)}&pdescription=${encodeURIComponent(pdescription)}&pprice=${encodeURIComponent(pprice)}&pphoto=${encodeURIComponent(pphoto)}&reqId=${encodeURIComponent(reqId)}`);
};
exports.fail = async (req, res) => {
  // res.status(400).json({"message": `${req.params.transId} has failed`});
  // console.log(`${req.params.transId} has failed`)
  res.redirect(`http://localhost:3000/payment/fail/${req.params.transId}`);
};

exports.paymentAuction = async (req, res) => {
  const auctionProductId = req.params.productId;
  const auctionProduct = await AuctionProduct.findById(auctionProductId);
  // console.log(auctionProduct);
  const bidderId = auctionProduct.highestBidder;
  const bidder = await User.findById(bidderId);
  const data = {
    total_amount: auctionProduct.currentBid,
    currency: 'BDT',
    tran_id: tran_id, // use unique tran_id for each api call
    success_url: `http://localhost:8000/api/payment/success/${tran_id}`,
    fail_url: `http://localhost:8000/api/payment/fail/${tran_id}`,
    cancel_url: 'http://localhost:8000/cancel',
    ipn_url: 'http://localhost:8000/ipn',
    shipping_method: 'Courier',
    product_name: 'Computer.',
    product_category: 'Electronic',
    product_profile: 'general',
    cus_name: bidder.username,
    cus_email: bidder.email,
    cus_add1: bidder.present_addr,
    cus_add2: bidder.present_addr,
    cus_city: 'Dhaka',
    cus_state: 'Dhaka',
    cus_postcode: '1000',
    cus_country: 'Bangladesh',
    cus_phone: '07198847873',
    cus_fax: '01711111111',
    ship_name: bidder.username,
    ship_add1: bidder.present_addr,
    ship_add2: bidder.present_addr,
    ship_city: 'Dhaka',
    ship_state: 'Dhaka',
    ship_postcode: 1000,
    ship_country: 'Bangladesh',
  };
  const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live)
  sslcz.init(data).then(apiResponse => {
    // Redirect the user to payment gateway
    let GatewayPageURL = apiResponse.GatewayPageURL
    // console.log(GatewayPageURL)
    // res.redirect(GatewayPageURL)
    res.status(200).json({ "url": GatewayPageURL })
    // console.log('Redirecting to: ', GatewayPageURL)
  });
};

exports.paymentSell = async (req, res,next) => {
  // console.log("kjbkaj")
  // console.log(req.body.pname);
  const sellProductId = req.params.reqProductId;
  const sellProduct = await SellProduct.findById(sellProductId);
  const userId = sellProduct.user;
  const user = await User.findById(userId);
  const data = {
    total_amount: sellProduct.askingPrice,
    currency: 'BDT',
    tran_id: tran_id, // use unique tran_id for each api call
    success_url: `http://localhost:8000/api/payment/success/sell/${tran_id}?pname=${req.body.pname}&pdescription=${req.body.pdescription}&pprice=${req.body.pprice}&pphoto=${req.body.pphoto}&reqId=${req.params.reqProductId}`,
    fail_url: `http://localhost:8000/api/payment/fail/${tran_id}`,
    cancel_url: 'http://localhost:8000/cancel',
    ipn_url: 'http://localhost:8000/ipn',
    shipping_method: 'Courier',
    product_name: 'Computer.',
    product_category: 'Electronic',
    product_profile: 'general',
    cus_name: user.username,
    cus_email: user.email,
    cus_add1: user.present_addr,
    cus_add2: user.present_addr,
    cus_city: 'Dhaka',
    cus_state: 'Dhaka',
    cus_postcode: '1000',
    cus_country: 'Bangladesh',
    cus_phone: '07198847873',
    cus_fax: '01711111111',
    ship_name: user.username,
    ship_add1: user.present_addr,
    ship_add2: user.present_addr,
    ship_city: 'Dhaka',
    ship_state: 'Dhaka',
    ship_postcode: 1000,
    ship_country: 'Bangladesh',
  };
  const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live)
  sslcz.init(data).then(apiResponse => {
    // Redirect the user to payment gateway
    let GatewayPageURL = apiResponse.GatewayPageURL
    // console.log(GatewayPageURL)
    // res.redirect(GatewayPageURL)
    res.status(200).json({ "url": GatewayPageURL })
    next();
    // console.log('Redirecting to: ', GatewayPageURL)
  });
};