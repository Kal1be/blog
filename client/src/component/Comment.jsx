import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import moment from "moment"
import {FaThumbsUp} from "react-icons/fa"
import { useSelector } from "react-redux"



 function Comment({comment,onLike}) {
  // const [comments,setComments] = useState([])
  const {currentUser} = useSelector((state)=>state.user)
  const [user,setUser] = useState({})

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


   
  return (
    <div className='items-center my-3 border-b p-2 border-gray-600'>
      <div className='flex gap-2'>
        <img src={user?.profilePicture} className='w-10 h-10 rounded-full' alt={user?.username} />
      
      <div className='bold items-center'>
        <span className='font-bold block truncate mr-1 text-xs'>{user ? `@${user.username}`:"anonymous user"}</span>
        <span className='text-gray-500 text-xs'>{moment(comment.createdAt).fromNow()}</span>
        <p>{comment.content}</p>
         <div className='flex gap-1 pt-2  items-center'>
          <button type='button' className={`hover:text-blue-500 text-gray-400 text-sm ${currentUser && comment.likes.includes(currentUser._id) && "!text-blue-500"}  `} 
          onClick={()=>{onLike(comment._id)}}>
            <FaThumbsUp/>
          </button>
          <p>{comment.numberOfLikes > 0 && comment.numberOfLikes + " " +(comment.numberOfLikes===1 ? "like":"likes") }</p>
         </div>
      </div>
      </div>
       
    </div>
  )
}


Comment.propTypes = {
  onLike:PropTypes.func.isRequired,
    comment: PropTypes.object.isRequired, // Example of prop validation
  };

  export default Comment
