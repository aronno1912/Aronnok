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
  isSignedIn,
  // isAuthenticated,
  isAdmin,
  // imageHelper,
  addPlant
);

// // read routes
router.get("/product/:productId", getProduct);
router.get("/product/photo/:productId", photo);

// delete route
router.delete(
  "/product/:productId/:userId",
  isSignedIn,
  // isAuthenticated,
  isAdmin,
  deleteProduct
);

// update route
router.put(
  "/product/:productId/:userId",
  isSignedIn,
  // isAuthenticated,
  isAdmin,
  updateProduct
);

// listing route
router.get("/products", getAllProducts);

// router.get("/products/categories", getAllUniqueCategories);

module.exports = router;
