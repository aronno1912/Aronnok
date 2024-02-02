const { Auction, AuctionProduct } = require('../models/auction');
const { validationResult } = require('express-validator');

// Create a new auction
exports.createAuction = async (req, res) => {
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
    Auction.find({ date: newAuction.date, startTime: newAuction.startTime, endTime: newAuction.endTime})
    .exec()
    .then((auction) => {
      res.json(auction._id);
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
    // res.status(201).json({  });
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
// Get products of a specific auction
exports.getAuctionProducts = async (req, res) => {
  try {

    res.status(200).json(req.auction.auctionProducts);
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
    const { name, description, photo, initialbid } = req.body;
    const currentBid = initialbid;
    const auctionProduct = new AuctionProduct({
      name,
      description,
      photo,
      currentBid,
    });

    await auctionProduct.save();

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

    console.log(auctionProduct)

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