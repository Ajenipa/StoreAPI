const errorHandler=async(err,req,res,next)=>{
    console.log(err)
    return res.status(200).json({msg:"something went wrong "})


}
module.exports = errorHandler