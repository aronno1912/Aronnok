const User = require("../models/user");



exports.getUserById = (req, res, next, id) => {
  User.findById(id)
  .exec()
  .then((user) => {
    if (!user) {
      return res.status(400).json({
        error: "No user was found in DB",
      });
    }
    req.profile = user;
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

exports.getUser = (req, res) => {
  req.profile.salt = undefined;
  req.profile.encry_password = undefined;
  return res.json(req.profile);
};

exports.updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      { _id: req.profile._id },
      { $set: req.body },
      { new: true, useFindAndModify: false }
    );

    if (!user) {
      return res.status(400).json({
        error: "You are not authorized to update this user"
      });
    }

    user.salt = undefined;
    user.encry_password = undefined;
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Internal Server Error"
    });
  }
};

exports.getAllUser = (req, res, next) => {
  // console.log("mor")
  User.find()
  .exec()
  .then((users) => {
    if (!users) {
      return res.status(400).json({
        error: "No user was found in DB",
      });
    }
    res.json(users);
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


// exports.userPurchaseList = (req, res) => {
//   Order.find({ user: req.profile._id })
//     .populate("user", "_id name")
//     .exec((err, order) => {
//       if (err) {
//         return res.status(400).json({
//           error: "No Order in this account"
//         });
//       }
//       return res.json(order);
//     });
// };

// exports.pushOrderInPurchaseList = (req, res, next) => {
//   let purchases = [];
//   req.body.order.products.forEach(product => {
//     purchases.push({
//       _id: product._id,
//       name: product.name,
//       description: product.description,
//       category: product.category,
//       quantity: product.quantity,
//       amount: req.body.order.amount,
//       transaction_id: req.body.order.transaction_id
//     });
//   });

//   //store thi in DB
//   User.findOneAndUpdate(
//     { _id: req.profile._id },
//     { $push: { purchases: purchases } },
//     { new: true },
//     (err, purchases) => {
//       if (err) {
//         return res.status(400).json({
//           error: "Unable to save purchase list"
//         });
//       }
//       next();
//     }
//   );
// };

exports.userInfoForAdmin = async (req, res, next) => {
  const userId = req.params.userId;
  req.profile.salt = undefined;
  req.profile.encry_password = undefined;

  try {
    const orders = await Order.find({ user: userId }).sort({ createdAt: -1 }).exec();
    const sellProducts = await SellProduct.find({ user: userId }).sort({ createdAt: -1 }).exec();
    const auctionProducts = await AuctionProduct.find({ highestBidder: userId }).sort({ createdAt: -1 }).exec();
    const updatedAuctionProducts = await Promise.all(auctionProducts.map(async (auctionProduct) => {
      const auction = await Auction.findById(auctionProduct.auction);
      if (auction) {
        auctionName = auction.name;

        return {
          ...auctionProduct.toObject(),
          auctionName: auctionName,
        };
        // console.log(bid);
      }
    }));
    const userInfo = {
      user: req.profile,
      orders: orders,
      sellProducts: sellProducts,
      auctionProducts: updatedAuctionProducts,
    };
 
    res.json(userInfo);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Internal Server Error"
    });
  }
};
 
exports.userAuctionInfoForAdmin = async (req, res, next) => {
  const userId = req.params.userId;
  req.profile.salt = undefined;
  req.profile.encry_password = undefined;

  try {
    const auctionProducts = await AuctionProduct.find({ highestBidder: userId }).sort({ createdAt: -1 }).exec();
    const updatedAuctionProducts = await Promise.all(auctionProducts.map(async (auctionProduct) => {
      const auction = await Auction.findOne({
        _id: auctionProduct.auction,
        status: "completed"
      });

      if (auction) {
        const auctionName = auction.name;

        return {
          ...auctionProduct.toObject(),
          auctionName: auctionName,
        };
      }
      // Return null for filtering out later
      return null;
    }));

    // Filter out null values
    const filteredAuctionProducts = updatedAuctionProducts.filter(product => product !== null);

    res.json(filteredAuctionProducts);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Internal Server Error"
    });
  }
};
