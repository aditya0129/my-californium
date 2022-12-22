const mongoose=require('mongoose')
//const schema= new mongoose.Schema

// {
// 		_id: ObjectId("61951bfa4d9fe0d34da86344"),
// name: “Penguin”,
// headQuarter: “New Delhi”,
// }
const publishschema= new mongoose.Schema({
    name:String,
    headQuarter:String

},{timestamps:true})

module.exports=mongoose.model("publisherDB",publishschema)
