const express = require("express");
const router = express.Router();

const {
  getUserById,
  getUser,
  updateUser,
  userPurchaseList,
  getAllUser,
  userInfoForAdmin,
} = require("../controller/user");
const { isSignedIn, isAuthenticated } = require("../controller/auth");

router.param("userId", getUserById);

router.get("/user/:userId", 
// isSignedIn, 
// isAuthenticated, 
getUser);

router.get("/getAllUser", getAllUser);

router.put("/user/:userId", 
// isSignedIn, 
// isAuthenticated, 
updateUser);

// router.get(
//   "/orders/user/:userId",
//   isSignedIn,
//   isAuthenticated,
//   userPurchaseList
// );
router.get("/userinfoforadmin/:userId", userInfoForAdmin);
module.exports = router;
