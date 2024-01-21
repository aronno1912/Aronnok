
const Product = require("../models/product");
const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");
const { check, validationResult } = require("express-validator");
exports.getProductById = (req, res, next, id) => {
  Product.findById(id)
    .populate("category")
    .exec((err, product) => {
      if (err) {
        return res.status(400).json({
          error: "Product not found",
        });
      }
      req.product = product;
      next();
    });
};
exports.imageHelper=(req, res,next) => {
  const fs = require('fs');

  // Read the image file
  const imagePath = './public/client/assets/jungleplant2-drc.png';  // Replace with the actual path to your image file
  const imageData = fs.readFileSync(imagePath);
  
  // Convert the image data to Base64 encoding
  const base64Image = imageData.toString('base64');
  
  req.imageData=base64Image;
  next();
  console.log("did it");
};
// create product
exports.addPlant = async (req, res,next) => {
  
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
  const errors = validationResult(req);
  console.log("hi");
    if (!errors.isEmpty()) {
        return res.status(422).json({
            error: errors.array()[0].msg
        });
    }
    try {
      //destructure the fields
      const { name, description, price, category, stock } = req.body;
      console.log(name);
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
      console.log('before');
      req.body.photo = {
        data: req.imageData,
        contentType: 'image/png', // Replace with the actual content type of your image
      };
      console.log('after');
      let plant = new Product(req.body);
      // console.log(product);
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
  req.product.photo = undefined;
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

// // delete product
// exports.deleteProduct = (req, res) => {
//   let product = req.product;
//   product.remove((err, deletedProduct) => {
//     if (err) {
//       return res.status(400).json({
//         error: `Failed to delete ${req.product.name} product`,
//       });
//     }
//     res.json({
//       message: "Deleted successfully",
//       deletedProduct,
//     });
//   });
// };

// // update product
// exports.updateProduct = (req, res) => {
//   let form = new formidable.IncomingForm();
//   form.keepExtensions = true;

//   form.parse(req, (err, fields, file) => {
//     if (err) {
//       return res.status(400).json({
//         error: "problem with image",
//       });
//     }

//     // updation code
//     let product = req.product;
//     product = _.extend(product, fields);

//     //handle file here
//     if (file.photo) {
//       if (file.photo.size > 3000000) {
//         return res.status(400).json({
//           error: "File size too big!",
//         });
//       }
//       product.photo.data = fs.readFileSync(file.photo.path);
//       product.photo.contentType = file.photo.type;
//     }
//     // console.log(product);

//     //save to the DB
//     product.save((err, product) => {
//       if (err) {
//         res.status(400).json({
//           error: "Updation of product failed",
//         });
//       }
//       res.json(product);
//     });
//   });
// };

// // listing products
// exports.getAllProducts = (req, res) => {
//   let limit = req.query.limit ? parseInt(req.query.limit) : 9;
//   let sortBy = req.query.sort ? req.query.sort : "_id";

//   Product.find()
//     .select("-photo")
//     .populate("category")
//     .sort([[sortBy, "asc"]])
//     .limit(limit)
//     .exec((err, products) => {
//       if (err) {
//         return res.status(400).json({
//           error: "No products found",
//         });
//       }
//       res.json(products);
//     });
// };

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

// // update stock middleware
// exports.updateStock = (req, res, next) => {
//   let myOperations = req.body.order.products.map((prod) => {
//     return {
//       updateOne: {
//         filter: { _id: prod._id },
//         update: { $inc: { stock: -prod.count, sold: +prod.count } },
//       },
//     };
//   });

//   Product.bulkWrite(myOperations, {}, (err, products) => {
//     if (err) {
//       return res.status(400).json({
//         error: "Bulk operation failed",
//       });
//     }
//     next();
//   });
// };
