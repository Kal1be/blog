const Comment = require("../model/comment.model")
const errorHandler = require("../utils/error")

const createComment = async (req,res,next)=>{
    try {
        const {content,postId,userId} = req.body
        if(userId !== req.user.id){
            return next(errorHandler(403,"you are not alllowed to comments this post "))

            const newComment = new Comment({
                content,
                postId,
                userId
            })

            await newComment()

            res.status(200).json(newComment)
        }
        
    } catch (error) {
       next(error) 
    }
}

module.exports = {createComment}