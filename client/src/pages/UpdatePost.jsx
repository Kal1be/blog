import { getDownloadURL, getStorage,ref, uploadBytesResumable} from "firebase/storage";
import { Alert, Button, FileInput, Select, TextInput } from "flowbite-react"
import { useEffect, useState } from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { app } from "../../firebase";
import { CircularProgressbar } from "react-circular-progressbar";
import { useNavigate,useParams } from "react-router-dom";
import { useSelector } from "react-redux";
// the start of the function is here
// everything is here
function UpdatePost() {
  const [file,setFile] = useState(null)
const [imageUpload,setImageUpload] = useState(null)
const [imageError,setImageError] = useState(null)
const [formData,setFormData] = useState({})
const [publishError,setPublishError] = useState(null)
const navigate = useNavigate()
const {postId} = useParams( )
const {currentUser} = useSelector((state)=>state.user)

useEffect(()=>{

  const getData= async ()=>{
    try {
        const res = await fetch(`/api/post/getposts?postId=${postId}`)
        const data = await res.json()
        if(!res.ok){
            console.log(data.error)
            setPublishError(data.error)
        }

        if(res.ok){
            setPublishError(null)
            setFormData(data.posts[0])
        }
    } catch (error) {
        console.log(error)
    }

  }
if(formData){
  getData()
}
},[postId])
// the function for handle upload of our file in the firebase
// the function start here

  const handleUpload =async ()=>{
    try {
      if(!file){
        setImageError("please select an image before to proceed ")
        return 
      }
      // the call of the function to store in the firebase
      // the depence is here


      const storage = getStorage(app)
      const fileName =  new Date().getTime() + "-"+file.name
      const storageRef = ref(storage,fileName)

      // the define function is here

      const uploadTask = uploadBytesResumable(storageRef,file)
      uploadTask.on("state_changed",
      (snapshot)=>{
        const progress = (snapshot.bytesTransferred/snapshot.totalBytes)*100
        setImageUpload(progress.toFixed(0))
        console.log(progress.toFixed(0))
      },
      (error)=>{
        setImageError("something went wrong !",error)
      },
      // the upload function and get the link is here
        ()=>{
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=>{
            setImageUpload(null)
            setImageError(null)
            setFormData({...formData,image:downloadURL})
            console.log(downloadURL)
          })
        }
      )
      
    } catch (error) {
      setImageError("image is failed to ")
      setImageUpload(null)
      
    }
  }
  // the function handlesubmit

const handleSubmit = async (e)=>{
  e.preventDefault()

  try {
    const res = await fetch(`/api/post/updatepost/${formData._id}/${currentUser._id}`,{
      headers:{
        "Content-Type":"application/json",
      },
      method:"PUT",
      body:JSON.stringify(formData)
    })

    const data = await res.json()

    if(!res.ok){
setPublishError(data.message)
return
    }


    if(res.ok){
      setPublishError(null)
      navigate(`/post/${data.slug}`)
    }

     
  } catch (error) {
    setPublishError("somthing went wrong !")
  }
}

  



  return (
    <div className="p-3 max-w-4xl mx-auto min-h-screen">
      <h1 className="text-center text-4xl my-10  font-semibold">
        Update a post for the DLC student
      </h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
  <div className="flex flex-col gap-4 sm:flex-row justify-between">
<TextInput type="text" placeholder="Title" id="title"
onChange={(e)=>{
  setFormData({...formData,title:e.target.value})
}} value={formData.title}
className="flex-1"/>
<Select value={formData.category} 
onChange={(e)=>{
 setFormData({...formData,category:e.target.value})
}}
>
  <option value="uncathegorized">Select a category</option>
  <option value="javascript">JavaScript</option>
  <option value="reactJs">ReactJs</option>
  <option value="nextjs">NextJs</option>
  <option value="redux">Redux</option>
  <option value="mastery">Mastery</option>
</Select>
  </div>
  <div className="flex gap-4 items-center justify-between border-4 border-teal-500
  border-dotted p-3">
<FileInput type="file" accept="image/*" onChange={(e)=>{setFile(e.target.files[0])}}/>
<Button type="button" size="sm" onClick={handleUpload} disabled={imageUpload }> 
{imageUpload ? <div className="w-16 h-16">
<CircularProgressbar value={imageUpload} text={`${imageUpload || 0}`}/>
</div>:"Upload image" }
</Button>
  </div>
  {imageError && (
    <Alert color="failure">
      {imageError}
    </Alert>
  )}
  {
    formData.image && (
      <img src={formData.image} alt="" className="w-full h-72 object-cover" />
    )
  }
  <ReactQuill
  value={formData.content}
  onChange={(value)=>{
    setFormData({...formData,content:value})
  }}
  theme="snow" placeholder="write somthing......" className="h-72 mb-12 dark:text-white" />
  <Button type="submit">Update post</Button>
  {publishError && (
    <Alert color="failure" className="mt-5">
{publishError}
    </Alert>
  )}
      </form>
      
    </div>
  )
}

export default UpdatePost
