const mongoose=require('mongoose')
//const Schema= new mongoose.Schema
const ObjectId = mongoose.Schema.Types.ObjectId


const Author1schema= new mongoose.Schema({
    authorName: String,
    age:Number,
    Addresh:String,
    rating:Number

 
},{timestamps:true})

module.exports=mongoose.model("AutherDb",Author1schema)


// { 
//     _id: ObjectId("61951bfa4d9fe0d34da86829"),
//             authorName:"Chetan Bhagat",
//             age:50,
//             address:"New Delhi",
//     rating: 2
//         } 
    