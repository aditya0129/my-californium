const mongoose = require('mongoose');
// { 
//     name:"Two states",
//     author_id:1,
//     price:50,
//     ratings:4.5,
// } 

const booksSchema=new mongoose.Schema({
    name:String,
    author_id:Number,
    price:Number,
    ratings:String,
},{timestemps:true})
module.exports = mongoose.model('books', booksSchema)