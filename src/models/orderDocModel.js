
const mongoose= require("mongoose")
const ObjectId=mongoose.Schema.Types.ObjectId

const orderschema=new mongoose.Schema({
    userId:{
        type:ObjectId,
        ref:"UserDB"
    },
    productId:{
        type:ObjectId,
        ref:"ProductDB"
    },
    amount:Number,
    isFreeAppUser:Boolean,
    date:String

},{timestamps:true})

module.exports=mongoose.model("OrderDB",orderschema)