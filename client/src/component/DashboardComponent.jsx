import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import {HiOutlineUserGroup, HiArrowNarrowUp, HiAnnotation, HiDocumentText} from "react-icons/hi"
import { Link } from "react-router-dom"
import { Table } from "flowbite-react"


function DashboardComponent() {
const [users,setUsers] = useState([])
const [comments,setComments] = useState([])
const [post,setPosts] = useState([])
const [totalUsers,setTotalUsers] = useState(0)
const [totalPosts,setTotalPosts] = useState(0)
const [totalComments,setTotalComments] = useState(0)
const [lastMonthComments,setlastMonthComments] = useState(0)
const [lastMonthUsers,setlastMonthUsers] = useState(0)
const [lastMonthPosts,setlastMonthPosts] = useState(0)
const {currentUser} = useSelector((state)=>state.user)

useEffect(()=>{
const fetchUsers=async()=>{
try {
    const res = await fetch(`/api/user/getusers?limit=5`)

const data = await res.json()

if(res.ok){
    setUsers(data.users)
    setTotalUsers(data.totalUsers)
    setlastMonthUsers(data.lastMonthUsers)
}
    
} catch (error) {
    console.log(error.message)
}
}

const fetchPosts = async ()=>{
    try {
        const res = await fetch(`/api/post/getposts?limit=5`)
    
    const data = await res.json()
    
    if(res.ok){
        setPosts(data.posts)
        setTotalPosts(data.totalPosts)
        setlastMonthPosts(data.lastMonthPosts)
    }
        
    } catch (error) {
        console.log(error.message)
    }

}

const fetchComments = async ()=>{
    try {
        const res = await fetch(`/api/comment/getcomments?limit=5`)
    
    const data = await res.json()
    
    if(res.ok){
        setComments(data.comments)
        setTotalComments(data.totalComments)
        setlastMonthComments(data.lastMonthAgo)
    }
        
    } catch (error) {
        console.log(error.message)
    }

}

if(currentUser.isAdmin){
    fetchUsers()
    fetchPosts()
    fetchComments()
}

},[currentUser])

  return (

    <div className="p-3 w-full   md:mx-auto">
      <div className="md:flex md:flex-wrap gap-4 justify-center">
      <div  className="flex flex-col p-3 md:w-72 my-3  dark:bg-slate-800 md:h-32  rounded-md shadow-md">
          <div className="flex justify-between">
          <div>
                <h3 className="text-gray-500 text-md uppercase">Total Users</h3>
                <p className="text-lg">{totalUsers}</p>
            </div>
                <HiOutlineUserGroup className="bg-green-700 shadow-lg text-white rounded-full p-3 text-5xl"/>
          </div>
            <div className="flex gap-2 text-sm">
                <span className="text-green-500 flex items-center">
                    <HiArrowNarrowUp/> 
                    {lastMonthUsers}
                </span>
                <div className="text-gray-500">Last month</div>
            </div>
        </div>
        <div  className="flex flex-col p-3 md:w-72 my-3  dark:bg-slate-800 md:h-32  rounded-md shadow-md">
          <div className="flex justify-between">
          <div>
                <h3 className="text-gray-500 text-md uppercase">Total Comments</h3>
                <p className="text-lg">{totalComments}</p>
            </div>
                <HiAnnotation className="bg-blue-700 shadow-lg text-white rounded-full p-3 text-5xl"/>
          </div>
            <div className="flex gap-2 text-sm">
                <span className="text-green-500 flex items-center">
                    <HiArrowNarrowUp/> 
                    {lastMonthComments}
                </span>
                <div className="text-gray-500">Last month</div>
            </div>
        </div>
        <div  className="flex flex-col p-3 md:w-72 my-3  dark:bg-slate-800 md:h-32  rounded-md shadow-md">
          <div className="flex justify-between">
          <div>
                <h3 className="text-gray-500 text-md uppercase">Total Posts</h3>
                <p className="text-lg">{totalPosts}</p>
            </div>
                <HiDocumentText className="bg-teal-600 shadow-lg text-white rounded-full p-3 text-5xl"/>
          </div>
            <div className="flex gap-2 text-sm">
                <span className="text-green-500 flex items-center">
                    <HiArrowNarrowUp/> 
                    {lastMonthPosts}
                </span>
                <div className="text-gray-500">Last month</div>
            </div>
        </div>
      </div>

      <div className="w-full max-w-4xl flex-wrap gap-3 mx-auto justify-center">
        <div className="flex w-full flex-col  md:w-auto shadow-md p-2 rounded-md dark:bg-gray-800">
            <div className="flex justify-between gap-3 items-center ">
                <h1 className="text-center p-2">Recent Users </h1>
                <button className="border px-4 py-1 rounded-lg ">
                    <Link to={`/dashboard?tab=users`}>See all</Link>
                </button>
            </div>
            <Table hoverable>
                <Table.Head>
                    <Table.HeadCell>User image</Table.HeadCell>
                    <Table.HeadCell>Username</Table.HeadCell>
                </Table.Head>
                {users && users.map((user)=>(
                    <Table.Body key={user._id} className="divide-y">
                        <Table.Row className="bg-white mt-3 dark:border-gray-700 dark:bg-gray-800">
                        <Table.Cell>
  <img src={user.profilePicture} className="w-10 h-10 rounded-full bg-gray-500" alt="" />
                        </Table.Cell>
                        <Table.Cell>
                           {user.username}
                        </Table.Cell>
                        </Table.Row>
                    </Table.Body>
                ))}
            </Table>
        </div>
        <div className="flex flex-col w-full md:w-auto shadow-md p-2 rounded-md dark:bg-gray-800">
            <div className="flex justify-between gap-3 items-center ">
                <h1 className="text-center p-2">Recent comments</h1>
                <button className="border px-4 py-1 rounded-lg ">
                    <Link to={`/dashboard?tab=comments`}>See all</Link>
                </button>
            </div>
            <Table hoverable>
                <Table.Head>
                    <Table.HeadCell>Comments content</Table.HeadCell>
                    <Table.HeadCell>Likes</Table.HeadCell>
                </Table.Head>
                {comments && comments.map((user)=>(
                    <Table.Body key={user._id} className="divide-y">
                        <Table.Row className="bg-white mt-3 dark:border-gray-700 dark:bg-gray-800">
                        <Table.Cell>
                        <p className="line-clamp-2 truncate">  {user.content}</p>
                        </Table.Cell>
                        <Table.Cell>
                           {user.numberOfLikes}
                        </Table.Cell>
                        </Table.Row>
                    </Table.Body>
                ))}
            </Table>
        </div>
        <div className="flex flex-col w-full md:w-auto shadow-md p-2 rounded-md dark:bg-gray-800">
            <div className="flex justify-between gap-3 items-center ">
                <h1 className="text-center p-2">Recent Posts </h1>
                <button className="border px-4 py-1 rounded-lg ">
                    <Link to={`/dashboard?tab=posts`}>See all</Link>
                </button>
            </div>
            <Table hoverable>
                <Table.Head>
                    <Table.HeadCell>Post image</Table.HeadCell>
                    <Table.HeadCell>Post Title</Table.HeadCell>
                    <Table.HeadCell>Category</Table.HeadCell>
                </Table.Head>
                {post && post.map((user)=>(
                    <Table.Body key={user._id} className="divide-y">
                        <Table.Row className="bg-white mt-3 dark:border-gray-700 dark:bg-gray-800">
                        <Table.Cell>
                       <Link to={`/post/${user.slug }`}>  
                         <img src={user.image} className="w-14 h-10 rounded-md bg-gray-500" alt="" /></Link>
                        </Table.Cell>
                        <Table.Cell className="w-96">
                           {user.title}
                        </Table.Cell>
                        <Table.Cell className="w-5">
                           {user.category}
                        </Table.Cell>
                        </Table.Row>
                    </Table.Body>
                ))}
            </Table>
        </div>
      
      </div>
       
    </div>
  )
}

export default DashboardComponent
