//works

const Wishlist = require("../models/wishlist");
// create product
exports.addWishlistPlant = (req, res) => {
  const { plantId } = req.body;
  const userId=req.params.userId;
  // Validate user and product IDs

  Wishlist.findOne({ user: userId, "product._id": plantId })
  .then((wishlist) => {
    if (!wishlist) {
      // If the product doesn't exist, add it
      return Wishlist.findOneAndUpdate(
        { user: userId },
        {
          $push: {
            product: {
              _id: plantId,
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
    console.log(wishlistPlant);
    if (!wishlistPlant) {
      return res.status(404).json({ error: 'Product not found in wishlist 1' });
    }

    // Extract the specific product from the array
    const product = wishlistPlant.product.find((item) => item._id.toString() === productId);

    if (!product) {
      return res.status(404).json({ error: 'Product not found in wishlist 2' });
    }

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
    const wishlistPlant = await Wishlist.findOne({
      user: userId,
    });
    if (!wishlistPlant) {
      return res.status(404).json({ error: 'Product not found in wishlist 1' });
    }
    res.json(wishlistPlant);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.removewishlistPlant = (req, res) => {
  const userId = req.params.userId;
  const wishlistPlantId = req.params.wishlistPlantId;
  // Using Mongoose to update the document
  Wishlist.findOneAndUpdate(
    { user: userId },
    { $pull: { product: { _id: wishlistPlantId } } },
    { new: true }
  )
    .then((favourites) => {
      if (!favourites) {
        return res.status(404).json({
          error: 'Favourites not found for the user',
        });
      }
      res.json(favourites);
    })
    .catch((err) => {
      res.status(400).json({
        error: 'Error adding favorite product',
      });
    });

};