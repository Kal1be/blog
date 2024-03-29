import { Button, Modal, Table } from "flowbite-react"
import {useEffect, useState} from "react"
import {Link} from "react-router-dom"
import {useSelector} from "react-redux"
import { HiOutlineExclamationCircle } from "react-icons/hi"

function DashPost() {
  const [userPosts,setUserPosts] = useState([])
  const {currentUser} = useSelector((state)=>state.user)
  const [showMore,setShowMore] = useState(true)
  const [showModal,setShowModal] = useState(false)
  const [postIdToDelete,setPostPostIdToDelete] = useState(null)

const handleShowMore = async ()=>{
  const startIndex = userPosts.length

  try {
    const res = await fetch(`/api/post/getposts?userId?=${currentUser._id}&startIndex=${startIndex}`)
    const data = await res.json()
    if(res.ok){
      setUserPosts((prev)=>[...prev,...data.posts])
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
    const res = await fetch(`/api/post/getposts?userId=${currentUser._id}`)
    const data = await res.json()
    console.log(data.posts)
   if(res.ok){
    setUserPosts(data.posts)
     if(data.posts<9){
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
  const res = await fetch(`/api/post/deletepost/${postIdToDelete}/${currentUser._id}`,{
    method:"DELETE",

  })
  const data = await res.json()
  if(!res.ok){
    console.log(data.message)
  }
  
  else{
    setUserPosts((prev)=>{
      prev.filter((post)=>post._id !== postIdToDelete)
    })
    window.location.reload(false)
  }
  
} catch (error) {
  console.log(error.message)
}
}

  return <div className="table-auto w-full md:h-[800px] overflow-y-scroll overflow-x-scroll
   md:mx-auto p-3 scrollbar scrollbar-track-slate-100
    scrollbar-thumb-slate-300 dark:scrollbar-thumb-slate-500 dark:scrollbar-track-slate-700">
    {currentUser.isAdmin && userPosts.length > 0 ? (
       <>
       <Table hoverable className="shadow-md">
  <Table.Head>
   <Table.HeadCell className="dark:text-white">Date Updated
   </Table.HeadCell>
   <Table.HeadCell className="dark:text-white">Post image
   </Table.HeadCell>
   <Table.HeadCell className="dark:text-white">Post title
   </Table.HeadCell>
   <Table.HeadCell className="dark:text-white">Category
   </Table.HeadCell>
   <Table.HeadCell className="dark:text-white">Delete
   </Table.HeadCell>
   <Table.HeadCell className="dark:text-white">
    <span>Edit</span>
   </Table.HeadCell>
   
  </Table.Head>
  {userPosts.map((post)=>{
    return(
      <Table.Body key={post.id} className="divide-y">
      <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
        <Table.Cell>{new Date(post.updatedAt).toLocaleDateString()}</Table.Cell>
        <Table.Cell>
          <Link to={`/post/${post.slug}`}>
            <img src={post.image}  alt={post.title} className="w-16 h-16 object-cover bg-gray-500 rounded-full" />
          </Link>
        </Table.Cell>
        <Table.Cell className="font-medium text-gray-900 dark:text-white">{post.title}</Table.Cell>
        <Table.Cell>{post.category}</Table.Cell>
        <Table.Cell>
          <span
          onClick={()=>{
            setPostPostIdToDelete(post._id)
            setShowModal(true)
          }}
          className="text-red-500 cursor-pointer hover:underline">Delete</span>
        </Table.Cell>
        <Table.Cell>
      <Link to={`/update-post/${post._id}`}>
      <span className="text-teal-500">Edit</span>
      </Link>
        </Table.Cell>
      </Table.Row>
    </Table.Body>
    )   
   
  })}
     </Table>  

     {
      showMore ? (<button 
        onClick={handleShowMore}
        className="w-full test-teal-500 self-center text-sm py-7 font-medium ">Show more...</button>):<button  
          className="w-full test-teal-500 self-center text-sm py-7 font-medium " onClick={()=>{
          setShowMore(true)
        }}>Show less...</button>
     }
       </>
    ):<p>You have not posts yet</p> }

<Modal show={showModal} onClose={()=>{setShowModal(false)}} popup size="md">
      <Modal.Header/>
      <Modal.Body>
        <div className="text-center">
<HiOutlineExclamationCircle className="h-16 w-16 text-gray-400 dark:text-gray-200 mb-4 mx-auto"/>
<h3 className="mb-5 text-lg text-gray-500 dark:text-gray-200">Are you sure you want to delete this post ?</h3>
<div className="flex justify-center gap-4">
<Button color="failure" onClick={handleDeletePost   }>
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

export default DashPost
