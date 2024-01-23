//works

const Wishlist = require("../models/wishlist");
// create product
exports.addWishlistPlant = (req, res) => {
    const { userId, productId } = req.body;

    // Validate user and product IDs

    Wishlist.findOneAndUpdate(
      { user: userId },
      {
          $push: {
              product: {
                  product: productId,
                  addedAt: new Date(),
              },
          },
      },
      { upsert: true, new: true }
  )
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
    console.log(userId);
    console.log(productId);
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
const productId = req.params.productId;

// Using Mongoose to update the document
Wishlist.findOneAndUpdate(
  { user: userId },
  { $pull: { product: { product: productId } } },
  { new: true },
)
.then((wishlistPlant) => {
  res.json(wishlistPlant);
})
.catch((err) => {
  res.status(400).json({
      error: 'Error adding favorite product',
  });
});

};