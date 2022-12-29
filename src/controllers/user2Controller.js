const jwt = require("jsonwebtoken");
const user2Model = require("../models/newuserModel");

const createMyUser = async function (req, res) {
    let data = req.body;
    let savedData = await user2Model.create(data);
    res.send({ msg: savedData }); 
}

const myloginUser = async function (req, res) {
    let userName = req.body.emailId;
    let password = req.body.password;
  
    let user = await user2Model.findOne({ emailId: userName, password: password });
    if (!user)
      return res.send({
        status: false,
        msg: "username or the password is not corerct",
      });
  
    let token = jwt.sign(
      {
        userId: user._id.toString(),
        batch: "californium",
        organisation: "FunctionUp",
      },
      "functionup-californium-very-secret-key"
    );
    res.setHeader("x-auth-token", token);
    res.send({ status: true, token: token });
  };

  const getMyUsersData = async function(req, res){
    let token = req.headers["x-Auth-token"];
    if (!token) token = req.headers["x-auth-token"];
   
    let decodedToken = jwt.verify(token, "functionup-californium-very-secret-key");
    // console.log(decodedToken);  
    if (!decodedToken)
      return res.send({ status: false, msg: "token is invalid" });
   
    let userId = req.params.userId;
    let userDetails = await user2Model.findById(userId);
    if (!userDetails)
      return res.send({ status: false, msg: "No such user exists" });
  
    res.send({ status: true, data: userDetails });
  
  }

  const updateMyUser = async function (req, res) {
    let userId = req.params.userId;
    let user = await user2Model.findById(userId);
    
    if (!user) {
      return res.send("No such user exists");
    }
  
    let userData = req.body;
    let updatedUser = await user2Model.findOneAndUpdate({ _id: userId }, userData,{new:true});
    res.send({ status: true, data: updatedUser });
  }

  const deleteMyUser = async function(req, res){
    let userId = req.params.userId;
    let deletedUser = await user2Model.findOneAndUpdate({ _id: userId }, {isDelete: true},{new:true});
    res.send({ status: true, data: deletedUser });
  }


module.exports.createMyUser = createMyUser
module.exports.myloginUser = myloginUser
module.exports.getMyUsersData = getMyUsersData
module.exports.updateMyUser = updateMyUser
module.exports.deleteMyUser = deleteMyUser