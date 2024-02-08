//works
const { google } = require('googleapis');
const apikeys = require('../aronnok-66e5b11f8e7a.json');
const SCOPE = ['https://www.googleapis.com/auth/drive'];

const Product = require("../models/product");
const Category = require("../models/category");
const User = require('../models/user');
const Cart = require('../models/cart');
const Favourites = require('../models/favourites');
const Order = require('../models/order');
const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");
const { check, validationResult } = require("express-validator");

const Multer = require('multer');

const multer = Multer({
  storage: Multer.diskStorage({
    destination: function (req, file, callback) {
      let uploadDir = ''; // Initialize upload directory

      // Check if req.body contains an upload directory
      if (req.body.uploadDir) {
        uploadDir = req.body.uploadDir;
      } else {
        // If no upload directory is specified, use a default directory
        uploadDir = 'C:/Users/HP/Pictures/Saved Pictures';
      }

      // Set the destination path
      callback(null, uploadDir);
    },
    filename: function (req, file, callback) {
      callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
    },
  }),
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

const authenticateGoogle = () => {
  const auth = new google.auth.GoogleAuth({
    keyFile: `${__dirname}/aronnok-66e5b11f8e7a.json`,
    scopes: "https://www.googleapis.com/auth/drive",
  });
  return auth;
};

const uploadToGoogleDrive = async (file, auth) => {
  const fileMetadata = {
    name: file.originalname,
    parents: ["1pC3rLbP4Q1mrn8vCAAKvNX5Ck3Q0t6aj"], // Change it according to your desired parent folder id
  };

  const media = {
    mimeType: file.mimetype,
    body: fs.createReadStream(file.path),
  };

  const driveService = google.drive({ version: "v3", auth });

  const response = await driveService.files.create({
    requestBody: fileMetadata,
    media: media,
    fields: "id",
  });
  return response;
};

const deleteFile = (filePath) => {
  fs.unlink(filePath, () => {
    console.log("file deleted");
  });
};

exports.getProductById = (req, res, next, id) => {
  Product.findById(id)
    .exec()
    .then((product) => {
      if (!product) {
        return res.status(400).json({
          error: "Product not found",
        });
      }
      req.product = product;
      // pass control to the next middleware or route handler in the sequence
      next();
    })
    .catch((err) => {
      // Handle errors here
      console.error(err);
      res.status(500).json({
        error: "Internal Server Error",
      });
    });
};
exports.imageHelper = multer.single("file"), async (req, res, next) => {
  try {
    console.log("nope");
    if (!req.file) {
      res.status(400).send("No file uploaded.");
      return;
    }
    console.log("atleast");
    const auth = authenticateGoogle();
    const response = await uploadToGoogleDrive(req.file, auth);
    // deleteFile(req.file.path);
    res.status(200).json({ response });
  } catch (err) {
    console.log(err);
}
};
// create product
exports.addPlant = async (req, res, next) => {
  // console.log(req.body)
  const errors = validationResult(req);
  // console.log("hi");
  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg
    });
  }
  try {
    //destructure the fields
    const { name, description, price, category, stock } = req.body;
    // console.log(name);
    if (!name || !description || !price || !category || !stock) {
      return res.status(400).json({
        error: "Please include all fields",
      });
    }

    const existingPlant = await Product.findOne({ name });

    if (existingPlant) {
      return res.status(400).json({
        error: 'Category already exists, please choose a different one'
      });
    }
    let plant = new Product(req.body);
    const catg = await Category.findOne({ "name": req.body.category });
    console.log("vallage na")
    console.log(plant);
    plant.category = catg._id;
    plant.photo = '/default.png';
    
    await plant.save();
    res.status(201).json({ message: 'Plant added successfully!' });
  }
  catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Saving plant in DB failed' });
  }
};

// get single product
exports.getProduct = (req, res) => {
  // req.product.photo = undefined;
  return res.json(req.product);
};

// middleware
exports.photo = (req, res, next) => {
  if (req.product.photo.data) {
    res.set("Content-Type", req.product.photo.contentType);
    return res.send(req.product.photo.data);
  }
  next();
};

// delete product
exports.deleteProduct = (req, res) => {
  const id = req.product._id;

  Product.deleteOne({ _id: id })
    .then(result => {
      if (result.deletedCount === 0) {
        return res.status(404).json({
          error: `Failed to delete ${req.product.name} product`,
        });
      }
      res.json({
        message: "Successfully deleted"
      });
    })
    .catch(err => {
      return res.status(400).json({
        error: "Failed to delete this plant"
      });
    });
};

// update product
exports.updateProduct = async (req, res) => {
  try {
    const plant = await Product.findByIdAndUpdate(
      { _id: req.product._id },
      { $set: req.body },
      { new: true, useFindAndModify: false }
    );

    if (!plant) {
      return res.status(400).json({
        error: "Failed to update plant"
      });
    }
    res.json(plant);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Internal Server Error"
    });
  }
};

// listing products
exports.getAllProducts = (req, res) => {
  // let limit = req.query.limit ? parseInt(req.query.limit) : 9;
  let sortBy = req.query.sort ? req.query.sort : "_id";
  Product.find()
    .populate("category")
    .sort([[sortBy, "asc"]])
    // .limit(limit)
    .exec()
    .then((products) => {
      if (!products) {
        return res.status(400).json({
          error: "No products found",
        });
      }
      res.json(products);
    })
    .catch((err) => {
      // Handle errors here
      console.error(err);
      res.status(500).json({
        error: "Internal Server Error",
      });
    });
};


exports.getNewArrivals = (req, res) => {
  console.log();
  let limit = req.query.limit ? parseInt(req.query.limit) : 8;
  let sortBy = req.query.sort ? req.query.sort : "_id";
  Product.find()
    .populate("category")
    .sort([[sortBy, "desc"]])
    .limit(limit)
    .exec()
    .then((products) => {
      if (!products) {
        return res.status(400).json({
          error: "No products found",
        });
      }
      res.json(products);
    })
    .catch((err) => {
      // Handle errors here
      console.error(err);
      res.status(500).json({
        error: "Internal Server Error",
      });
    });
};

// exports.getAllUniqueCategories = (req, res) => {
//   Product.distinct("category", {}, (err, category) => {
//     if (err) {
//       return res.status(400).json({
//         error: "No category found",
//       });
//     }
//     res.json(category);
//   });
// };

// update stock middleware
exports.updateStock = (req, res, next) => {
  // console.log("hi2");
  let myOperations = req.body.products.map((prod) => {
    // console.log(prod.quantity);
    return {
      updateOne: {
        filter: { product: prod._id },
        update: {
          $inc: { stock: -prod.quantity, sold: +prod.quantity }, $max: {
            stock: 0, // Ensures stock doesn't go below 0
          },
        },
      },
    };
  });

  Product.bulkWrite(myOperations, {})
    .then(() => {
      // Check if there are products with stock greater than 0
      const hasStock = req.body.products.some((prod) => prod.quantity > 0);

      // Call next only if there are products with stock greater than 0
      if (hasStock) {
        next();
      } else {
        return res.status(400).json({
          error: "All products are out of stock",
        });
      }
    })
    .catch((err) => {
      // Handle the error
      return res.status(400).json({
        error: "Bulk operation failed",
      });
    });
};

exports.search = async (req, res, next) => {
  try {
    const searchTerm = req.query.q;
    const products = await Product.find({ tags: { $regex: searchTerm, $options: 'i' } });
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.recommendations = async (req, res, next) => {
  try {
    const userId = req.params.userId;

    // Fetch user data
    const user = await User.findById(userId);

    // Fetch user's cart items
    const cartItems = await Cart.findOne({ user: userId });

    // Fetch user's favorite products
    const favouriteProducts = await Favourites.find({ user: userId });

    // Fetch user's order history
    const orderHistory = await Order.find({ user: userId });

    // Extract product IDs from various sources
    const cartProductIds = cartItems ? cartItems.items.map(item => item.product._id) : [];
    const favoriteProductIds = favouriteProducts ? favouriteProducts.map(favorite => favorite.product._id) : [];
    const orderProductIds = orderHistory ? orderHistory.map(order => order.products.map(item => item.product._id)).flat() : [];

    // Combine all product IDs and remove duplicates
    const allProductIds = [...new Set([...cartProductIds, ...favoriteProductIds, ...orderProductIds])];

    // Fetch product details based on combined product IDs
    let recommendedProducts = await Product.find({ _id: { $in: allProductIds } });
    recommendedProducts = recommendedProducts.sort(() => Math.random() - 0.5);
    if (recommendedProducts.length < 5) {
      next();
    } else
      return res.json(recommendedProducts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.trending = async (req, res) => {
  try {
    let trendingProducts = await Order.aggregate([
      { $unwind: '$products' }, // Split the array of products into separate documents
      {
        $group: {
          _id: '$products.product', // Group by the product
          count: { $sum: '$products.quantity' }, // Count occurrences of each product
        },
      },
      { $lookup: { from: 'products', localField: '_id', foreignField: '_id', as: 'productDetails' } },
      { $unwind: '$productDetails' }, // Unwind the productDetails array
      {
        $project: {
          _id: '$productDetails._id',
          name: '$productDetails.name',
          description: '$productDetails.description',
          price: '$productDetails.price',
          category: '$productDetails.category',
          stock: '$productDetails.stock',
          sold: '$productDetails.sold',
          rating: '$productDetails.rating',
          photo: '$productDetails.photo',
          tags: '$productDetails.tags',
          createdAt: '$productDetails.createdAt',
          updatedAt: '$productDetails.updatedAt',
        },
      },
      { $sort: { count: -1 } }, // Sort in descending order based on count
      { $limit: 10 }, // Take only the top 10
    ]);
    trendingProducts = trendingProducts.sort(() => Math.random() - 0.5);
    res.json(trendingProducts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }

};

exports.category_stock = async (req, res) => {
  try {
    let limit = req.query.limit ? parseInt(req.query.limit) : 9;
    let sortBy = req.query.sort ? req.query.sort : "_id";

    const products = await Product.find()
      .populate("category")
      .sort([[sortBy, "asc"]])
      .limit(limit)
      .exec();

    if (!products || products.length === 0) {
      return res.status(400).json({
        error: "No products found",
      });
    }

    var categorySums = [];

    // Iterate through each product using for...of loop
    for (const product of products) {
      // Fetch the category document to get its name
      const category = await Category.findById(product.category);

      // Find the index of the category in categorySums array
      const index = categorySums.findIndex(item => item.name === category.name);

      // If category not found, add a new object to categorySums
      if (index === -1) {
        categorySums.push({ name: category.name, amount: product.stock });
      } else {
        // If category found, increment the amount
        categorySums[index].amount += product.stock;
      }
    }

    // Now, categorySums is populated correctly
    // console.log(categorySums);

    res.json(categorySums);
  } catch (err) {
    // Handle errors here
    console.error(err);
    res.status(500).json({
      error: "Internal Server Error",
    });
  }
};
