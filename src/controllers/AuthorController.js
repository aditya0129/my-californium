const { count } = require("console")
const { Module } = require("module")
const AuthorModel=require("../models/AuthorModel")
const Booksmodel = require("../models/Booksmodel")
const BooksModel=require("../models/Booksmodel")

const createAuthor= async function(req,res){
    let data= req.body
    if(data.author_id ){
        let saveData = await AuthorModel.create(data)
        res.send({msg : saveData})
    }
    else{
        res.send({msg : "We cant create data without author_id"})
    }
    
}

// List out the books written by "Chetan Bhagat" ( this will need 2 DB queries one after another- first query will find the author_id for "Chetan Bhagat”. Then next query will get the list of books with that author_id )
const ChetanBhagatBooks= async function(req,res){
    //let findbooks= await AuthorModel.find({})
    let authorsId= await AuthorModel.find({author_name : "Chetan Bhagat"}).select({author_id : 1,_id:0})
    let allBooks = await BooksModel.find({author_id : authorsId[0].author_id})
 
    res.send({msg: allBooks})

}

// find the author of “Two states” and update the book price to 100;  Send back the author_name and updated price in response.  ( This will also need 2  queries- 1st will be a findOneAndUpdate. The second will be a find query aith author_id from previous query)

const Autherdata= async function(req,res){
    let reqbook=await Booksmodel.findOneAndUpdate({name:"Two states"},{$set:{price:100}},{new:true}).select({author_id:1,_id:0,price:1})
    //res.send({msg:reqbook})
    let price=reqbook['price']
    let id=reqbook['author_id']
    let reqname=await AuthorModel.findOne({author_id:id}).select({_id:0,author_name:1})
    let Author_name=reqname['author_name']
   
    res.send({msg:{Author_name,price}})
    
}
// Find the books which costs between 50-100(50,100 inclusive) and respond back with the author names of respective books.. 
// bookModel.find( { price : { $gte: 50}  ,  price: {$lte: 100} } ) // WRONG
// bookModel.find( { price : { $gte: 50, $lte: 100} } ).select({ author_id :1})..run a map(or forEach) loop and get all the authorName corresponding to the authorId’s ( by querying authorModel)

// const authorname= async function(req,res){
//       let a=BooksModel.find( { price : { $gte: 50, $lte: 100} } ).select({ author_id :1})
//      let ar=[]
//    for(let i=0;i<a.length;i++){
//        if(!ar.includes(a[i]['author_id']))
//     ar.push(a[i]['author_id'])
//    }
//    console.log(ar)
//    let resul=[]
//    let b=await AuthorModel.find().select({_id:0,author_id:1,author_name:1})
//    b.forEach((x)=>{
//        if(ar.includes(x['author_id'])){
//            resul.push(x['author_name'])
//        }
//    })
  
//    res.send({authors:resul})
// }
const authorname = async function(req,res){
    let books = await BooksModel.find( { price : { $gte: 50, $lte: 100} } ).select({ author_id :1,name:1,_id:0});
    if(!books.length) return res.send({error:"No such book available!"});
    let details = [];
    for(let i=0;i<books.length;i++){
        details.push(`${books[i].name} : ${(await AuthorModel.findOne({author_id:books[i].author_id}).select({author_name:1,_id:0})).author_name}`);
    }
    res.send({"The authors coresponding to the books are:":details});
}


module.exports.createAuthor=createAuthor
module.exports.ChetanBhagatBooks=ChetanBhagatBooks
module.exports.Autherdata=Autherdata
module.exports.authorname=authorname