const express = require('express');
const router = express.Router();
const userController= require("../controllers/userController")
const myUserController = require("../controllers/user2Controller")
const myUserMid = require("../middleware/auth")

router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})

// router.post("/users", userController.createUser)

// router.post("/login", userController.loginUser)

// //The userId is sent by front end
// router.get("/users/:userId", userController.getUserData)
// router.post("/users/:userId/posts", userController.postMessage)
|
//router.delete('/users/:userId', userController.)


router.post("/myusers", myUserController.createMyUser )
router.post("/mylogin", myUserController.myloginUser)
router.get("/myusers/:userId", myUserMid.authentication,myUserMid.authorise, myUserController.getMyUsersData)
router.put("/myusersupdate/:userId", myUserMid.authentication,myUserMid.authorise, myUserController.updateMyUser)
router.delete("/myusers/:userId", myUserMid.authentication,myUserMid.authorise,myUserController.deleteMyUser) 


module.exports = router;