const { Order, ProductCart } = require("../models/order");

exports.getOrderById = (req, res, next, id) => {
  Order.findById(id)
    .exec((err, order) => {
      if (err) {
        return res.status(400).json({
          error: "NO order found in DB",
        });
      }
      res.order = order;
      next();
    });
};

// create the order, just a noob version of the order, u have to update it later with proper addr and everything
exports.createOrder = (req, res) => {
  req.body.order.user = req.profile;
  const order = new Order(req.body.order);
  order.save((err, order) => {
    if (err) {
      return res.status(400).json({
        error: "Failed to save your order in DB",
      });
    }
    res.json(order);
  });
};

// get all orders for ADMIN
exports.getAllOrders = (req, res) => {
  Order.find()
    .populate("user", "_id name")
    .exec((err, order) => {
      if (err) {
        return res.status(400).json({
          error: "No orders found in DB",
        });
      }
      res.json(order);
    });
};

// get status of order for ADMIN
exports.getOrderStatus = (req, res) => {
  res.json(Order.schema.path("status").enumValues);
};

exports.updateStatus = (req, res) => {
  Order.update(
    { _id: req.body.orderId },
    { $set: { status: req.body.status } },
    (err, order) => {
      if (err) {
        return res.status(400).json({
          error: "Cannot update order status",
        });
      }
      res.json(order);
    }
  );
};

// list all orders for Admin to see in Manage Orders section
exports.listAllOrders = (req, res) => {
  Order.find().exec((err, orders) => {
    if (err) {
      return res.status(400).json({
        error: "NO orders found",
      });
    }
    res.json(orders);
  });
};
