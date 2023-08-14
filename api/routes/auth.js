// /api/auth
const express = require('express');
const router = express.Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

// Register //Handling the post request
router.post('/register', async (req, res)=>{

    try{
        // Create new user
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: CryptoJS.AES.encrypt(req.body.password, process.env.SECRET_PHRASE).toString() //Encrypt
            ,
        });

        // save user and respond with a response (res)
        const user = await newUser.save(); //.save() returns the full details of the user //returns a promise
        res.status(200).json(user)
    } catch(err) {
        res.status(500).json(err)
    }
});

// Had to use if statements to make this endpoint work properly and not &&
router.post("/login", async (req, res) => {
    try {
      const user = await User.findOne({ email: req.body.email }); // Filtering the Users collection for the user
      
      if (!user) {
        return res.status(404).json("User not found");
      }

      const bytes  = CryptoJS.AES.decrypt(user.password, process.env.SECRET_PHRASE); //decrypt
      const originalPassword = bytes.toString(CryptoJS.enc.Utf8);

      if (originalPassword !== req.body.password) {
        return res.status(404).json("Wrong Password");
      }

      // Jwt authentication before having access to the login
      const accessToken = jwt.sign({id: user._id, isAdmin: user.isAdmin}, 
                                    process.env.SECRET_PHRASE,
                                    { expiresIn: "5d"} )

      // Successful login //If all checks above are passed, then we can have a successful login
      const {password, ...others} = user._doc // or .toObject() //destructuting
      res.status(200).json({...others, accessToken}); //Adjusting the 'others' dictionary to include the accessToken, accessToken : accessToken
    } catch (err) {
      res.status(500).json(err);
    }
  });
  





module.exports = router;

