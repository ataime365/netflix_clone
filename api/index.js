const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoute = require('./routes/auth');
const userRoute = require('./routes/users');
const movieRoute = require('./routes/movies')
const listRoute = require('./routes/lists')

const app = express();

dotenv.config(); //Loads .env file contents into `process.env`. 


mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true, useUnifiedTopology: true,})
    .then(()=>{console.log("MongoDB Connected!")})
    .catch((err)=>console.log(err)) ; 

// Initializizng 'body Parser' req.body Middleware
app.use(express.json()); //To make sure we handle json responses properly


app.use('/api/auth', authRoute); // /api/auth == ./routes/auth'
app.use('/api/users', userRoute);
app.use('/api/movies', movieRoute)
app.use('/api/lists', listRoute)


const PORT = 8800 ; //process.env.PORT || 
app.listen(PORT, () => console.log(`Backend Server started on port ${PORT}`));
