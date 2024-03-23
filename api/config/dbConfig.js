const mongoose = require("mongoose")


const connectDb = async ()=>{
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL)
        console.log("mongoose connected with success to",conn.connection.host,conn.connection.name)
    } catch (error) {
        console.log("something went wrong ",error)
    }
}

module.exports = connectDb