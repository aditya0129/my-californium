const jwt = require("jsonwebtoken");

const authentication = function(req, res, next){
    let token = req.headers["x-Auth-token"];
    if (!token) token = req.headers["x-auth-token"];
  
    //If no token is present in the request header return error. This means the user is not logged in.
    if (!token) return res.send({ status: false, msg: "token must be present" });
  
    next()
}


const authorise = function(req, res, next) {
    let token = req.headers["x-auth-token"]
    let decodedToken = jwt.verify(token, 'functionup-californium-very-secret-key')

    if(!decodedToken) return res.send({status: false, msg:"token is not valid"})
    
    let userToBeModified = req.params.userId
    let userLoggedIn = decodedToken.userId 

    if(userToBeModified != userLoggedIn) 
        return res.send({status: false, msg: 'User logged is not allowed to modify the requested users data'})

    next()
}

module.exports.authentication = authentication
module.exports.authorise = authorise