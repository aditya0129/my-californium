const express = require('express');
const router = express.Router();
const userController= require("../controllers/userController")
const newuserController=require('../controllers/newuserController')
const Authentication=require("../middleware/middleware")

router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})

router.post("/users", userController.createUser  )

router.post("/login", userController.loginUser)

//The userId is sent by front end
router.get("/users/:userId", userController.getUserData)

router.put("/users/:userId", userController.updateUser)


//assignment
router.post("/createuser",newuserController.createuser)
router.post("/Loginuser",newuserController.LoginUser)
router.get("/userdetailes/:userId",Authentication.Authentication,newuserController.userdetailes)
router.put("/updateuser1/:userId",Authentication.Authentication,newuserController.updateuser1)
router.delete("/deleteuser/:userId",Authentication.Authentication,newuserController.deleteuser)


module.exports = router;