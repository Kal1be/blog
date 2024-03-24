const mongoose = require("mongoose")


const userSchema= new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    profilePicture:{
        type:String,
        default:"https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.istockphoto.com%2Fphotos%2Fprofile-image&psig=AOvVaw1V1dTGj_3MkjMcH_4i1Oo9&ust=1711394341827000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCKjOjfHOjYUDFQAAAAAdAAAAABAE"
    }

},
{
    timestamps:true
})

const User = mongoose.model("user",userSchema)


module.exports = User