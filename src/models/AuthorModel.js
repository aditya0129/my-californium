const mongoose = require('mongoose');

// {    

//     author_id:1,
//     author_name:"Chetan Bhagat",
//     age:25,
//     address:"New delhi"
// } 

const AuthorSchema = new mongoose.Schema({
    author_id:Number,
        author_name:String,
        age:Number,
        address:String
},{ timestamps: true })

module.exports = mongoose.model('Author', AuthorSchema)