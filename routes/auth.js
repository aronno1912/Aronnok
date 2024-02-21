const express = require("express");
const router = express.Router();
const path = require('path');
const cookieParser = require('cookie-parser');
// const User = require('../models/user.js');
const { check, validationResult,oneOf } = require("express-validator");
const { signup,signin,signout } = require("../controller/auth");
let staticPath = path.join(__dirname, '../public/client')
const fileupload = require('express-fileupload')
// Serve static files (including images) from the "public" directory
// router.use(express.static('public'));
router.use(express.static('assets')); // Add this line to serve images
router.use(cookieParser());

//middlewares
router.use(express.static(staticPath))
router.use(express.json())
router.use(fileupload())
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
//login route
router.get('/signin', (req, res) => {
    res.sendFile(path.join(staticPath, "log-in.html"));
    // res.sendFile(path.join(__dirname, '../public/client', 'log-in.html'));
})

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

// // Example of a protected route
// router.get("/protected", isSignedIn, (req, res) => {
//     res.json({
//         message: "This is a protected route!",
//         user: req.auth,
//     });
// });

// // Example of an authenticated route
// router.get("/authenticated", isSignedIn, isAuthenticated, (req, res) => {
//     res.json({
//         message: "This is an authenticated route!",
//         user: req.profile,
//     });
// });

// // Example of an admin route
// router.get("/admin", isSignedIn, isAuthenticated, isAdmin, (req, res) => {
//     res.json({
//         message: "This is an admin route!",
//         user: req.profile,
//     });
// });

module.exports = router;

