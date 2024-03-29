
import { Alert, Button, Spinner } from "flowbite-react"
import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import CallAction from "../component/CallAction"
import {useSelector} from "react-redux"

function Postpage() {
    const {postSlug} = useParams()
  const [loading,setLoading] = useState()
  const [error,setError] = useState(false)
  const [post,setPost] = useState(null)
  const {currentUser} = useSelector((state)=>state.user)
  
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
            }

        } 
        catch (error) {
            setError(true)
            setLoading(false)
        }
       }

       fetchPost()
    },[postSlug])

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
  {error && (<Alert color="failure">{error}</Alert>)}
   </main>
  )
}

export default Postpage
