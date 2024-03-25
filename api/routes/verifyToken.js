// const jwt = require("jsonwebtoken")


// const verifyToken = async(req,res,next)=>{
//     const authHeader = req.headers["authorization"]

//     const token = authHeader.split(" ")[1]

//     if(token == null){
//         res.status(401)
//         throw new Error("invalid token !")
//     }

//     await jwt.verify(token,process.env.ACCESS_TOKEN,(err,user)=>{
//         if(err){
//             res.status(403)
//             throw new Error("user is not unhauthorized")
//         }

//         req.user=user
//     })
// }


// module.exports = verifyToken