import { Button, Modal, Table } from "flowbite-react"
import {useEffect, useState} from "react"
import {useSelector} from "react-redux"
import { HiOutlineExclamationCircle } from "react-icons/hi"
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
// import { faCheck, faClose } from "@fortawesome/free-solid-svg-icons"

function DashComments() {
  const [comments,setComments] = useState([])
  const {currentUser} = useSelector((state)=>state.user)
  const [showMore,setShowMore] = useState(true)
  const [showModal,setShowModal] = useState(false)
  const [commentsToDelete,setCommentsToDelete] = useState(null)

  console.log(comments)

const handleShowMore = async ()=>{
  const startIndex = comments.length

  try {
    const res = await fetch(`/api/comment/getcomments?startIndex=${startIndex}`)
    const data = await res.json()
    if(res.ok){
      setComments((prev)=>[...prev,...data.comments])
      if(data.comments.length < 9){
        setShowMore(false)
      }
    }
     
  } catch (error) {
    console.log(error)
  }
}

useEffect(()=>{

  const fetchComment = async ()=>{
   try {
    const res = await fetch(`/api/comment/getcomments`,{method:"GET"})
    const data = await res.json()
     if(res.ok){
    setComments(data.comments)
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
  fetchComment()
}

},[currentUser._id])



const handleComment=async()=>{
setShowModal(false)

try {
  const res = await fetch(`/api/comment/deleteComment/${commentsToDelete}`,{
    method:"DELETE",

  })
  const data = await res.json()
  if(res.ok){
    setComments((prev)=>{
        prev.filter((comment)=>comment._id !== commentsToDelete)
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

  return <div className="table-auto
   md:mx-auto p-3 scrollbar scrollbar-track-slate-100
    scrollbar-thumb-slate-300 dark:scrollbar-thumb-slate-500 dark:scrollbar-track-slate-700">
    {currentUser.isAdmin && comments.length > 0 ? (
       <>
       <Table hoverable className="shadow-md">
  <Table.Head>
   <Table.HeadCell className="dark:text-white">Date created
   </Table.HeadCell>
   <Table.HeadCell className="dark:text-white">Comment content
   </Table.HeadCell>
   <Table.HeadCell className="dark:text-white">Number of likes
   </Table.HeadCell>
   <Table.HeadCell className="dark:text-white">PostId
   </Table.HeadCell>
   <Table.HeadCell className="dark:text-white">UserId
   </Table.HeadCell>
   <Table.HeadCell className="dark:text-white">Delete
   </Table.HeadCell>
   
  </Table.Head>
  {comments.map((comment)=>{
    return(
      <Table.Body key={comment.id} className="divide-y">
      <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
        <Table.Cell>{new Date(comment.updatedAt).toLocaleDateString()}</Table.Cell>
        <Table.Cell>
        {comment.content}
          </Table.Cell>
        <Table.Cell className="font-medium text-gray-900 dark:text-white">{comment.numberOfLikes}</Table.Cell>
        <Table.Cell>{comment.postId}</Table.Cell>
        <Table.Cell>{comment.userId}</Table.Cell>

        <Table.Cell>
          <span
          onClick={()=>{
            setCommentsToDelete(comment._id)
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
    ):<p>You have not comments yet</p> }

<Modal show={showModal} onClose={()=>{setShowModal(false)}} popup size="md">
      <Modal.Header/>
      <Modal.Body>
        <div className="text-center">
<HiOutlineExclamationCircle className="h-16 w-16 text-gray-400 dark:text-gray-200 mb-4 mx-auto"/>
<h3 className="mb-5 text-lg text-gray-500 dark:text-gray-200">Are you sure you want to delete this user ?</h3>
<div className="flex justify-center gap-4">
<Button color="failure" onClick={handleComment}>
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

export default DashComments
