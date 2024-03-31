import { Link } from "react-router-dom"
import CallAction from "../component/CallAction"
import { useEffect, useState } from "react"
import Postcard from "../component/PostCard"
function Home() {
  const [post,setPost] = useState([])

  useEffect(()=>{

    const fetchPosts = async ()=>{
      const res = await fetch("api/post/getposts")
  const data = await res.json()

if(res.ok){
  setPost(data.posts)
  console.log(data.posts)
}
    }

    fetchPosts()
  },[])
  return (
    <div className="max-w-7xl mx-auto w-full md:mt-28 mt-12 px-3 md:px-0 mb-10">
      <div className="max-w-3xl mt-12 w-full mb-10 md:mx-4">
        <h2 className="md:text-5xl text-2xl font-bold mt-2 mb- text-green-600">Welcome to Distance Learning Center</h2>
        <p className="text-gray-500 my-4 text-xs sm:text-sm">Distance Learning Center is a platform for online course for
           AHmadu Bello university,the platform are building for integrating
            the teaching of school online for everybody and anyone in the world who want to school in ABU.</p>
            <Link to='search'className="text-xs sm:text-sm text-teal-500 font-bold hover:underline">View all posts</Link>
      </div>
       <div className="bg-gray-100 dark:bg-slate-700">
       <CallAction/>
       </div>
       <div className="max-w-6xl mx-auto p-3 flex flex-col gap-8 py-7">
      { post && post.length >0 && (
  <div className="flex flex-col gap-6">
    <h1 className="text-2xl font-semibold text-center">Recent Posts</h1>
    <div className="flex flex-wrap gap-4">
      {post.map((pos)=>(
        <Postcard key={pos._id} post={pos}/>
      ))}
    </div>
    <Link to="/search" className="text-lg text-teal-600 text-center hover:underline">View all posts</Link>

  </div>
        )}
       </div>
    </div>   
  )
}

export default Home
