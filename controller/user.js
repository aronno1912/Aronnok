const User = require("../models/user");
// const Order = require("../models/order");

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
  console.log("mor")
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
