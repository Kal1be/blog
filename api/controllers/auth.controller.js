const User = require("../model/user.model")

// const bcrypt = require("bcryptjs")

const signup = async (req,res,next)=>{
    const {username,email,password} = req.body

    if(!username || !email || !password || username==="" || email ===""||password===""){
        res.status(400)
       throw new Error("all fields are mandatory !")
    }

   const newUser = new User({username,email,password})

try {
    await newUser.save()
    res.json("user signup with success")
} catch (error) {
    res.status(500).json({message:error.message})
    
}



}



module.exports = signup