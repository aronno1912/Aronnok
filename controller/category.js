//works
const Category = require("../models/category");
const formidable = require("formidable");
const { check, validationResult } = require("express-validator");
const _ = require("lodash");
const fs = require("fs");

exports.getCategoryById = (req, res, next, id) => {

  Category.findById(id)
  .exec()
  .then((category) => {
    if (!category) {
      return res.status(400).json({
        error: "Category not found in DB",
      });
    }
    req.category = category;
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
// create product
exports.addCategory = async (req, res) => {
    const errors = validationResult(req);
    // console.log("after");
    if (!errors.isEmpty()) {
        return res.status(422).json({
            error: errors.array()[0].msg
        });
    }
    try {
      //destructure the fields
      const { name } = req.body;
  
      if (!name) {
        return res.status(400).json({
          error: "Please include all fields",
        });
      }
      const existingCat = await Category.findOne({ name });

        if (existingCat) {
            return res.status(400).json({
                error: 'Category already exists, please choose a different one'
            });
        }
      let category = new Category(req.body);
      // console.log(product);
        await category.save();
        res.status(201).json({ message: 'Category added successfully!' });
    }
    catch (error) {
        console.error(error);
        res.status(400).json({ error: 'Saving plant in DB failed' });
    }
};

exports.getCategory = (req, res) => {
  return res.json(req.category);
};

exports.getAllCategory = (req, res) => {
  Category.find()
  .exec()
  .then((categories) => {
    if (!categories) {
      return res.status(400).json({
        error: "NO categories found",
      });
    }
    res.json(categories);
  })
  .catch((err) => {
    // Handle errors here
    console.error(err);
    res.status(500).json({
      error: "Internal Server Error",
    });
  });
};

exports.updateCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndUpdate(
      { _id: req.category._id },
      { $set: req.body },
      { new: true, useFindAndModify: false }
    );

    if (!category) {
      return res.status(400).json({
        error: "Failed to update category"
      });
    }
    res.json(category);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Internal Server Error"
    });
  }
};

exports.removeCategory = (req, res) => {
  const id = req.category._id;

  Category.deleteOne({ _id: id })
  .then(result => {
    if (result.deletedCount === 0) {
      return res.status(404).json({
        error: "Category not found in DB"
      });
    }
    res.json({
      message: "Successfully deleted"
    });
  })
  .catch(err => {
    return res.status(400).json({
      error: "Failed to delete this category"
    });
  });

};