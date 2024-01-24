const express = require("express");
const router = express.Router();

const { isSignedIn, isAuthenticated, isAdmin } = require("../controller/auth");
const { getUserById } = require("../controller/user");
const { updateStock } = require("../controller/product");

const {
    //for individual user
    getOrderById,
    createOrder,
    getAllOrders,
    getOrderStatus,
    updateStatus,
    //for admin purpose
    listAllOrders,
} = require("../controller/order");

// params, path e userId thaklei 2nd param er sathe associated hoye jabe
router.param("userId", getUserById);
router.param("orderId", getOrderById);

// actual routes

// create
router.post(
    "/order/create/:userId",
    //   isSignedIn,
    //   isAuthenticated,
    //   pushOrderInPurchaseList,
    updateStock,
    createOrder
);

// read
router.get(
    "/order/all/:userid",
    //   isSignedIn,
    //   isAuthenticated,
    //   isAdmin,
    getAllOrders
);

// status of order
router.get(
    "/order/status/:userId",
    //   isSignedIn,
    //   isAuthenticated,
    //   isAdmin,
    getOrderStatus
);

// update order, maybe u want to cancel it, or change the address
router.put(
    "/order/:orderId/status/:userId",
    //   isSignedIn,
    //   isAuthenticated,
    //   isAdmin,
    updateStatus
);

// list all orders for admin to see in Manage Orders section
router.get("/orders", listAllOrders);

module.exports = router;
