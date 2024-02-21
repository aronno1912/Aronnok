const Product = require('../models/product');
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

  exports.getAllSellRequest = async(req, res) => {
    console.log("here I come1");
    const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array()[0].msg });
  }

  try{
    const sellRequests = await SellProduct.find({});
    const updatedRequests = await Promise.all(sellRequests.map(async (req) => {
    const userDetails = await User.findById(req.user);
    if (userDetails) {
        console.log("here I come");
        username = userDetails.username;

        return {
          ...req.toObject(),
          username: username,
        };
      }
    }));
    res.status(201).json(updatedRequests);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
  };


  //==============================================================================================================================
  exports.requestApproval = async(req, res) => {
    const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array()[0].msg });
  }
  try{
    const requestId = req.params.reqId;
    const requestedProduct = await SellProduct.findById(requestId);
    if (!requestedProduct) {
        return res.status(404).json({ error: 'Requested product not found' });
      }
      console.log(requestedProduct.name);
      console.log(requestedProduct.description);
      console.log(requestedProduct.photo);
      console.log(requestedProduct.askingPrice);

      //create a new product
        const newProduct = new Product({
            name: requestedProduct.name,
            description: requestedProduct.description,
            photo: requestedProduct.photo,
            price: requestedProduct.askingPrice,
            catagory: "65b1d595d4aee77e1db2307b",          //?????????????????????????????/
            
        });
        await newProduct.save();
        await requestedProduct.remove();
        res.status(201).json({ message: 'Request approved successfully!'});


  }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
  };