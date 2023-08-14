const jwt = require("jsonwebtoken");


function verify (req, res, next) {
    const authHeader = req.headers.token;
    if (authHeader){
        const token = authHeader.split(" ")[1] //spliting the Bearer token to get the actual token
        //This verification process either gives us an error or the user details(id and isAdmin) we saved in the token
        jwt.verify(token, process.env.SECRET_PHRASE, (err, user)=>{
            if (err) res.status(403).json("Token is not valid or has expired");
            // If no error, it means we have a valid user
            req.user = user; //assigning the value of user
            next();
        })

    } else{
        return res.status(401).json("You are not authenticated!")
    }
}



module.exports = verify;
