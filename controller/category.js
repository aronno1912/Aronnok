const Category = require("../models/category");
const formidable = require("formidable");
const { check, validationResult } = require("express-validator");
const _ = require("lodash");
const fs = require("fs");

exports.getCategoryById = (req, res, next, id) => {
  Category.findById(id).exec((err, category) => {
    if (err) {
      return res.status(400).json({
        error: "Category not found in DB"
      });
    }
    req.category = category;
    next();
  });
};
// create product
exports.addCategory = async (req, res) => {
    const errors = validationResult(req);
    console.log("after");
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
  Category.find().exec((err, categories) => {
    if (err) {
      return res.status(400).json({
        error: "NO categories found"
      });
    }
    res.json(categories);
  });
};

exports.updateCategory = (req, res) => {
  const category = req.category;
  category.name = req.body.name;

  category.save((err, updatedCategory) => {
    if (err) {
      return res.status(400).json({
        error: "Failed to update category"
      });
    }
    res.json(updatedCategory);
  });
};

exports.removeCategory = (req, res) => {
  const category = req.category;

  category.remove((err, category) => {
    if (err) {
      return res.status(400).json({
        error: "Failed to delete this category"
      });
    }
    res.json({
      message: "Successfully deleted"
    });
  });
};