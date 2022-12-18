const express = require('express');
const router = express.Router();
// const UserModel= require("../models/userModel.js")
const UserController= require("../controllers/userController")
const BookController= require("../controllers/bookController")
const bookListConroller=require("../controllers/bookListConroller")

router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})

router.post("/createUser", UserController.createUser  )

router.get("/getUsersData", UserController.getUsersData)

router.post("/createBook", BookController.createBook  )

router.get("/getBooksData", BookController.getBooksData)

router.post("/createbookcollection",bookListConroller.createbookcollection)
router.get("/bookList", bookListConroller.bookList,)
router.post("/getBooksInYear",bookListConroller.getBooksInYear)
router.post("/getParticularBooks",bookListConroller.getParticularBooks)
router.get("/getXINRBooks",bookListConroller.getXINRBooks)
router.get("/getRandomBooks",bookListConroller.getRandomBooks)

module.exports = router;