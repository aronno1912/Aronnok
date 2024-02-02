//works
// const { google } = require('googleapis');

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

// // Set up Google Drive API client
// const drive = google.drive({
//   version: 'v3',
//   auth: 'AIzaSyBxtC3FcwMHmGDtNltzL6s1Kq9x2VWlvhs',
// });

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
exports.imageHelper = async (req, res, next) => {
  // console.log("jebal")
  // Read the image file
  const imagePath = './public/client/assets/jungleplant2-drc.png';  // Replace with the actual path to your image file
  const imageData = fs.readFileSync(imagePath);

  // Convert the image data to Base64 encoding
  const base64Image = imageData.toString('base64');

  req.imageData = base64Image;
  next();
  // console.log("did it");

  // try {
  //   console.log("ekhane")
  //   // Check if there is a file in the request
  //   if (!req.files.photo || Object.keys(req.files.photo).length === 0) {
  //     console.log('No file uploaded')
  //     return res.status(400).json({ error: 'No file uploaded' });
  //   }
  //   console.log("ashchi")
  //   // Process the uploaded image
  //   const uploadedFile = req.files.photo; // Adjust 'image' based on your form field
  //   const fileName = req.body.photoName; // Adjust the filename as needed
  //   console.log(fileName);
  //   // Upload image to Google Drive
  //   const response = await drive.files.create({
  //     requestBody: {
  //       name: fileName,
  //       parents: ['1-0Nb190JiaLrAejsFBYwqvMrNHe_dSLJ?usp=drive_link'], // Specify the folder ID
  //     },
  //     media: {
  //       mimeType: uploadedFile.mimetype,
  //       body: fs.createReadStream(uploadedFile.data), // Create a readable stream from the file data
  //     },
  //   });

  //   // Log success, store metadata in your database, etc.

  //   res.status(200).json({ message: 'Image uploaded successfully' });
  //   next();
  // } catch (error) {
  //   console.error('Error uploading image:', error);
  //   res.status(500).json({ error: 'Internal Server Error' });
  // }
};
// create product
exports.addPlant = async (req, res, next) => {

  // Now you can use the productEntry object in your MongoDB operation

  //after html
  // let form = new formidable.IncomingForm();
  // form.keepExtensions = true;

  // form.parse(req, (err, fields, file) => {
  //   if (err) {
  //     return res.status(400).json({
  //       error: "problem with image",
  //     });
  //   }
  //   //destructure the fields
  //   const { name, description, price, category, stock } = fields;

  //   if (!name || !description || !price || !category || !stock) {
  //     return res.status(400).json({
  //       error: "Please include all fields",
  //     });
  //   }

  //   let product = new Product(fields);

  //   //handle file here
  //   if (file.photo) {
  //     if (file.photo.size > 3000000) {
  //       return res.status(400).json({
  //         error: "File size too big!",
  //       });
  //     }
  //     product.photo.data = fs.readFileSync(file.photo.path);
  //     product.photo.contentType = file.photo.type;
  //   }
  //   // console.log(product);

  //   //save to the DB
  //   product.save((err, product) => {
  //     if (err) {
  //       res.status(400).json({
  //         error: "Saving plant in DB failed",
  //       });
  //     }
  //     res.json(product);
  //   });
  // });


  //before html
  // console.log("hi");
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

    plant.category = catg._id;
    plant.photo = '/default.png';
    // console.log(plant);
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

  //after html
  // let form = new formidable.IncomingForm();
  // form.keepExtensions = true;

  // form.parse(req, (err, fields, file) => {
  //   if (err) {
  //     return res.status(400).json({
  //       error: "problem with image",
  //     });
  //   }

  //   // updation code
  //   let product = req.product;
  //   product = _.extend(product, fields);

  //   //handle file here
  //   if (file.photo) {
  //     if (file.photo.size > 3000000) {
  //       return res.status(400).json({
  //         error: "File size too big!",
  //       });
  //     }
  //     product.photo.data = fs.readFileSync(file.photo.path);
  //     product.photo.contentType = file.photo.type;
  //   }
  //   // console.log(product);

  //   //save to the DB
  //   product.save((err, product) => {
  //     if (err) {
  //       res.status(400).json({
  //         error: "Updation of product failed",
  //       });
  //     }
  //     res.json(product);
  //   });
  // });

  //before html
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
