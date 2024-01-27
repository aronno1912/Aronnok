const express = require("express");
const router = express.Router();

const {
  getProductById,
  imageHelper,
  addPlant,
  getProduct,
  photo,
  deleteProduct,
  updateProduct,
  getAllProducts,
  search,
  recommendations,
  trending,
  category_stock,
  //   getAllUniqueCategories,
} = require("../controller/product");
const { isSignedIn, isAuthenticated, isAdmin } = require("../controller/auth");
const { getUserById } = require("../controller/user");

//all of params
router.param("userId", getUserById);
router.param("productId", getProductById);

//all of actual routes
// /admin/:userId/addPlant
router.post(
  "/product/create/:userId",
  // isSignedIn,
  // isAuthenticated,
  // isAdmin,
  // imageHelper,
  addPlant
);

// // read routes
router.get("/product/:userId/:productId", getProduct);
router.get("/product/photo/:productId", photo);

// delete route
router.delete(
  "/product/:productId/:userId",
  // isSignedIn,
  // isAuthenticated,
  isAdmin,
  deleteProduct
);

// update route
router.put(
  "/product/:productId/:userId",
  // isSignedIn,
  // isAuthenticated,
  isAdmin,
  updateProduct
);

// listing route for user
router.get("/products/:userId", getAllProducts);

// router.get("/products/categories", getAllUniqueCategories);

// Search route
router.get('/search',
  search,
);
//recommended for you
router.get('/recommend/:userId',
recommendations,
trending,
);
//trending
router.get('/trending',
trending,
);

//get category wise 
router.get('/category_stock',
category_stock,
);

module.exports = router;
