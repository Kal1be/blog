const express = require("express")
const dotenv = require("dotenv").config()
const connectDb = require("./config/dbConfig")
const cors = require("cors")
const userRoutes = require("./routes/user.route")
const authRoutes = require("./routes/auth.route")
const postRoutes = require("./routes/post.route")
const cookieParser = require("cookie-parser")

connectDb()

const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({extended:true}))
app.use(cors({
    origin:process.env.HTTP_CORS,
    credentials:true
}))
app.use("/api/user",userRoutes)
app.use("/api/auth",authRoutes)
app.use("/api/post",postRoutes)
app.use((err,req,res,next)=>{

    const statusCode = err.statusCode || 500;

    const message = err.message || "internal Server Error"

    res.status(statusCode).json({
        success:false,
        statusCode,
        message,
    })

})

app.listen(process.env.PORT || 3000,()=>{
    console.log(`app listen on the port ${process.env.PORT}`)
})