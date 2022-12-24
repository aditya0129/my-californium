const user1model = require("../models/userDocModel")

const createuser= async function(req,res){
    let data=req.body
    let savedata = await user1model.create(data)
    res.send({msg:savedata})
}


//module.exports={createuser}
module.exports.createuser=createuser