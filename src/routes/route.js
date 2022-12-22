const express = require('express');
const router = express.Router();

const authorController= require("../controllers/authorController")
const bookController= require("../controllers/bookController")
const AllController=require("../controllers/AllController")

router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})

router.post("/createAuthor", authorController.createAuthor  )

router.get("/getAuthorsData", authorController.getAuthorsData)

router.post("/createBook", bookController.createBook  )

router.get("/getBooksData", bookController.getBooksData)

router.get("/getBooksWithAuthorDetails", bookController.getBooksWithAuthorDetails)


router.post("/createAuthor1",AllController.createAuthor1)
router.post("/createpublisher",AllController.createpublisher)
router.post("/createbooks",AllController.createbooks)
router.get("/getAllbook", AllController.getAllbook)
router.get("/updateBook", AllController.updateBook)
router.put("/updateBookprice",AllController.updateBookprice)

module.exports = router;