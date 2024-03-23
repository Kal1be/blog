const User = require("../model/user.model")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")


// the registration controllers to allow our user to register
// the route of it is /api/auth/signup

const signup = async (req,res,next)=>{
    const {username,email,password} = req.body

    if(!username || !email || !password || username==="" || email ===""||password===""){
        res.status(400)
       throw new Error("all fields are mandatory !")
    }
const hasPassword = await bcrypt.hash(password,12)
   const newUser = new User({username,email,password:hasPassword})

try {
    await newUser.save()
    res.json("user signup with success")
} catch (error) {
    res.status(500).json({message:error.message})
    
}



}
// the access of the user to our page after signin
// the route of it is /api/auth/sign

const signin = async (req,res,next)=>{
    const {email,password} = req.body

    if(!email || !password){
        res.status(400)
        throw new Error("All fields are mandatory !")
    }
try {
    
    const validUser = await User.findOne({email})

    if(!validUser){
        res.status(404)

        throw new Error("user not found !")
    }

    const checkPassword = await bcrypt.compare(password,validUser.password)

    if(!checkPassword){
        res.status(400)
        throw new Error("email or password is incorrect !")
    }

    const token = jwt.sign({id:validUser._id},process.env.ACCESS_TOKEN,{expiresIn:"100h"})

    const {password:pass,...rest} = validUser._doc

    res.status(200).cookie("access_token",token,{
        httpOnly:true
    }).json(rest)


    
} catch (error) {
    
    
}



}



module.exports = {signup,signin}