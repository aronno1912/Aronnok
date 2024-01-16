const express = require("express");
const router = express.Router();
const {
    addCategory
} = require("../controller/category");
const { isSignedIn, isAuthenticated, isAdmin } = require("../controller/auth");
const { getUserById } = require("../controller/user");
//all of params
router.param("userId", getUserById);
router.post(
    "/category/create/:userId",
    isSignedIn,
    // isAuthenticated,
    isAdmin,
    addCategory
);
module.exports = router;