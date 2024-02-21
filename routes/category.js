const express = require("express");
const router = express.Router();
const {
    getCategoryById,
    addCategory,
    getCategory,
    getAllCategory,
    updateCategory,
    removeCategory,
} = require("../controller/category");
const { isSignedIn, isAuthenticated, isAdmin } = require("../controller/auth");
const { getUserById } = require("../controller/user");
//all of params
router.param("userId", getUserById);
router.param("categoryId", getCategoryById);

router.post(
    "/category/create/:userId",
    // isSignedIn,
    // isAuthenticated,
    isAdmin,
    addCategory
);

router.get("/category/:categoryId", getCategory);
router.get("/categories", getAllCategory);
//update
router.put(
    "/category/:categoryId/:userId",
    // isSignedIn,
    // isAuthenticated,
    isAdmin,
    updateCategory
);

//delete

router.delete(
    "/category/:categoryId/:userId",
    // isSignedIn,
    // isAuthenticated,
    isAdmin,
    removeCategory
);

module.exports = router;