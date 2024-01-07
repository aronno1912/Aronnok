const express = require("express");
const router = express.Router();
const User = require('../models/user.js'); 
// const bcrypt = require('bcrypt');
router.post('/user', async (request, response) => {//new endpoint /user, Any POST request to the /user URL will be handled by this router
      
      try {
        const user = new User({
          firstname : request.body.firstname,
          lastname : request.body.lastname,
          username : request.body.username,
          dob : request.body.dob,
          religion : request.body.religion,
          mobile:request.body.mobile,
          present_addr:request.body.present_addr,
          password : request.body.password,
          email : request.body.email
       });
        await user.save();
    
        // You may want to handle the response or redirect to a login page
        res.status(201).json({ message: 'User signed up successfully!' });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
});
module.exports = router;

