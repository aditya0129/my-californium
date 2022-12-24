const midHeader= function(req,res,next){
    const data=req.headers["isfreeappuser"]
    if(!data){
        res.send({importent:"isfreeappuser is required"})
    }
    next()
}

module.exports={midHeader}