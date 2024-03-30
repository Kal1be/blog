import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

 function Comment({com}) {
  const [user,setUser] = useState({})
    useEffect(()=>{
      const getUser = async()=>{
        try {
         const res = await fetch(`/api/user/${com.userId} `)

         const data = await res.json()

         if(res.ok){
          setUser(data)
         }
          
        } catch (error) {
          console.log(error.message)
        }
      }

      getUser()
    },[com])
  return (
    <div>
      <div>
        <img src={user.profilePicture} className='w-10 h-10 rounded-full bg-gray-200' alt="" />
      </div>
      <div>
        <span className='font-bold truncate mr-1 text-xs'>{user ? `@${user.username}`:"anonymous user"}</span>
      </div>
      
    </div>
  )
}


Comment.propTypes = {
    com: PropTypes.element.isRequired, // Example of prop validation
  };

  export default Comment
