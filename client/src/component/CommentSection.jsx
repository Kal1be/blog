import { useState,useEffect } from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import {Textarea } from "flowbite-react"
import { Alert} from "flowbite-react"
import Comment from "../component/Comment"
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

const CommentSection=({postId})=> {
    const [comment,setComment] = useState("")
    const [comments,setComments] = useState([])
  const [commentError,setCommentError]= useState(null)
    const {currentUser} = useSelector((state)=>state.user)
const navigate = useNavigate()
console.log(comment)
    
    useEffect(()=>{

        const getComments = async() =>{
          const res = await fetch(`/api/comment/getpostcomments/${postId}`)
          const data = await res.json()
          if(res.ok){
            setComments(data)
          }
      
        }
      
        getComments()
      
          },[postId])

    const handleSubmit = async (e)=>{
        e.preventDefault()
        if(comment.length > 200){
          return 
        }
  
        try {
          const res = await fetch("/api/comment/create",{
            method:"POST",
            headers:{
              "Content-Type":"application/json"
            },
            body:JSON.stringify({content:comment,postId,userId:currentUser._id})
          })
    
          
          const data = await res.json()
    
          if(res.ok){
            console.log(data)
            setComment("")
            setCommentError(null)
          }
          
        } catch (error) {
         setCommentError(error.message)
        }
  
      }


      const handleLike = async (commentId)=>{

        try {
          if(!currentUser){
            navigate("/sign-in")
            return
          }
          const res = await fetch(`/api/comment/likeComment/${commentId}`,{
            method:"PUT",
          })
  
          if(res.ok){
            const data = await res.json()
  
            setComments((prevComments) =>
            prevComments.map((comment) =>
              comment._id === commentId
                ? {
                    ...comment,
                    likes: data.likes,
                    numberOfLikes: data.likes.length,
                  }
                : comment
            )
          );
          }
    
          
        } catch (error) {
          console.log(error.message)
        }
  
      }


      const handleEdit = async (comment,editComment)=>{

        setComments((prevComments) =>
        prevComments.map((c) =>
          c._id === comment._id
            ? {
                ...c,
                content:editComment
              }
            : c
        )
      );

      }

  
  return (

    <div>

       <div className="max-w-5xl mx-auto w-full p-3">
        {
            currentUser ? (
   <div className="flex items-center gap-1 my-5 text-gray-500 text-sm">
    <p>Signed in as:</p>
    <img src={currentUser.profilePicture} className="h-5 w-5 object-cover rounded-full" alt="" />
    <Link to={"/dashboard?tab=profile"} className="text-xs text-cyan-600 hover:underline">
        @{currentUser.username}
    </Link>
     </div>
            ):(
                <div className="text-teal-500 my-5 ">you must be signed in to comment<Link to={"/sign-in"} className="text-sm text-red-400">Sign-in</Link></div>
            )
        }

       
      
    </div>

    {currentUser && (
    <form className="border-2 rounded-md p-4" onSubmit={handleSubmit}>
        <Textarea type="text" 
        onChange={(e)=>{
            setComment(e.target.value)
            
        }}
        value={comment}
        rows="4"
        maxLength="200"
        placeholder="add comment"/>
        <div className="flex items-center justify-between mt-8">
            <p className="text-gray-500">{200 - comment.length} characteres remaining</p>
            <button className="bg-green-700 text-white py-2 rounded-md px-3" type="submit">Submit</button>
        </div>
        {commentError && (<Alert color="failure mt-5">{commentError}</Alert>)}
    </form>
)}




<div className="max-w-4xl mx-auto w-full">
  {comments.length ===0 ?(<p className="text-sm my-5">No comments yet !</p>):(
     <>
      <div className="text-sm my-5 flex items-center gap-1">
        <p>Comments</p>
        <div className="border border-gray-400 px-2 ">
          <p>{comments.length}</p>
        </div>
      
      </div>
      <div>
       {comments.map((com)=>{
          return(
           com._id && <Comment key={com._id} comment={com} onLike={handleLike} onEdit={handleEdit}/>
          )
        })}
       </div>
     </>
    )}
  </div>
</div>
  )
   
}



CommentSection.propTypes = {
    postId: PropTypes.element.isRequired, // Example of prop validation
  };


export default CommentSection
   