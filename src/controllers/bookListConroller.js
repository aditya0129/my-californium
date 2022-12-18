const bookListModel = require("../models/bookListModel")

const createbookcollection= async  function(req,res){
let data=req.body
let savedData = await bookListModel.create(data)
res.send({mes:savedData})
}

const bookList= async function(req,res){
    let allbook= await bookListModel.find().select({authorName:13,bookName:13,_id:0})
    res.send({mes:allbook})
    
}

const getBooksInYear=async function(req,res){
    let data=req.body.year
    let year = await bookListModel.find({ year:{$eq:data} })
    res.send({mss:year})
}


const getParticularBooks= async function (req,res){
    let data=req.body;
    let getanybook= await bookListModel.find(data)
    res.send({mes:getanybook})
}


const getXINRBooks= async function(req,res){
    let getbooksbyprice=await bookListModel.find({"prices.indianPrice":{$in:["100INR","200INR","500INR"]}})
    res.send({mesg:getbooksbyprice})
}



const getRandomBooks= async function(req,res){
    
    let allbooks= await bookListModel.find({$or:[{stockAvailable:true},{Totalpage:{$gt:500}}]})
    res.send({msg:allbooks})
}

module.exports.createbookcollection=createbookcollection
module.exports.bookList=bookList
module.exports.getBooksInYear=getBooksInYear
module.exports.getParticularBooks=getParticularBooks
module.exports.getXINRBooks=getXINRBooks
module.exports.getRandomBooks=getRandomBooks