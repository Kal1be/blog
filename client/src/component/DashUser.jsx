import { Button, Modal, Table } from "flowbite-react"
import {useEffect, useState} from "react"
import {useSelector} from "react-redux"
import { HiOutlineExclamationCircle } from "react-icons/hi"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCheck, faClose } from "@fortawesome/free-solid-svg-icons"

function DashUser() {
  const [users,setUsers] = useState([])
  const {currentUser} = useSelector((state)=>state.user)
  const [showMore,setShowMore] = useState(true)
  const [showModal,setShowModal] = useState(false)
  const [userIdToDelete,setUserIdToDelete] = useState(null)

const handleShowMore = async ()=>{
  const startIndex = users.length

  try {
    const res = await fetch(`/api/users/getusers?startIndex=${startIndex}`)
    const data = await res.json()
    if(res.ok){
      setUsers((prev)=>[...prev,...data.users])
      if(data.posts.length < 9){
        setShowMore(false)
      }
    }
     
  } catch (error) {
    console.log(error)
  }
}

useEffect(()=>{

  const fetchPost = async ()=>{
   try {
    const res = await fetch(`/api/user/getusers`)
    const data = await res.json()
     if(res.ok){
    setUsers(data.users)
     if(data.users<9){ 
    setShowMore(false)

     }
  }

   if(!res.ok){
    console.log(data.error)
   }
    
   } catch (error) {
    console.log(error.message)
   }
  }
if(currentUser.isAdmin){
  fetchPost()
}

},[currentUser._id])



const handleDeletePost=async()=>{
setShowModal(false)

try {
  const res = await fetch(`/api/user/delete/${userIdToDelete}`,{
    method:"DELETE",

  })
  const data = await res.json()
  if(res.ok){
    setUsers((prev)=>{
        prev.filter((user)=>user._id !== userIdToDelete)
      })
      window.location.reload(false)
  }
  
  else{
    console.log(data.message)
    
  }
  
}

catch (error) {
  console.log(error.message)
}

}

  return <div className="table-auto w-full h-[800px] overflow-y-scroll overflow-x-scroll
   md:mx-auto p-3 scrollbar scrollbar-track-slate-100
    scrollbar-thumb-slate-300 dark:scrollbar-thumb-slate-500 dark:scrollbar-track-slate-700">
    {currentUser.isAdmin && users.length > 0 ? (
       <>
       <Table hoverable className="shadow-md">
  <Table.Head>
   <Table.HeadCell className="dark:text-white">Date created
   </Table.HeadCell>
   <Table.HeadCell className="dark:text-white">User image
   </Table.HeadCell>
   <Table.HeadCell className="dark:text-white">Username
   </Table.HeadCell>
   <Table.HeadCell className="dark:text-white">Email
   </Table.HeadCell>
   <Table.HeadCell className="dark:text-white">Admin
   </Table.HeadCell>
   <Table.HeadCell className="dark:text-white">Delete
   </Table.HeadCell>
   
  </Table.Head>
  {users.map((post)=>{
    return(
      <Table.Body key={post.id} className="divide-y">
      <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
        <Table.Cell>{new Date(post.updatedAt).toLocaleDateString()}</Table.Cell>
        <Table.Cell>
        
            <img src={post.profilePicture}  alt={post.username} className="w-16 h-16 object-cover bg-gray-500 rounded-full" />
        </Table.Cell>
        <Table.Cell className="font-medium text-gray-900 dark:text-white">{post.username}</Table.Cell>
        <Table.Cell>{post.email}</Table.Cell>
        <Table.Cell>{post.isAdmin ?<FontAwesomeIcon icon={faCheck} className="text-green-500 text-xl"/>: <FontAwesomeIcon icon={faClose} className="text-red-500 text-xl"/>}</Table.Cell>

        <Table.Cell>
          <span
          onClick={()=>{
            setUserIdToDelete(post._id)
            setShowModal(true)
          }}
          className="text-red-500 cursor-pointer hover:underline">Delete</span>
        </Table.Cell>
      </Table.Row>
    </Table.Body>
    )   
   
  })}
     </Table>  

     {
      showMore ? (<button 
        onClick={handleShowMore}
        className="w-full test-teal-500 self-center text-sm py-7 font-medium ">Show more...</button>):<button    className="w-full test-teal-500 self-center text-sm py-7 font-medium " onClick={()=>{
          setShowMore(true)
        }}>Show less...</button>
     }
       </>
    ):<p>You have not user yet</p> }

<Modal show={showModal} onClose={()=>{setShowModal(false)}} popup size="md">
      <Modal.Header/>
      <Modal.Body>
        <div className="text-center">
<HiOutlineExclamationCircle className="h-16 w-16 text-gray-400 dark:text-gray-200 mb-4 mx-auto"/>
<h3 className="mb-5 text-lg text-gray-500 dark:text-gray-200">Are you sure you want to delete this user ?</h3>
<div className="flex justify-center gap-4">
<Button color="failure" onClick={handleDeletePost}>
  Yes, I`m sure
</Button>
<Button color="gray" onClick={()=>{setShowModal(false)}}>
  Cancel
</Button>
</div>
        </div>

      </Modal.Body>
     </Modal>
  </div>
}

export default DashUser
