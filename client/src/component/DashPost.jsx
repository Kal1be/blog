import { Table } from "flowbite-react"
import {useEffect, useState} from "react"
import {Link} from "react-router-dom"
import {useSelector} from "react-redux"

function DashPost() {
  const [userPosts,setUserPosts] = useState([])
  const {currentUser} = useSelector((state)=>state.user)
console.log(userPosts)

useEffect(()=>{

  const fetchPost = async ()=>{
   try {
    const res = await fetch(`/api/post/getposts?userId=${currentUser._id}`)
    const data = await res.json()
    console.log(data.posts)
   if(res.ok){
    setUserPosts(data.posts)
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

  return <div className="table-auto w-full overflow-x-scroll
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
          <span className="text-red-500 cursor-pointer hover:underline">Delete</span>
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
       </>
    ):<p>You have not posts yet</p> }
  </div>
}

export default DashPost
