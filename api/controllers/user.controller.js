// const asyncHandler = require("express-async-handler")
const bcrypt = require("bcryptjs")

const errorHandler = require("../utils/error")
const User = require("../model/user.model")


const getUser = async (req,res,next)=>{
    const get = await User.find()
    res.json(get)
}



const updateUser = async (req,res,next)=>{
    if(req.user.id !== req.params.userId){
        return next(errorHandler(401,"you are not authorized to update this user"))
    }
    if(req.body.password < 4){
        return next(errorHandler(400,"password must be at least 8 carractere"))
    }
    const hashed =await bcrypt.hash(req.body.password,10)

   if(req.body.username){
    if(req.body.username < 7 || req.body.username > 20){
        return next(errorHandler(400,"the name must be between 7 to 20 carractere"))
    }
    if(req.body.username.includes(" "))
    {
        return next(errorHandler(400,"username does not contains spaces"))
    }
    if(req.body.username !== req.body.username.toLowerCase()){
        return next(errorHandler(400,"username must be in lowercase"))
    }

    if(!req.body.username.match(/^[a-zA-Z0-9]+$/)){
        return next(errorHandler(400,"username must contain letters and number + $ signe"))
    }}

    try {
        const createUpdate =await User.findByIdAndUpdate(req.params.userId,{
            $set:{
                username:req.body.username,
                email:req.body.email,
                profilePicture:req.body.profilePicture,
                password:hashed
            }
        },{
            new:true
        })

        res.status(200).json(createUpdate)
        
    } catch (error) {
        next(error)
    }
   

}



const deleteUser=async(req,res,next)=>{
    if(req.user.id !== req.params.userId){
        return next(errorHandler(401,"user is not authorized to delete this contact !"))
    }

    try {
        await User.findByIdAndDelete(req.params.userId)
        res.json(200).json("user delete with success !")
        
    } catch (error) {
        next(error)
    }

}

module.exports = { getUser,updateUser,deleteUser}