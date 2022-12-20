const { count } = require("console")
const BooksModel=require("../models/Booksmodel")


const createbooks= async function(req,res){
let data= req.body
if(data.author_id ){
    let saveData = await BooksModel.create(data)
    res.send({msg : saveData})
}
else{
    res.send({msg : "We cant create data without author_id"})
    }
}



module.exports.createbooks=createbooks