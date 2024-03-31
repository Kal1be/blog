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
    if(!req.user.isAdmin && req.user.id !== req.params.userId){
        return next(errorHandler(401,"user is not authorized to delete this contact !"))
    }

    try {
        await User.findByIdAndDelete(req.params.userId)
        res.json(200).json({message:"user delete with success !"})
        
    } catch (error) {
        next(error)
    }

}

// the signout user button
// the function is here 

const signOut = (req,res,next)=>{
    try {
        res.clearCookie("access_token").status(200).json("user sign out with success !")
        
    } catch (error) {
        next(error)
        
    }
}

// get all user information 
// the 


const getUsers = async (req,res,next)=>{
    if(req.user.isAdmin !== true){
  return next(errorHandler(403,"user is not authorized"))
    }
    try {
        const startIndex = parseInt(req.query.startIndex) || 0;
        const limit = parseInt(req.query.limit ) || 9;
        const sortDirection = req.query.sort === 'asc' ? 1:-1

        const users = await User.find()
        .sort({createdAt:sortDirection})
        .skip(startIndex)
        .limit(limit)

        const userPassword = users.map((user)=>{
            const {password,...rest} = user._doc
            return rest
        })

        const totalUsers = await User.countDocuments()
        const now = new Date()

        const oneMonthAgo = new Date(
            now.getFullYear(),
            now.getMonth()-1,
            now.getDate()
        )
        const lastMonthUsers = await User.countDocuments({
            createdAt:{$gte:oneMonthAgo}
        })

        res.status(200).json(
           { users:userPassword,
            totalUsers,
            lastMonthUsers}
        )
        
    } catch (error) {
        next(error)
    }


}


// the get only one user
const getUserinfo = async (req,res,next)=>{
try {
    // const limit = parseInt(req.query.limit) || 9
    const user = await User.findById(req.params.userId)
    if(!user){
        return next(errorHandler(404,"user not found "))
    }
    const {password,...rest} = user._doc
    res.status(200).json(rest)
} catch (error) {
    next(error)
}

}
module.exports = { getUser,updateUser,deleteUser,signOut,getUsers,getUserinfo}