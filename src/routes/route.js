const express = require('express');
const router = express.Router();
const UserModel= require("../models/userModel.js")
const UserController= require("../controllers/userController")
const bookmodel=require("../models/bookModel")
const bookcontroller= require("../controllers/bookconroller")

router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})

router.post("/createUser", UserController.createUser)

router.get("/getUsersData", UserController.getUsersData)

router.post("/createbook",  bookcontroller.createbook)

router.get("/getbookData", bookcontroller.getbookData)

module.exports = router;