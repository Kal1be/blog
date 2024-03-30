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

// the route for the likecomment

const likeComment = async (req,res,next)=>{
    try {

        const comment = await Comment.findById(req.params.commentId)
        if(!comment){
            return next(errorHandler(404,"cannot not found"))
        }

        const userIndex = comment.likes.indexOf(req.user.id)

         if(userIndex===-1){
            comment.numberOfLikes +=1
            comment.likes.push(req.user.id)
         }
         else{
            comment.numberOfLikes-=1;
            comment.likes.splice(userIndex,1);
         }
         await comment.save();
         res.status(200).json(comment)
    } catch (error) {
        next(error)
    }

}

// the edit route for the user 
// the route is /editcomment/:commentId
 
const editComment = async (req,res,next)=>{
    try {
        const comment = Comment.findById(req.params.commentId)
        if(!comment){
            return next(errorHandler(404,"comment not found"))
        }

        if(comment.userId !== req.user.id && !req.user.isAdmin){
            return next(errorHandler(402,"you are not allwoed to edit this post"))
        }

        const editComment = await Comment.findByIdAndUpdate(
            req.params.commentId,
            {content:req.body.content},
            {new:true}
        )
        res.status(200).json(editComment)
    } catch (error) {
       next(error) 
    }
}

// the delete component route for comment page

const deleteComment =async (req,res,next)=>{
    try {
        const comment = Comment.findById(req.params.commentId)
        if(!comment){
            return next(errorHandler(404,"comment not found"))
        }

        if(comment.userId !== req.user.id && !req.user.isAdmin){
            return next(errorHandler(402,"you are not allow to delete this post"))
        }

        const deletCom = await Comment.findByIdAndDelete(req.params.commentId)

        res.status(200).json(deletCom)
        
    } catch (error) {
        next(error)
    }
}



module.exports = {createComment,getPostComments,likeComment,editComment,deleteComment}