const productmodel=require("../models/productDocModel")


const createproduct= async function(req,res){
    let data= req.body
    let savedata= await productmodel.create(data)
    res.send({saved:savedata})
}

module.exports={createproduct}