const express = require("express")

const dotenv = require("dotenv").config()
const mongoose = require("mongoose")

// mongoose.connect("mo")

const app = express()

app.listen(process.env.port || 3000,()=>{
    console.log(`app listen on the port ${process.env.port}`)
})