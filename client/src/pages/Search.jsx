import { Select, Sidebar, Spinner, TextInput } from "flowbite-react"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import PostCard from "../component/PostCard"

function Search() {
  const navigate = useNavigate()
  const [sideBar,setSideBar] = useState({
    searchTerm:"",
    sort:"desc",
    category:"uncategorized"
  })
  const [posts,setPosts] = useState([])
  const [showMore,setShowMore] = useState(false)
  const [loading,setLoading] = useState(false)
console.log(posts)
  useEffect(()=>{
    const urlParams =new URLSearchParams(location.search)
    const searchTermFromUrl = urlParams.get("searchTerm")
    const sortFromUrl = urlParams.get("sort")
    const categoryFromUrl = urlParams.get("category")

    if(searchTermFromUrl || sortFromUrl || categoryFromUrl ){
      setSideBar({
        ...sideBar,
        searchTerm:searchTermFromUrl,
        sort:sortFromUrl,
        category:categoryFromUrl
      })
    }

    const fetchPost =async()=>{
      setLoading(true)
      const searchQuery = urlParams.toString()
      const res = await fetch(`/api/post/getposts?${searchQuery}`)
      const data = await res.json()

      if(!res.ok){
    setLoading(false)
    return
      }
      
      if(res.ok){
        setPosts(data.posts)
        setLoading(false)

        if(data.posts.length === 9){
          setShowMore(true)
        }
        else{
          setShowMore(false)
        }
      }

    }

    fetchPost()


  },[location.search])


  const handleChange = (e) =>{
   
     if(e.target.id==="searchTerm"){
      setSideBar({...sideBar,searchTerm:e.target.value})
     }

     if(e.target.id === "sort"){
      const order = e.target.value || "desc";
      setSideBar({...sideBar,sort:order})
     }

     if(e.target.id === "category"){
      const category = e.target.value || "uncategorized"
      setSideBar({...sideBar,category})
     }
  }


  const handleSubmit = (e)=>{
    e.preventDefault()
    const urlParams = new URLSearchParams(location.search)
    urlParams.set("searchTerm",sideBar.searchTerm)
    urlParams.set("sort",sideBar.sort)
    urlParams.set("category",sideBar.category)

    const searchQuery = urlParams.toString()
    navigate(`/search?${searchQuery}`)
  }


  const handleShow = async ()=>{
   try {
    
    const numberOfPosts = posts.length;
    const startIndex = numberOfPosts

    const urlParams = new URLSearchParams(location.search)
    urlParams.set("startIndex",startIndex)
    const searchQuery = urlParams.toString()

    const res = await fetch(`/api/post/getposts?${searchQuery}`)
    const data = await res.json()

    if(!res.ok){
      return
    }

    if(res.ok){
      setPosts((prev)=>[...prev,...data.posts])

      if(data.posts.length === 9){
        setShowMore(true)
      }
      else{
        setShowMore(false)
      }
    }
   } catch (error) {
    console.log(error.message)
   }
  }
 
  return (
    <div className="flex flex-col md:flex-row">
    <div className="p-7 border-b md:border-r md:min-h-screen dark:border-gray-600  ">
      <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
        <div className="flex items-center gap-2 ">
          <label className="whitespace-nowrap font-semibold">Seach Term:</label>
          <TextInput type="text" value={sideBar.searchTerm}
           placeholder="Search..." id="searchTerm" onChange={handleChange}/>

        </div>
        <div className="flex items-center gap-2">
         <label className="font-semibold ">Sort:</label>
         <Select className="" onChange={handleChange} id="sort" value={Sidebar.sort}>
          <option value="desc">Latest</option>
          <option value="asc">Oldest</option>
         </Select>
        </div>
        <div className="flex items-center gap-2">
         <label className="font-semibold ">Category:</label>
         <Select className="" onChange={handleChange} id="category" value={Sidebar.category}>
          <option value="uncategorized">Uncategorized</option>
          <option value="reactjs">React.js</option>
          <option value="nextjs">Next.js</option>
          <option value="mastery">Mastery</option>
         </Select>
        </div>
        <button type="submit"
         className="border px-4 py-2 hover:bg-gray-300 rounded-lg ">Apply Filters</button>
      </form>
    </div>

    <div className="w-full ">
      <h1 className="text-3xl font-semibold 
      sm:border-b px-1 mt-5 py-3
        dark:border-gray-400">Posts results</h1>
        <div className="p-7 flex flex-wrap gap-4">
          {!loading && posts.length === 0 && <p className="text-gray-500 italic text-xl">Not posts found </p>}
          {loading && <div className="w-full max-w-6xl mx-auto h-screen items-center flex justify-center">
            <Spinner size="xl" className="w-full max-w-5xl mx-auto"/>
            </div>}

            {!loading && posts && posts.map((post)=>(
              <PostCard key={post._id} post={post}/>
            )) }

            {showMore && <button onClick={handleShow} className="text-teal-500 hover:underline text-lg p-7 w-full">Show more</button> }
        </div>
    </div>
      
    </div>
  )
}

export default Search
