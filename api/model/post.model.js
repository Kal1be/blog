const mongoose = require("mongoose")

const postSchema = new mongoose.Schema({

    userId:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true,
        unique:true
    },
    image:{
        type:String,
        default:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQIReYMzeX4FMI7pDkA_cQPztcoXwAfmhCRg&usqp=CAU"
    },
    category:{
        type:String,
        default:"uncategorized"
    },
    slug:{
        type:String,
        required:true,
        unique:true
    }

},{
    timestamps:true
})

const Post = mongoose.model("post",postSchema)


module.exports = Post