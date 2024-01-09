const express = require("express");
const router = express.Router();
// const User = require('../models/user.js');
const { check, validationResult,oneOf } = require("express-validator");
const { signup,signin,signout } = require("../controller/auth");
// const bcrypt = require('bcrypt');
router.post('/signup',
    [
        check("username", "username should be at least 3 char").isLength({ min: 3 }),
        check("email", "email is required").isEmail(),
        check("password", "password should be at least 3 char").isLength({
            min: 3,
        }),
    ],
    signup);

// Signin route
router.post(
    "/signin",
    [
        // check("username","Username is required").exists(),
        oneOf([
            check("username","Username or email is required").exists(),
            check("email").exists().isEmail(),
        ], "Username or email is required"),
        check("password", "password field is required").isLength({ min: 1 }),
    ],
    signin
);

// signout route
router.get("/signout", signout);

module.exports = router;

