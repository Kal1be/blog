const express = require("express")
const dotenv = require("dotenv").config()
const mongoose = require("mongoose")
const connectDb = require("./config/dbConfig")

const userRoutes = require("./routes/user.route")

connectDb()

const app = express()
app.use("/api/user",userRoutes)

app.listen(process.env.PORT || 3000,()=>{
    console.log(`app listen on the port ${process.env.PORT}`)
})