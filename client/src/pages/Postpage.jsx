
import { useEffect, useState } from "react"
import { Alert, Button, Spinner } from "flowbite-react"
import { Link, useParams } from "react-router-dom"
import CallAction from "../component/CallAction"
// import {useSelector} from "react-redux"
import CommentSection from "../component/CommentSection"
import PostCard from "../component/PostCard"
// import CommentSection from "../component/CommentSection"
const Postpage=()=> {

    const {postSlug} = useParams()
  const [loading,setLoading] = useState()
  const [error,setError] = useState("")
  const [post,setPost] = useState(null)
  const [recentPost,setRecentPost] = useState(null)
  // const {currentUser} = useSelector((state)=>state.user)


    useEffect(()=>{
       const fetchPost = async ()=>{
        try {
            setLoading(true)
            const res = await fetch(`/api/post/getposts?slug=${postSlug}`)
            const data = await res.json()

            if(!res.ok){
                setError("")
                setLoading(false)
                return
            }
            if(res.ok){
                setPost(data.posts[0])
                setLoading(false)
                setError("")

            }

        } 
        catch (error) {
            console.log(error.message)
            setLoading(false)
        }
       }

       fetchPost()
    },[postSlug])


    useEffect(()=>{
      try {

        const fetchRecentPosts = async ()=>{
          const res = await fetch(`/api/post/getposts?limit=3`)

          const data = await res.json()

      if(res.ok){
        console.log(recentPost)
        setRecentPost(data.posts)
      }
        }


        fetchRecentPosts()
        
      } catch (error) {
        console.log(error.message)
      }
    },[recentPost])


    if(loading) return (
        <div className="flex justify-center items-center min-h-screen">
            <Spinner size='xl'/>
        </div>
    )
  return (
   <main className="p-3 flex flex-col max-w-6xl mx-auto min-h-screen"> 
{/* <h2 className="text-xl mt-8">{currentUser.isAdmin && (
  <div className="flex gap-2 items-center">
    <img src={currentUser.profilePicture} className="rounded-full w-12 h-12" alt="" />
    <p className="font-bold">{currentUser.username}</p>
  </div>
)}</h2> */}
<h1 className="text-center  text-3xl font-serif  lg:text-4xl mt-12 py-2">{post && post.title}</h1>
<Link to={`/search?category=${post && post.category}`} className="self-center mt-5">
<Button color="gray" pill size='xl'>{post && post.category}</Button>
</Link>

<img src={post && post.image} alt={post && post.title}  className="mt-7 p-3 md:max-h-[500px] max-h-[900px] shadow-xl w-full object-cover"/>
  <div className="flex justify-between p-3  border-b  border-slate-500 mx-auto w-full max-w-2xl md:text-lg text-sm">
    <span>{post && new Date(post.createdAt).toLocaleDateString()}</span>
    <span className="font-italic">{post && (post.content.length/1000).toFixed(0)}mins read</span>
  </div>

  <div className="p-3 mx-auto max-w-5xl  w-full post-content" dangerouslySetInnerHTML={{__html:post && post.content}}>
    
  </div>
  <div className="max-w-6xl mx-auto w-full dark:text-white">
<CallAction/>
  </div>

     <div>
      
 {post && <CommentSection postId={post._id}/>}
     </div>
     
     <div className="flex-col mt-16 mb-12">
   <h1 className="text-center text-lg font-medium">Recent articles </h1>
   <div className="md:flex gap-5 justify-center w-full  mt-10">
    {recentPost && recentPost.map((post)=>(
       <PostCard key={post._id} post={post}/>
  ))}
   </div>
     </div>




 {error && (<Alert color="failure">{error}</Alert>)}
  
   </main>
  )
}

export default Postpage




