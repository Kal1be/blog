import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import moment from "moment"
import {FaThumbsUp} from "react-icons/fa"
import { useSelector } from "react-redux"
import { Textarea } from 'flowbite-react';



 function Comment({comment,onLike,onEdit}) {
  // const [comments,setComments] = useState([])
  const {currentUser} = useSelector((state)=>state.user)
  const [isEditing,setIsEditing] = useState(false)
  const [user,setUser] = useState({})
const [editComment,setEditComment] = useState(comment.content)

  const handleEdit = async ()=>{
    setIsEditing(true)
    setEditComment(comment.content)

  }  

  // the useeffevt function 

    useEffect(()=>{
      const getUser = async()=>{
        try {
if(!comment.userId){
  return 
}

         const res = await fetch(`/api/user/${comment.userId} `)

         const data = await res.json()

         if(res.ok){
          setUser(data)
         }
          
        } catch (error) {
          console.log(error.message)
        }
      }

      getUser()
    },[comment])

const handleSave = async ()=>{
  try {
    const res = await fetch(`/api/comment/editComment/${comment._id}`,{
      method:"PUT",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({content:editComment})
    })

    const data = await res.json()
    if(res.ok){
      setIsEditing(false)
      onEdit(comment._id,editComment)
    }
    
  } catch (error) {
    console.log(error.message)
  }

}
   
  return (
    <div className='items-center my-3 border-b p-2 border-gray-300'>
      <div className='flex gap-2'>
        <img src={user?.profilePicture} className='w-10 h-10 rounded-full' alt={user?.username} />
      
      <div className='items-center w-full'>
        <span className='font-bold block truncate mr-1 text-xs'>{user ? `@${user.username}`:"anonymous user"}</span>
        <span className='text-gray-500 text-xs'>{moment(comment.createdAt).fromNow()}</span>
        
        {isEditing ? (
        <>
        <Textarea type="text" className='!w-full mb-2' 
        onChange={(e)=>{
            setEditComment(e.target.value) 
            
        }}
        value={editComment}
        rows="4"
        maxLength="200"
        placeholder="add comment"/>

        <div className='flex items-center justify-between mt-3'>
          <button className='bg-green-600 text-white rounded-md px-4 py-1 ' onClick={()=>setIsEditing(false)}>Cancel</button>
          <button className='bg-teal-700 rounded-md px-4 py-1 ' onClick={handleSave}>Save</button>
        </div>
        </>
        ): 
      (  <>
         <p>{comment.content}</p>
      <div className='flex gap-1 pt-2  items-center'>
          <button type='button' className={`hover:text-blue-500 text-gray-400 text-sm ${currentUser && comment.likes.includes(currentUser._id) && "!text-blue-500"}  `} 
          onClick={()=>{onLike(comment._id)}}>
            <FaThumbsUp/>
          </button>
          <p>{comment.numberOfLikes > 0 && comment.numberOfLikes + " " +(comment.numberOfLikes===1 ? "like":"likes") }</p>
          {
            currentUser && (currentUser.id === comment.userId || currentUser.isAdmin) && (
              <button onClick={handleEdit} className='hover:text-blue-500 text-gray-400'>Edit</button>
            )
          }
         </div>
        </>)
      }
      </div>
     
      </div>
       
    </div>
  )
}


Comment.propTypes = {
  onLike:PropTypes.func.isRequired,
  onEdit:PropTypes.func.isRequired,
    comment: PropTypes.object.isRequired, // Example of prop validation
  };

  export default Comment
