const Category = require("../models/category");
const formidable = require("formidable");
const { check, validationResult } = require("express-validator");
const _ = require("lodash");
const fs = require("fs");
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