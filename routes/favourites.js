const express = require("express");
const router = express.Router();
const {
    // getFavouritesById,
    addFavourite,
    getFavourite,
    getAllFavourites,
    removeFavourite,
    getIsFavourite,
} = require("../controller/favourites");
const { isSignedIn, isAuthenticated, isAdmin } = require("../controller/auth");
const { getUserById } = require("../controller/user");
//all of params
// router.param("userId", getUserById);
// router.param("favouritePlantId", getFavouritesById);
//userId specifies a specific favourite list for a specific user
//favouritePlantId specifies one specific plant in one specific user's favourites
router.post(
    "/favourites/create/:userId",
    // isSignedIn,
    // isAuthenticated,
    // isAdmin,
    addFavourite
);

router.get("/favourites/:userId/:favouritePlantId", getFavourite);
router.get("/favourites/:userId", getAllFavourites);
router.get("/favourites/:userId/isFavourite/:productId", getIsFavourite);

//delete

router.delete(
    "/favourites/:userId/:favouritePlantId",
    // isSignedIn,
    // isAuthenticated,
    // isAdmin,
    removeFavourite
);

module.exports = router;