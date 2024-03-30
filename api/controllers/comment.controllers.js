const Comment = require("../model/comment.model")
const errorHandler = require("../utils/error")

const createComment = async (req,res,next)=>{
    try {
        const {content,postId,userId} = req.body
        if(userId !== req.user.id){
            return next(errorHandler(403,"you are not alllowed to comments this post "))

        }
        
        const newComment = new Comment({
            content,
            postId,
            userId
        })

        await newComment.save()

        res.status(200).json(newComment)
        
    } 
    
    catch (error) {
       next(error) 
    }
}

// the route for the get comments post for every users
// the request is send to /api/comment/getcomment

const getPostComments =async (req,res,next)=>{
    try {
        const limit = parseInt(req.query.limit) || 6
        const comments = await Comment.find({postId:req.params.postId}).sort({createdAt:-1})

        res.status(200).json(comments)
        
    } catch (error) {
        next(error)
    }

}




module.exports = {createComment,getPostComments}