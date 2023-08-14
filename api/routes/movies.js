// /api/movies
const express = require('express');
const router = express.Router();
const Movie = require("../models/Movie"); //using the name to import the schema
const verify  = require("../verifyToken");


// Create new movie //jwt authentication needed
router.post("/", verify , async(req, res)=>{
    //In this first line, 'body' changed to 'user' because we are using jwt authentication
    if(req.user.isAdmin){ //To be sure it is  an Admin
        //create the movie using the Movie model
        const newMovie = new Movie(req.body);

        // save the created movie
        try{
            const savedMovie = await newMovie.save()
            res.status(201).json(savedMovie)
        }catch(err){
            res.status(500).json(err)
        }
    } else {
        return res.status(403).json("You are not allowed!");
    }
})

// update movie //jwt authentication needed
router.put("/:id", verify , async(req, res)=>{
    //In this first line, 'body' changed to 'user' because we are using jwt authentication
    if(req.user.isAdmin){ //To be sure it is  an Admin
        try{
            const updatedMovie = await Movie.findByIdAndUpdate(req.params.id , {$set: req.body, }, {new: true})
            res.status(200).json(updatedMovie)
        }catch(err){
            res.status(500).json(err)
        }
    } else {
        return res.status(403).json("You are not allowed!");
    }
})


// delete movie  //jwt authentication needed
router.delete("/:id", verify , async(req, res)=>{
    //In this first line, 'body' changed to 'user' because we are using jwt authentication
    if(req.user.isAdmin){ //To be sure it is  an Admin
        try{
            const movie = await Movie.findByIdAndDelete(req.params.id)
            res.status(200).json("The movie has been deleted.......")
        }catch(err){
            res.status(500).json(err)
        }
    } else {
        return res.status(403).json("You are not allowed!");
    }
})


// get a movie by id // only verified authenticated user needed, no need to be an admin
router.get("/find/:id", verify , async(req, res)=>{
    //In this first line, 'body' changed to 'user' because we are using jwt authentication
        try{
            const movie = await Movie.findById(req.params.id)
            res.status(200).json(movie)
        }catch(err){
            res.status(500).json(err)
        }
})

// get featured movie(random movie) by id 
router.get("/random", verify , async(req, res)=>{
    const type = req.query.type // '?type=series' //for when we send a query in the url
    let movie; //empty variable
    try{ //series or movie
        if (type === "series"){
            movie = await Movie.aggregate([
                { $match: { isSeries: true } },
                { $sample: { size:1 } },
            ]);
        } else {
            movie = await Movie.aggregate([
                { $match: { isSeries: false } },
                { $sample: { size:1 } },
            ]);
        }
        res.status(200).json(movie);
    }catch(err){
        res.status(500).json(err)
    }
})

// get all movies  //jwt authentication needed
router.get("/", verify , async(req, res)=>{
    // const query = req.query.new; //this query is used only to fetch the last 10 new movies
    if(req.user.isAdmin){ //To be sure it is  an Admin
        try{
            const movies = await Movie.find()
            res.status(200).json(movies.reverse())
        }catch(err){
            res.status(500).json(err)
        }
    } else {
        return res.status(403).json("You are not allowed!");
    }
})



module.exports = router;

