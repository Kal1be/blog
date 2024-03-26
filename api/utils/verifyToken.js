const jwt = require("jsonwebtoken")
const errorHandler = require("./error")


const verifyToken = (req,res,next)=>{
    const token = req.cookies.access_token
    if(!token){
        return next(errorHandler(401,"Unhauthorized"))
    }

    jwt.verify(token,process.env.JWT_SEC,(error,user)=>{
        if(error){
            return next(errorHandler(403,"forbidden"))
        }

        req.user = user;
        next()
    })
}

module.exports = verifyToken