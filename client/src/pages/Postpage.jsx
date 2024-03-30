
import { Alert, Button, Spinner } from "flowbite-react"
import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import CallAction from "../component/CallAction"
import {useSelector} from "react-redux"
// import CommentSection from "../component/CommentSection"
import {Textarea } from "flowbite-react"
import Comment from "../component/Comment"

const Postpage=()=> {
  const [comments,setComments] = useState([])

  const [comment,setComment] = useState([])

    const {postSlug} = useParams()
  const [loading,setLoading] = useState()
  const [error,setError] = useState(false)
  const [post,setPost] = useState(null)
  const {currentUser} = useSelector((state)=>state.user)
  console.log(comment)
    useEffect(()=>{
       const fetchPost = async ()=>{
        try {
            setLoading(true)
            const res = await fetch(`/api/post/getposts?slug=${postSlug}`)
            const data = await res.json()

            if(!res.ok){
                setError(true)
                setLoading(false)
                return
            }
            if(res.ok){
                setPost(data.posts[0])
                setLoading(false)
                setError(false)
  console.log(currentUser._id,post._id)

            }

        } 
        catch (error) {
            setError(true)
            setLoading(false)
        }
       }

       fetchPost()
    },[postSlug])


    const handleSubmit = async (e)=>{
      e.preventDefault()
      if(comments.length > 200){
        return 
      }

      try {
        const res = await fetch("/api/comment/create",{
          method:"POST",
          headers:{
            "Content-Type":"application/json"
          },
          body:JSON.stringify({content:comments,postId:post._id,userId:currentUser._id})
        })
  
        
        const data = await res.json()
  
        if(res.ok){
          setComments("")
          setComment([data,...comment])
          setError(null)
        }
        
      } catch (error) {
       setError(error.message)
      }

    }

    useEffect(()=>{

  const getComments = async() =>{
    const res = await fetch(`/api/comment/getpostcomments/${post._id}`)
    const data = await res.json()
    if(res.ok){
      setComment(data)
    }

  }

  getComments()

    },[post && post._id])


    if(loading) return (
        <div className="flex justify-center items-center min-h-screen">
            <Spinner size='xl'/>
        </div>
    )
  return (
   <main className="p-3 flex flex-col max-w-6xl mx-auto min-h-screen"> 
<h2 className="text-xl mt-8">{currentUser.isAdmin && (
  <div className="flex gap-2 items-center">
    <img src={currentUser.profilePicture} className="rounded-full w-12 h-12" alt="" />
    <p className="font-bold">{currentUser.username}</p>
  </div>
)}</h2>
<h1 className="text-center  text-3xl font-serif  lg:text-4xl mt-8 py-2">{post && post.title}</h1>
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

      <div className="max-w-5xl mx-auto w-full p-3">
        {
            currentUser ? (
   <div className="flex items-center gap-1 my-5 text-gray-500 text-sm">
    <p>Signed in as:</p>
    <img src={currentUser.profilePicture} className="h-5 w-5 object-cover rounded-full" alt="" />
    <Link to={"/dashboard?tab=profile"} className="text-xs text-cyan-600 hover:underline">
        @{currentUser.username}
    </Link>
     </div>
            ):(
                <div className="text-teal-500 my-5 ">you must be signed in to comment<Link to={"/sign-in"} className="text-sm text-red-400">Sign-in</Link></div>
            )
        }

        <div>
            {currentUser && (
            <form className="border-2 rounded-md p-4" onSubmit={handleSubmit}>
                <Textarea type="text" 
                onChange={(e)=>{
                    setComments(e.target.value)
                    
                }}
                value={comments}
                rows="4"
                maxLength="200"
                placeholder="add comment"/>
                <div className="flex items-center justify-between mt-8">
                    <p className="text-gray-500">{200 - comments.length} characteres remaining</p>
                    <button className="bg-green-700 text-white py-2 rounded-md px-3" type="submit">Submit</button>
                </div>
            </form>
        )}
        </div>
      
    </div>
  <div className="max-w-4xl mx-auto w-full">
  {comment.length ===0 ?(<p className="text-sm my-5">No comments yet !</p>):(
     <>
      <div className="text-sm my-5 flex items-center gap-1">
        <p>Comments</p>
        <div className="border border-gray-400 px-2 ">
          <p>{comment.length}</p>
        </div>
      
      </div>
      <div>
       {comment.map((com)=>{
          return(
            <Comment key={com._id} comment={com}/>
          )
        })}
       </div>
     </>
    )}
  </div>
  
  {error && (<Alert color="failure">{error}</Alert>)}
   </main>
  )
}

export default Postpage
