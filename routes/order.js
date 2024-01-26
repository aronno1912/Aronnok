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
    // getOrderStatus,
    updateStatus,
    //for admin purpose
    getReceivedOrders,
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

// for user to see all his active or previous orders
router.get(
    "/order/all",
    //   isSignedIn,
    //   isAuthenticated,
    //   isAdmin,
    getAllOrders
);

// // status of order, for user
// router.get(
//     "/order/status/:userId",
//     //   isSignedIn,
//     //   isAuthenticated,
//     //   isAdmin,
//     getOrderStatus
// );


//update order status from admin/user side, both can update using the same api, like a product has gone from processing to shipped
router.put(
    "/order/:userId/:orderId",
    //   isSignedIn,
    //   isAuthenticated,
    //   isAdmin,
    updateStatus
);
//get all the received orders for any user, admin perspective
router.get(
    "/order/history",
    //   isSignedIn,
    //   isAuthenticated,
    //   isAdmin,
    getReceivedOrders
);
// // list all orders for admin to see in Manage Orders section
// router.get("/orders", listAllOrders);

module.exports = router;
