const jwt = require("jsonwebtoken");
const newuserModel=require('../models/newuserModel')

// Write a **POST api /users** to register a user from the user details in request body. 

const createuser = async function(req,res){
    let userdata=req.body
    let savedata= await newuserModel.create(userdata);
    res.send({status:true,data:savedata})
}


//- Write a ***POST api /login** to login a user that takes user details - email and password from the request body. If the credentials don't match with any user's data return a suitable error.// On successful login, generate a JWT token and return it in response body. Example 

const LoginUser= async function(req,res){
    let userId = req.body.emailid;
    let password = req.body.password;
    let user= await newuserModel.findOne({emailId: userId, password: password})
    if(!user) return res.send({status:false,msg:"this user does'n exits"})

    let token= await jwt.sign({userId:user._id.toString()},"unkown")
    res.send({ status: true, token: token });

}

// Write a **GET api /users/:userId** to fetch user details. Pass the userId as path param in the url. Check that request must contain **x-auth-token** header. If absent, return a suitable error.
// If present, check that the token is valid.

const userdetailes= async function(req,res){

    let userId = req.params.userId;
  let userDetails = await newuserModel.findById(userId);
  if (!userDetails)
    return res.send({ status: false, msg: "No such user exists" });

  res.send({ status: true, data: userDetails });
}
// Write a **PUT api /users/:userId** to update user details. Pass the userId as path param in the url and update the attributes received in the request body. Check that request must contain **x-auth-token** header. If absent, return a suitable error.
const updateuser1= async function(req,res){
    let userId = req.params.userId;
  let user = await newuserModel.findById(userId);
  //Return an error if no user with the given id exists in the db
  if (!user) {
    return res.send("No such user exists");
  }

  let userData = req.body;
  let updatedUser = await newuserModel.findOneAndUpdate({ _id: userId }, userData,{new:true});
  res.send({ status: true , data: updatedUser });
};



//- Write a **DELETE api /users/:userId** that takes the userId in the path params and marks the isDeleted attribute for a user as true. Check that request must contain **x-auth-token** header. If absent, return a suitable error.

const deleteuser= async function(req,res){
    let userId = req.params.userId;
    let user = await newuserModel.findById(userId);

  if (!user) {
    return res.send("No such user exists");
  }
    let deletedUser = await newuserModel.findOneAndUpdate({ _id: user },{$set:{isDeleted: true}},{new:true});
    res.send({ status: true, data: deletedUser});
 }



module.exports={createuser,LoginUser,userdetailes,deleteuser,updateuser1}