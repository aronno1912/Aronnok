//works

const Wishlist = require("../models/wishlist");
const Product = require('../models/product');
// create product
exports.addWishlistPlant = (req, res) => {
  const { plantId } = req.body;
  const userId = req.params.userId;
  // Validate user and product IDs

  Wishlist.findOne({ user: userId, "product.product": plantId })
    .then((wishlist) => {
      if (!wishlist) {
        // If the product doesn't exist, add it
        return Wishlist.findOneAndUpdate(
          { user: userId },
          {
            $push: {
              product: {
                product: plantId,
                addedAt: new Date(),
              },
            },
          },
          { upsert: true, new: true }
        );
      } else {
        // If the product already exists, return the existing favourite
        return wishlist;
      }
    })
    .then((wishlist) => {
      res.json(wishlist);
    })
    .catch((err) => {
      res.status(400).json({
        error: 'Error adding favorite product',
      });
    });

};

exports.getwishlistPlant = async (req, res) => {
  try {
    const userId = req.params.userId;
    const productId = req.params.wishlistPlantId;
    // Find the user's favourites with the specified product
    const wishlistPlant = await Wishlist.findOne({
      user: userId,
      // 'product.product._id': productId,
    });
    
    // console.log(wishlistPlant);
    if (!wishlistPlant) {
      return res.status(404).json({ error: 'Product not found in wishlist 1' });
    }

    // Extract the specific product from the array
    var product = wishlistPlant.product.find((item) => {
      // console.log(item);
      return item.product.toString() === productId;
    });

    if (!product) {
      return res.status(404).json({ error: 'Product not found in wishlist 2' });
    }
    const productDetails = await Product.findById(product.product);
    product = {
      ...product.toObject(), // Convert Mongoose document to plain JavaScript object
      productName: productDetails.name,
      productPrice: productDetails.price,
      productPhoto: productDetails.photo,
    };
    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getAllwishlistPlants = async (req, res) => {
  try {
    const userId = req.params.userId;
    // Find the user's favourites with the specified product
    var wishlistPlant = await Wishlist.findOne({
      user: userId,
    });
    if (!wishlistPlant) {
      return res.status(404).json({ error: 'Product not found in wishlist 1' });
    }
    const updatedProducts = await Promise.all(wishlistPlant.product.map(async (item) => {
      // console.log(item.product);
      const productDetails = await Product.findById(item.product);

          if (productDetails) {
              return {
                  ...item.toObject(),
                  productName: productDetails.name,
                  productPrice: productDetails.price,
                  productPhoto:productDetails.photo,
              };
          }

          return item;
      }));
      wishlistPlant = {
        ...wishlistPlant.toObject(), // Convert Mongoose document to plain JavaScript object
        product: updatedProducts,
      };
    res.json(wishlistPlant);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.removewishlistPlant = (req, res) => {
  const userId = req.params.userId;
  const wishlistPlantId = req.params.wishlistPlantId;
  console.log(userId)
  console.log(wishlistPlantId)
  // Using Mongoose to update the document
  Wishlist.findOneAndUpdate(
    { user: userId },
    { $pull: { product: { product: wishlistPlantId } } },
    { new: true }
  )
    .then((wishlist) => {
      if (!wishlist) {
        return res.status(404).json({
          error: 'Wishlist not found for the user',
        });
      }
      res.json(wishlist);
    })
    .catch((err) => {
      res.status(400).json({
        error: 'Error adding wishlist product',
      });
    });

};