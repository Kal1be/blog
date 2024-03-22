const express = require("express")

const app = express()

app.listen(process.env.port || 3000,()=>{
    console.log(`app listen on the port ${process.env.port}`)
})