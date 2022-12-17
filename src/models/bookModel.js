/*Create a bookSchema with bookName, authorName, category and year . Create same 2 api's for books i.e. : 1 api to create a new book and another api to get the list of all books.*/

const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    bookname:String,
    authorName:String,
    category:{
        type:String,
        required:true
    },
    year:Number
},{ timestamps: true })
module.exports = mongoose.model('book', bookSchema )