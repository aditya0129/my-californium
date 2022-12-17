const bookmodel=require("../models/bookModel")

const createbook = async function (req,res){
    let data1=req.body
    let savedata = await bookmodel.create(data1)
    res.send({mess:savedata})
    }
const getbookData = async function(req,res){
    let allbookdata= await bookmodel.find()
    res.send({mess:allbookdata})
}    

module.exports.createbook=createbook
module.exports.getbookData=getbookData