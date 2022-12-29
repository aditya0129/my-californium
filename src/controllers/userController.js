const JWT = require("jsonwebtoken");
const userModel = require("../models/userModel");

/*
  Read all the comments multiple times to understand why we are doing what we are doing in login api and getUserData api
*/

const createUser = async function (req, res) {
  //You can name the req, res objects anything.
  //but the first parameter is always the request 
  //the second parameter is always the response
  try {
    let data = req.body;
    let savedData = await userModel.create(data);
    res.status(201).send({ msg: savedData });
  } catch (error) {
    res.status(500).send({ error: error.message })
  }
};

const loginUser = async function (req, res) {

  try {
    let userName = req.body.emailId;
    let password = req.body.password;
    let user = await userModel.findOne({ emailId: userName, password: password });
    if (!user)
      return res.status(404).send({ status: false, msg: "username or the password is not corerct", });

    // Once the login is successful, create the jwt token with sign function
    // Sign function has 2 inputs:
    // Input 1 is the payload or the object containing data to be set in token
    // The decision about what data to put in token depends on the business requirement
    // Input 2 is the secret (This is basically a fixed value only set at the server. This value should be hard to guess)
    // The same secret will be used to decode tokens 
    let token = JWT.sign(                       //Generation for Token
      {
        userId: user._id.toString(),
        batch: "californium",
        organisation: "FunctionUp",
      },
      "functionup-californium-very-very-secret-key"
    );
    res.setHeader("x-auth-token", token);
    res.status(200).send({ status: true, token: token });
  } catch (error) {
    res.status(500).send({ error: error.message })
  }

};

const getUserData = async function (req, res) {

  // If a token is present then decode the token with verify function
  // verify takes two inputs:
  // Input 1 is the token to be decoded
  // Input 2 is the same secret with which the token was generated
  // Check the value of the decoded token yourself
  // Decoding requires the secret again. 
  // A token can only be decoded successfully if the same secret was used to create(sign) that token.
  // And because this token is only known to the server, it can be assumed that if a token is decoded at server then this token must have been issued by the same server in past.
  try {
    let userId = req.params.userId;
    let userDetails = await userModel.findById(userId);
    if (!userDetails)
      return res.status(404).send({ status: false, msg: "No such user exists." });

    res.status(200).send({ status: true, data: userDetails });
  } catch (error) {
    res.status(500).send({ error: error.message })
  }

}
  // Note: Try to see what happens if we change the secret while decoding the token}
const updateUser = async function (req, res) {
  // Do the same steps here:
  // Check if the token is present
  // Check if the token present is a valid token
  // Return a different error message in both these cases
  try {
    let userId = req.params.userId;
    let user = await userModel.findById(userId);
    //Return an error if no user with the given id exists in the db
    if (!user) { return res.status(404).send("No such user exists"); }

    let userData = req.body;
    let updatedUser = await userModel.findOneAndUpdate({ _id: userId }, userData);
    res.status(200).send({ status: updatedUser, data: updatedUser });

  } catch (error) {
    res.status(500).send({ error: error.message })
  }
};

const deleteUser = async function (req, res) {
  try {
    let userId = req.params.userId;
    let deleteUser = await userModel.findByIdAndUpdate({ _id: userId }, { $set: { isDeleted: true } }, { new: true })
    return res.status(200).send({ msg: deleteUser })
  } catch (error) {
    res.status(500).send({ error: error.message })
  }

}




module.exports.createUser = createUser;
module.exports.getUserData = getUserData;
module.exports.updateUser = updateUser;
module.exports.loginUser = loginUser;
module.exports.deleteUser = deleteUser