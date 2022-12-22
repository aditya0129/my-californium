const Author1Model=require("../models/Author1Model")
const BooksModel = require("../models/BooksModel")
const publisherModel=require("../models/publisherModel")
const {isValidObjectId}=require('mongoose')

const createAuthor1= async function(req,res){
    let body=req.body
    let data= await Author1Model.create(body)
    res.send({msg:data})
}

const createpublisher= async function(req,res){
    let body=req.body
    let data = await publisherModel.create(body)
    res.send({msg:data})
}

const createbooks = async function(req, res){
    let books = req.body
    if(!books.author){
        res.send({msg : "Author name is required"})
    }
    else if(!isValidObjectId(books.author)){
        res.send({msg : "There is no author with this Id"})
    }
    else if(!books.publisherID){
        res.send({msg : "Publisher name is required"})
    }
    else if(!isValidObjectId(books.publisherID)){
        res.send({msg : "There is no publisher with this Id"})
    }
 
    else{
        let saveData = await BooksModel.create(books)
        res.send({data : saveData}) 
    }
    
}

// 4. Write a GET api that fetches all the books along with their author details (you have to populate for this) as well the publisher details (you have to populate for this) 

const getAllbook= async function(req,res){
    let alldata =await BooksModel.find().populate("author").populate("publisherID")
    res.send({msg : alldata})
}

//a) Add a new boolean attribute in the book schema called isHardCover with a default false value. For the books published by 'Penguin' and 'HarperCollins', update this key to true.
const updateBook = async function(req,res){
    let publisher = (await publisherModel.find({name: {$in: ['Penguin','HarperCollins']}})).map(publisher=>publisher._id)
    let update = await BooksModel.updateMany({publisher:{$in: publisher}},{$set: {isHardCover:true}},{new:true});
    res.send({msg: "New key added",data:update})
}


// b) For the books written by authors having a rating greater than 3.5, update the books price by 10 (For eg if old price for such a book is 50, new will be 60)
const updateBookprice = async function(req,res){
    let author = (await Author1Model.find({rating: {$gt:3.5}})).map(author=>author._id);
    let update = await BooksModel.updateMany({author: {$in: author}},{$inc: {price:10}});
    res.send({msg:"Price Updated",data:update});
}




module.exports.createAuthor1=createAuthor1
module.exports.createpublisher=createpublisher
module.exports.createbooks=createbooks
module.exports.getAllbook=getAllbook
module.exports.updateBook=updateBook
module.exports.updateBookprice=updateBookprice