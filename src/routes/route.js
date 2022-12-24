const express = require('express');
const router = express.Router();
// const UserModel= require("../models/userModel.js")
const UserController= require("../controllers/userController")
const BookController= require("../controllers/bookController")
const commonMW = require ("../middlewares/commonMiddlewares")

const user1Controller=require("../controllers/user1controller")
const productcontroll=require("../controllers/productcontroller")
const ordercontroller=require("../controllers/ordercontroller")
const middleware=require("../middlewares/middleware")

router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})

router.post("/createBook", commonMW.abc, BookController.createBook  )
router.post("/basicRoute", commonMW.mid1, commonMW.mid2, commonMW.mid3, commonMW.abc, UserController.basicCode, commonMW.mid4)


router.post("/createuser", middleware.midHeader,user1Controller.createuser)
router.post("/createproduct",productcontroll.createproduct)
router.post("/createorder",middleware.midHeader,ordercontroller.ordercreate)
router.get("/getAllOrderData",ordercontroller.getAllOrderData)

module.exports = router;