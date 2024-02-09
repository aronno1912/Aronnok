const { Auction, AuctionProduct, RequestedAuctionProduct } = require('../models/auction');
const User = require("../models/user");
const { validationResult } = require('express-validator');
const moment = require('moment');
// Create a new auction
exports.createAuction = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array()[0].msg });
  }

  try {
    const { date, startTime, endTime, plants } = req.body;
    const auctionProducts = plants;
    const newAuction = new Auction({
      date,
      startTime,
      endTime,
      auctionProducts,
    });

    await newAuction.save();
    // Use findOne to retrieve a single document
    const auction = await Auction.findOne({ _id: newAuction._id });
    if (auction) {
      res.json({ "id": auction._id });
      // pass control to the next middleware or route handler in the sequence
      next();
    } else {
      // Handle the case where no auction is found
      res.status(404).json({ error: "Auction not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
exports.getAuctionById = (req, res, next, id) => {
  Auction.findById(id)
    .exec()
    .then((auction) => {
      if (!auction) {
        return res.status(400).json({
          error: "Auction not found",
        });
      }
      req.auction = auction;
      // pass control to the next middleware or route handler in the sequence
      next();
    })
    .catch((err) => {
      // Handle errors here
      console.error(err);
      res.status(500).json({
        error: "Internal Server Error",
      });
    });
};

// Get a specific auction
exports.getAuction = async (req, res) => {
  try {
    res.status(200).json(req.auction);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
exports.getAllAuctions = async (req, res) => {
  Auction.find()
    .exec()
    .then((auctions) => {
      if (!auctions) {
        return res.status(400).json({
          error: "No products found",
        });
      }
      res.json(auctions);
    })
    .catch((err) => {
      // Handle errors here
      console.error(err);
      res.status(500).json({
        error: "Internal Server Error",
      });
    });
};
// Get products of a specific auction
exports.getAuctionProducts = async (req, res) => {
  try {
    const auction = req.auction;
    const auctionProducts = await Promise.all(auction.auctionProducts.map(async (item) => {
      const productDetails = await AuctionProduct.findById(item);
      if (productDetails) {
        let highestBidder = null;
        if (productDetails.highestBidder) {
          const user = await User.findById(productDetails.highestBidder);
          if (user) {
            highestBidder = user.username;
          }
        }
        console.log(item);
        let bidderName=null;
        const updatedBids = await Promise.all(productDetails.bids.map(async (bid) => {
          const bidPlacerDetails = await User.findById(bid.bidder);
          if (bidPlacerDetails) {
            bidderName = bidPlacerDetails.username;

            return {
              ...bid.toObject(),
              bidderName: bidderName,
            };
            console.log(bid);
          }
        }));
        return {
          ...productDetails.toObject(),
          bids:updatedBids,
          highestBidder: highestBidder,
        };
      } else {
        console.log('Product details not found for ID:', item);
      }
    }));
    res.status(200).json(auctionProducts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Add a product to a specific auction
exports.addProductToAuction = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array()[0].msg });
  }

  try {
    // console.log(req.body)
    const { name, description, photoName, initialbid } = req.body;
    console.log(initialbid)
    const currentBid = initialbid;
    console.log(currentBid)
    const photo = "/" + photoName;
    // console.log(photo)
    const auctionProduct = new AuctionProduct({
      name,
      description,
      photo,
      currentBid,
    });

    await auctionProduct.save();
    console.log(auctionProduct)
    req.auction.auctionProducts.push(auctionProduct._id);
    await req.auction.save();

    res.status(201).json({ message: 'Product added to auction successfully!', auctionProduct });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Place a bid on a specific product in an auction
exports.placeBid = async (req, res) => {
  console.log(req.body)
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array()[0].msg });
  }

  try {
    const { bidder, bidAmount } = req.body;

    const auctionProduct = await AuctionProduct.findById(req.params.productId);

    if (!auctionProduct) {
      return res.status(404).json({ error: 'Auction product not found' });
    }

    if (auctionProduct.isSold) {
      return res.status(400).json({ error: 'Auction product is already sold' });
    }

    if (bidAmount <= auctionProduct.currentBid) {
      return res.status(400).json({ error: 'Bid amount must be higher than the current bid' });
    }

    auctionProduct.highestBidder = bidder;
    auctionProduct.currentBid = bidAmount;
    auctionProduct.bids.push({ bidder, bidAmount });
    await auctionProduct.save();

    res.status(200).json({ message: 'Bid placed successfully!', auctionProduct });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Close bidding on a specific product
exports.closeBidding = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array()[0].msg });
  }

  try {
    const auctionProductId = req.params.productId;
    const auctionProduct = await AuctionProduct.findById(auctionProductId);
    //   const auctionProductId = req.auction.auctionProducts.find(product => product._id.equals(auctionProductId));

    // console.log(auctionProduct)

    // Determine the winning bid
    let winningBid = null;

    if (auctionProduct.bids.length > 0) {
      // Sort bids in descending order based on bidAmount
      auctionProduct.bids.sort((a, b) => b.bidAmount - a.bidAmount);

      // The first bid in the sorted array is the winning bid
      winningBid = auctionProduct.bids[0];
    }

    if (winningBid) {
      // Update the auction product with the winning bid and set isSold to true
      const updatedAuctionProduct = await AuctionProduct.findByIdAndUpdate(
        auctionProductId,
        {
          $set: {
            isSold: true,
            highestBidder: winningBid.bidder,
            currentBid: winningBid.bidAmount,
          },
        },
        { new: true }
      );

      res.status(200).json({ message: 'Bidding closed successfully!', updatedAuctionProduct });
    } else {
      // If no bids, you can handle this case as needed (e.g., set isSold to true without a winning bid)
      res.status(400).json({ error: 'No bids found for this product' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get past auctions
exports.getPastAuctions = async (req, res) => {
  try {
    const pastAuctions = await Auction.find({ endTime: { $lt: new Date() } })
      .populate('auctionProducts')
      .exec();
    res.json(pastAuctions);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
// Get ongoing auctions
exports.getOngoingAuctions = async (req, res) => {
  try {
    const ongoingAuctions = await Auction.find({
      startTime: { $lte: new Date() },
      endTime: { $gt: new Date() },
    })
      .populate('auctionProducts')
      .exec();
    res.json(ongoingAuctions);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get future auctions
exports.getFutureAuctions = async (req, res) => {
  try {
    const futureAuctions = await Auction.find({ startTime: { $gt: new Date() } })
      .populate('auctionProducts')
      .exec();
    res.json(futureAuctions);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getTopSellingProductsInAnAuction = async (req, res) => {
  try {
    const auction = req.auction;
    const auctionProducts = await Promise.all(auction.auctionProducts.map(async (item) => {
      const productDetails = await AuctionProduct.findById(item);
      if (productDetails) {
        let highestBidder = null;
        if (productDetails.highestBidder) {
          const user = await User.findById(productDetails.highestBidder);
          if (user) {
            highestBidder = user.username;
          }
        }
        return {
          ...productDetails.toObject(),
          highestBidder: highestBidder,
        };
      } else {
        console.log('Product details not found for ID:', item);
      }
    }));
    // Sort the auctionProducts array based on bid amount
    auctionProducts.sort((a, b) => b.currentBid - a.currentBid);

    // Select the top 3 products
    const top3Products = auctionProducts.slice(0, 3);

    res.status(200).json(top3Products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.addProductToAuctionById = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array()[0].msg });
  }

  try {
    let auction=req.auction;
    auction.auctionProducts.push(req.params.productId);
    await auction.save();
    res.status(201).json({ message: 'Product added to auction successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.remainingTime = async (req, res) => {
  try {
    let auction=req.auction;
    const currentTime = moment(); // Current time
    const endTime = moment(auction.endTime); // End time of the auction

    // Calculate the time difference
    const duration = moment.duration(endTime.diff(currentTime));

    // Get remaining time in hours, minutes, and seconds
    const hours = Math.floor(duration.asHours());
    const minutes = Math.floor(duration.minutes());
    const seconds = Math.floor(duration.seconds());
    res.status(201).json({ "hour":`${hours}`,"min":`${minutes}`,"sec": `${seconds}`});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getIndividualProductInOneAuction = async (req, res) => {
  try {
    const auction = req.auction;
    const productDetails = await AuctionProduct.findById(req.params.productId).lean(); // Convert to plain JavaScript object
    const bids = await Promise.all(productDetails.bids.map(async (bid) => {
      const bidderDetails = await User.findById(bid.bidder);
      if (bidderDetails) {
        bid.bidderName = bidderDetails.username; // Add bidderName field to each bid
      } else {
        console.log('Bidder details not found for ID:', bid.bidder);
      }
      return bid;
    }));
    bids.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    // Update productDetails with the bids array including bidderName
    productDetails.bids = bids;
  
    res.status(200).json(bids);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
  
};

exports.sellRequest = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array()[0].msg });
  }

  try {
    // console.log(req.body)
    const { name, description, photoName, initialbid } = req.body;
    // console.log(initialbid)
    const initialBid=initialbid;
    // console.log(currentBid)
    const photo = "/" + photoName;
    // console.log(photo)
    const requestedAuctionProduct = new RequestedAuctionProduct({
      name,
      description,
      photo,
      initialBid,
      auction:req.params.auctionId,
    });

    await requestedAuctionProduct.save();
    // console.log(auctionProduct)
    // req.auction.auctionProducts.push(auctionProduct._id);
    // await req.auction.save();

    res.status(201).json({ message: 'Request added to auction successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.requestApproval = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array()[0].msg });
  }

  try {
    const auction = req.auction;
    const requestId = req.params.reqId;

    // Find the requested product
    const requestedProduct = await RequestedAuctionProduct.findById(requestId);
    if (!requestedProduct) {
      return res.status(404).json({ error: 'Requested product not found' });
    }

    // Create a new AuctionProduct
    const newAuctionProduct = new AuctionProduct({
      name: requestedProduct.name,
      description: requestedProduct.description,
      photo: requestedProduct.photo,
      currentBid: requestedProduct.initialBid,
    });

    // Save the new AuctionProduct
    const savedAuctionProduct = await newAuctionProduct.save();

    // Add the new AuctionProduct to the auction
    auction.auctionProducts.push(savedAuctionProduct._id);
    await auction.save();

    // Delete the requested product
    await RequestedAuctionProduct.findByIdAndDelete(requestId);

    res.status(201).json({ message: 'Product request approved successfully!', auctionProduct: savedAuctionProduct });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getAllRequestsForIndividualAuction = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array()[0].msg });
  }
  try {
    const auctionId = req.params.auctionId;
    const requests = await RequestedAuctionProduct.find({ auction: auctionId });
    res.status(201).json(requests);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};