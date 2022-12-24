const productmodel=require("../models/productDocModel")
const usermodel=require("../models/userDocModel")
const ordermodel= require("../models/orderDocModel")
const {isValidObjectId}=require('mongoose')
const productDocModel = require("../models/productDocModel")

const ordercreate= async function(req,res){
    const orderdata =req.body
    let userd=await usermodel.findById(orderdata.userId)
    let productd=await productDocModel.findById(orderdata.productId)
    if(!isValidObjectId(orderdata.userId)){
        res.send({msg:"enter valid user Id"})
    }
    if(!isValidObjectId(orderdata.productId)){
        res.send({msg:"enter valid productId"})
    }

    let user=req.headers["isfreeappuser"]
    if(user==="true"){
        orderdata.amount=0;
        orderdata.isFreeAppUser="true"
    }

    if(user==="false"){
        if (userd.balance >= productd.price) {
            await usermodel.findByIdAndUpdate(orderdata.userId, { $inc: { balance: -(productd.price) }, new: true })
            orderdata.isFreeAppUser = "false"
            orderdata.amount = productd.price
        } else {
            return res.send("User haven't Sufficient Balance to buy Product.")
        }
    }

    let ordercreated= await ordermodel.create(orderdata)
    res.send({ordercomplete : ordercreated})
}


const getAllOrderData = async function (req, res) {
    let allData = await orderSchema.find().populate(["userId", "productId"])
    res.send({ data: allData });
}
module.exports={ordercreate,getAllOrderData}