
const mongoose = require ("mongoose")

const productschema= new mongoose.Schema({
name : String,
category:String,
price:Number

},{timestamps:true})

module.exports=mongoose.model("ProductDB",productschema)