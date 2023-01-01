const express = require('express');
const router = express.Router();
const userController= require("../controllers/userController")
const myUserController = require("../controllers/userController")
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


router.post("/myusers", myUserController.createUser )
router.post("/mylogin", myUserController.loginUser)
router.get("/myusers/:userId", myUserMid.authenticate,myUserMid.authorise, myUserController.getUserData)
router.put("/myusersupdate/:userId", myUserMid.authenticate,myUserMid.authorise, myUserController.updateUser)
router.delete("/myusers/:userId", myUserMid.authenticate,myUserMid.authorise,myUserController.deleteUser) 


module.exports = router;