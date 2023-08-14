// /api/lists
const express = require('express');
const router = express.Router();
const List = require("../models/List"); //using the name to import the schema
const verify  = require("../verifyToken");


// Create list //jwt authentication needed
router.post("/", verify , async(req, res)=>{
    //In this first line, 'body' changed to 'user' because we are using jwt authentication
    if(req.user.isAdmin){ //To be sure it is  an Admin
        const newList = new List(req.body);
        // save the created movie
        try{
            const savedList = await newList.save()
            res.status(201).json(savedList)
        }catch(err){
            res.status(500).json(err)
        }
    } else {
        return res.status(403).json("You are not allowed!");
    }
})

// Delete
router.delete("/:id", verify , async(req, res)=>{
    //In this first line, 'body' changed to 'user' because we are using jwt authentication
    if(req.user.isAdmin){ //To be sure it is  an Admin
        try{

            await List.findByIdAndDelete(req.params.id)
            res.status(200).json("The list has been deleted")
        }catch(err){
            res.status(500).json(err)
        }
    } else {
        return res.status(403).json("You are not allowed!");
    }
})

// Get //?type=movie&genre=action
router.get("/", verify , async(req, res)=>{
    const typeQuery = req.query.type ;
    const genreQuery = req.query.genre ;
    let list = []; //Empty list

    try{
        if (typeQuery){
            if (genreQuery) {
                list = await List.aggregate([
                    { $match: { type: typeQuery, genre: genreQuery } },
                    { $sample: { size: 10 } },
                ])
            } else{
                list = await List.aggregate([
                    { $match: { type: typeQuery } },
                    { $sample: { size: 10 } },
                ])
            }
        }else{
            list = await List.aggregate([{ $sample: { size:10 } } ]); //Just get random 10 of any type selected
        }
        res.status(200).json(list)
    }catch(err){
        res.status(500).json(err)
    }
})




module.exports = router;

