//works

const Favourites = require("../models/favourites");

// create product
exports.addFavourite = (req, res) => {
    const { userId, productId } = req.body;

    // Validate user and product IDs

    Favourites.findOneAndUpdate(
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
  .then((favourite) => {
      res.json(favourite);
  })
  .catch((err) => {
      res.status(400).json({
          error: 'Error adding favorite product',
      });
  });
  
};

exports.getFavourite = async (req, res) => {
  try {
    const userId = req.params.userId;
    const productId = req.params.favouritePlantId;
    console.log(userId);
    console.log(productId);
    // Find the user's favourites with the specified product
    const favourite = await Favourites.findOne({
      user: userId,
      // 'product.product._id': productId,
    });
    console.log(favourite);
    if (!favourite) {
      return res.status(404).json({ error: 'Product not found in favourites 1' });
    }

    // Extract the specific product from the array
    const product = favourite.product.find((item) => item._id.toString() === productId);

    if (!product) {
      return res.status(404).json({ error: 'Product not found in favourites 2' });
    }

    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getAllFavourites = async (req, res) => {
  try {
    const userId = req.params.userId;
    // Find the user's favourites with the specified product
    const favourite = await Favourites.findOne({
      user: userId,
    });
    if (!favourite) {
      return res.status(404).json({ error: 'Product not found in favourites 1' });
    }
    res.json(favourite);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.removeFavourite = (req, res) => {
  const userId = req.params.userId;
const productId = req.params.productId;

// Using Mongoose to update the document
Favourites.findOneAndUpdate(
  { user: userId },
  { $pull: { product: { product: productId } } },
  { new: true },
)
.then((favourite) => {
  res.json(favourite);
})
.catch((err) => {
  res.status(400).json({
      error: 'Error adding favorite product',
  });
});

};