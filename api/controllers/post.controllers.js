const errorHandler = require("../utils/error")
const Post = require("../model/post.model")


const create = async(req,res,next)=>{
if(!req.body.isAdmin){
    return next(errorHandler(403,"bad credentiels !"))
}
if(!req.body.title || !req.body.content){
    return next(errorHandler(400,"please provide all required fields !"))
}

const slug = req.body.title.toLowerCase().split(" ").join("").replace(/[^a-zA-Z0-9-]/g,"-")

const newPost =new Post({
    ...req.body,
    slug,
    userId:req.user.id
})

try {
    const savedPost = await newPost.save() 
    res.status(200).json(savedPost)
    
} catch (error) {
    next(error)
}

}


module.exports = {create}