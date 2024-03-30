import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import moment from "moment"

 function Comment({comment}) {
  const [user,setUser] = useState(null)
  console.log(comment.userId,user)
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
      </div>
      </div>
      
    </div>
  )
}


Comment.propTypes = {
    comment: PropTypes.element.isRequired, // Example of prop validation
  };

  export default Comment
