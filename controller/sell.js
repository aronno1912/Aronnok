const SellProduct=require('../models/sell');
const { validationResult } = require('express-validator');
const User = require("../models/user");

exports.sellRequest = async(req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array()[0].msg });
    }
    try {
        // console.log(req.body)
        const { name, description, photoName, ap } = req.body;
        // console.log(initialbid)
        const askingPrice = ap;
        // console.log(currentBid)
        const photo = "/" + photoName;
        // console.log(photo)
        const sellproduct = new SellProduct({
          name,
          description,
          photo,
          askingPrice,
          user: req.params.userId,
        });
    
        await sellproduct.save();
        // console.log(auctionProduct)
        // req.auction.auctionProducts.push(auctionProduct._id);
        // await req.auction.save();
    
        res.status(201).json({ message: 'Request added to auction successfully!' });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    
  };

  exports.requestApproval = async(req, res) => {
  };