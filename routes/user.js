const express = require("express");
const router = express.Router();

const {
  getUserById,
  getUser,
  updateUser,
  userPurchaseList,
} = require("../controller/user");
const { isSignedIn, isAuthenticated } = require("../controller/auth");

router.param("userId", getUserById);

router.get("/user/:userId", 
isSignedIn, 
// isAuthenticated, 
getUser);
router.put("/user/:userId", 
isSignedIn, 
// isAuthenticated, 
updateUser);

// router.get(
//   "/orders/user/:userId",
//   isSignedIn,
//   isAuthenticated,
//   userPurchaseList
// );

module.exports = router;
