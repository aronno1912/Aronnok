const express = require("express");
const router = express.Router();
const {
    // getwishlistPlantsById,
    addwishlistPlant,
    getwishlistPlant,
    getAllwishlistPlants,
    removewishlistPlant,
} = require("../controller/wishlist");
const { isSignedIn, isAuthenticated, isAdmin } = require("../controller/auth");
const { getUserById } = require("../controller/user");
// router.post(
//     "/wishlist/create/:userId",
//     isSignedIn,
//     // isAuthenticated,
//     // isAdmin,
//     addwishlistPlant
// );

// router.get("/wishlist/:userId/:wishlistPlantId", getwishlistPlant);
// router.get("/wishlist/:userId", getAllwishlistPlants);

// //delete

// router.delete(
//     "/wishlist/:userId/:wishlistPlantId",
//     isSignedIn,
//     // isAuthenticated,
//     // isAdmin,
//     removewishlistPlant
// );

module.exports = router;