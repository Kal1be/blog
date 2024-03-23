// const asyncHandler = require("express-async-handler")


const getUser = async (req,res,next)=>{
    res.json({message:"api created successfull !"})
}

module.exports = { getUser }