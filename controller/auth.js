const User = require("../models/user");
const { check, validationResult } = require("express-validator");
var jwt = require("jsonwebtoken");
var expressJwt = require("express-jwt");

exports.signup = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({
            error: errors.array()[0].msg
        });
    }
    try {
        const user = new User(req.body);
        await user.save();
        res.status(201).json({ message: 'User signed up successfully!' });
        // You may want to handle the response or redirect to a login page

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.signin = (req, res) => {
    const errors = validationResult(req);
    const { username, email, password } = req.body;

    if (!errors.isEmpty()) {
        return res.status(422).json({
            error: errors.array()[0].msg
        });
    }
    User.findOne({ $or: [{ email }, { username }] })
        .then((user) => {
            if (!user.autheticate(password)) {
                return res.status(401).json({
                    error: "Username/email and password do not match"
                });
            }
            return res.status(201).json({ message: 'User signed in successfully!' });
        })
        .catch((error) => {
            //When there are errors We handle them here
            return res.status(400).json({
                error: "User does not exist"
            });
        });
};

exports.signout = (req, res) => {
//   res.clearCookie("token");
  res.json({
    message: "User signout successfully"
  });
};

//protected routes
exports.isSignedIn = (req, res, next) => {
    // Check if the token is present in the request headers
    const token = req.headers.authorization;
  
    if (!token) {
      return res.status(401).json({ error: 'Unauthorized: No token provided' });
    }
  
    // Verify the token
    jwt.verify(token, process.env.SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({ error: 'Unauthorized: Invalid token' });
      }
  
      // Attach the decoded user information to the request object
      req.auth = decoded;
      next();
    });
  };

// //custom middlewares
// exports.isAuthenticated = (req, res, next) => {
//   let checker = req.profile && req.auth && req.profile._id == req.auth._id;
//   if (!checker) {
//     return res.status(403).json({
//       error: "ACCESS DENIED"
//     });
//   }
//   next();
// };

// exports.isAdmin = (req, res, next) => {
//   if (req.profile.role === 0) {
//     return res.status(403).json({
//       error: "You are not ADMIN, Access denied"
//     });
//   }
//   next();
// };