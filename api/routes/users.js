// /api/users
const express = require('express');
const router = express.Router();
const User = require("../models/User"); //using the name to import the schema
const CryptoJS = require("crypto-js");
const verify  = require("../verifyToken");


// update user //jwt authentication needed
router.put("/:id", verify , async(req, res)=>{
    //In this first line, 'body' changed to 'user' because we are using jwt authentication
    if(req.user.id=== req.params.id || req.user.isAdmin){ //To be sure it is the same user or an Admin
        if(req.body.password) { // If user tries to update password by sending the password field
            try {
                // This line updates it
                req.body.password = CryptoJS.AES.encrypt(req.body.password, process.env.SECRET_PHRASE).toString() //Encrypt
            } catch(err) {
                return res.status(500).json(err)
            }
        }
        // updating the actual user body
        try{
            const updatedUser = await User.findByIdAndUpdate(req.params.id, {$set: req.body, }, {new: true})
            res.status(200).json(updatedUser)
        } catch(err) {
            return res.status(500).json(err)
        }
    } else {
        return res.status(403).json("You can update only your account!");
    }
})


// delete user  //jwt authentication needed
router.delete("/:id", verify , async(req, res)=>{
    //In this first line, 'body' changed to 'user' because we are using jwt authentication
    if(req.user.id=== req.params.id || req.user.isAdmin){ //To be sure it is the same user or an Admin
        // updating the actual user body
        try{
            const user = await User.findByIdAndDelete(req.params.id)
            res.status(200).json("User has been deleted.....")
        } catch(err) {
            return res.status(500).json(err)
        }
    } else {
        return res.status(403).json("You can delete only your account!");
    }
})


// get a user by id 
router.get('/find/:id', async (req, res)=> {
    if(req.params.id) {
        try{
            const user = await User.findById(req.params.id)
            const {password, updatedAt, ...others} = user._doc
            res.status(200).json(others)
        } catch(err) {
            return res.status(500).json(err)
        }
    } else {
        return res.status(403).json("User not found")
    }
})


// get all users  //jwt authentication needed
router.get("/", verify , async(req, res)=>{ // "?new=true"   //query example
    const query = req.query.new; //for when we send a query in the url //this query is used only to fetch the last 10 new users
    if(req.user.isAdmin){ //To be sure it is an Admin
        // updating the actual user body
        try{
            // User.find() finds all users if we dont give it a query or limit
            const users = query ? await User.find().sort({_id:-1}).limit(5) : await User.find() //if there is query
            res.status(200).json(users)
        } catch(err) {
            return res.status(500).json(err)
        }
    } else {
        return res.status(403).json("You are not allowed to see all users!");
    }
})


// get user stats - Total users per month
router.get("/stats", async(req, res)=>{
    const today = new Date();
    const lastYear = today.setFullYear(today.setFullYear() - 1); //to get last year

    const monthsArray = []

    try {
        const data = await User.aggregate([
            {
                $project:{
                    month: {$month: "$createdAt"},
                },
            }, {
                $group: {
                    _id: "$month",
                    total: {$sum:1},
                },
            },
        ])
        res.status(200).json(data);
      } catch (err) {
        res.status(500).json(err);
      }
    
})










module.exports = router;

