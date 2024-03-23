const express = require("express")
const dotenv = require("dotenv").config()
const mongoose = require("mongoose")
const connectDb = require("./config/dbConfig")
const errorHandler = require("./middlewares/errorHandler")
const cors = require("cors")
const userRoutes = require("./routes/user.route")
const authRoutes = require("./routes/auth.route")

connectDb()

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors({
    origin:process.env.HTTP_CORS,
    credentials:true
}))
app.use("/api/user",userRoutes)
app.use("/api/auth",authRoutes)

app.use(errorHandler)

app.listen(process.env.PORT || 3000,()=>{
    console.log(`app listen on the port ${process.env.PORT}`)
})