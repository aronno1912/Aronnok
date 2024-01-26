//works
const Order = require("../models/order");
const User = require("../models/user");
const Product = require("../models/product");
exports.getOrderById = (req, res, next, id) => {
  Order.findById(id)
    .exec()
    .then((order) => {
      if (!order) {
        return res.status(400).json({
          error: "No order found in DB",
        });
      }
      req.order = order;
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

// create the order, just a noob version of the order, u have to update it later with proper addr and everything
exports.createOrder = async (req, res) => {
  try {
    console.log(req.body);
    let order = new Order(req.body);
    await order.save();
    res.status(201).json({ message: 'Order created successfully!' });
    // You may want to handle the response or redirect to a login page

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// get all orders for ADMIN
exports.getAllOrders = (req, res, next) => {
  Order.find()
    .sort({ createdAt: -1 })
    .exec()
    .then((order) => {
      res.json(order);
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

// // get status of order for ADMIN
// exports.getOrderStatus = (req, res) => {
//   res.json(Order.schema.path("status").enumValues);
// };

exports.updateStatus = async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(
      { _id: req.params.orderId },
      { $set: { status: req.body.status } },
      { new: true, useFindAndModify: false }
    );

    if (!order) {
      return res.status(400).json({
        error: "Failed to update order status"
      });
    }
    res.json(order);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Internal Server Error"
    });
  }
};

// // list all orders for Admin to see in Manage Orders section
// exports.listAllOrders = (req, res) => {
//   Order.find().exec((err, orders) => {
//     if (err) {
//       return res.status(400).json({
//         error: "NO orders found",
//       });
//     }
//     res.json(orders);
//   });
// };

exports.getReceivedOrders = (req, res, next) => {
  Order.find({ status: 'Received' })
    .sort({ createdAt: -1 })
    .exec()
    .then((orders) => {
      res.json(orders);
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

exports.getParticularOrder = async (req, res, next) => {
  try {
    // Assuming req.order is already populated with the user field
    const order = req.order;
    // console.log(order);
    // Access the user's name from the populated user field
    const user = await User.findOne({ _id: order.user });
    const username=user.username;
    const updatedProducts = await Promise.all(order.products.map(async (item) => {
      const productDetails = await Product.findById(item.product);
      
      if (productDetails) {
        const subtotal = productDetails.price * item.quantity;
        return {
          ...item.toObject(),
          productName: productDetails.name,
          productPrice: productDetails.price,
          subtotal,
        };
      }
      
      return item;
    }));
  
    // const totalAmount = updatedProducts.reduce((total, item) => total + item.subtotal, 0);
    // Add the user's name to the existing req.order object
    req.order = {
      ...req.order.toObject(), // Convert Mongoose document to plain JavaScript object
      username,
      products: updatedProducts,
    };
    
    // Now req.order includes the user's name
    return res.json(req.order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};