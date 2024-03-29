import {  useDispatch, useSelector } from "react-redux"
import {Alert, Button, Modal, TextInput } from "flowbite-react"
import { useState,useRef,useEffect } from "react"
import {HiOutlineExclamationCircle} from "react-icons/hi"
import { deleteStart,deleteFailure,deleteSuccess, signOutSuccess } from "../redux/user/userSlice"
import {getDownloadURL, getStorage, uploadBytesResumable} from "firebase/storage"
import {ref} from "firebase/storage"
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { updateStart,updateFailure,updateSuccess } from "../redux/user/userSlice"

import {app} from "../../firebase"
import { Link } from "react-router-dom"
function DashProfile() {
  const dispatch = useDispatch()
  const {currentUser,error,loading} = useSelector((state)=>state.user)
  const [image,setImage] = useState(null)
  const [showModal,setShowModal] = useState(false)
  const [imageUrl,setImageUrl] = useState(null)
  const [imageUpload,setImageUpload] = useState(null)
  const [imageError,setImageError] = useState(null)
  const filePickRef = useRef()
  const [formData,setFormData] = useState({})


  const handleDelete=async()=>{
 setShowModal(false)

 try {
  dispatch(deleteStart())
  const res = await fetch(`/api/user/delete/${currentUser._id}`,{
    headers:{"Content-Type":"application/json"},
    method:"DELETE"
  })

  const data = await res.json()

  if(!res.ok){
    dispatch(deleteFailure(data.message))
  }

  else{
    dispatch(deleteSuccess(data))
  }

  
 } catch (error) {
  dispatch(deleteFailure(error.message))
  
 }
  }

  const handleSubmit = async (e)=>{
    e.preventDefault()
    if(Object.keys(formData).length===0){
      return
    }

    try {
      dispatch(updateStart())
      const res = await fetch(`/api/user/update/${currentUser._id}`,{
        method:'PUT',
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(formData)
      })
      
      const data = await res.json()
      if(!res.ok){
         dispatch(updateFailure(data.message))
      }
      else{
        dispatch(updateSuccess(data))
      }

    } catch (error) {
      dispatch(updateFailure(error.message))
    }
   
  }

  const handleChange = (e)=>{
    setFormData({...formData,[e.target.id]:e.target.value})
  }

  const handleImage = (e)=>{
   const file = e.target.files[0]

   if(file){
    setImage(file)
    setImageUrl(URL.createObjectURL(file))
   }

  }
 useEffect(()=>{
  if(image){
    uploadImage()
  }
 },[image])

 const uploadImage = async ()=>{
  // service firebase.storage {
  //   match /b/{bucket}/o {
  //     match /{allPaths=**} {
  //       allow read;
  //       allow write: if
  //       request.resource.size < 2 * 1024 * 1024 &&
  //       request.resource.contentType.matches("image/.*")
  //     }
  //   }
  // }

  setImageError(null)

  const storage = getStorage(app)
  const fileName = new Date().getTime() + image.name

  const storageRef = ref(storage,fileName)

  const uploadTask = uploadBytesResumable(storageRef,image)

  uploadTask.on(
    "state_changed",
    (snapshot)=>{
      const progress = (snapshot.bytesTransferred/snapshot.totalBytes) * 100;
      setImageUpload(progress.toFixed(0))

    },
    (error)=>{
      setImageError("could not uploading your image",error)
   setImageUpload(null)
   setImage(null)
   setImageUrl(null)
    },
    ()=>{
      getDownloadURL(uploadTask.snapshot.ref).then((download)=>{
        setImageUrl(download)
        setFormData({...formData,profilePicture:download})
      })
    }
  )


 }


 const handleSignout = async ()=>{

  try {
    const res = await fetch("/api/user/signout",{
      method:"POST"
    })

    const data = await res.json()

    if(!res.ok){
      console.log(data.message)
    }
    else{
      dispatch(signOutSuccess())
    }
    
  } catch (error) {
    console.log(error)
    
  }
 }
  return (
    <div className="max-w-lg mx-auto w-full mt-8 px-4 md:px-0">
    
     <form className="flex flex-col gap-5 md:w-full" onSubmit={handleSubmit}>
      <input type="file" accept="image/*" onChange={handleImage} className="hidden" ref={filePickRef}/>
      <div className="relative w-32 h-32 self-center  shadow-md cursor-pointer rounded-full  " onClick={()=>{
        filePickRef.current.click()
      }}>
        {imageUpload && (
          <CircularProgressbar value={imageUpload || 0}
          text={`${imageUpload}$`}
          strokeWidth={5}
          styles={{root:{
            width:"100%",
            height:"100%",
            position:"absolute",
            top:0,
            left:0
          },
          path:{
            stroke:"#4F46ES"
          }
        
        }}
          />
        )}
      <img src={imageUrl || currentUser.profilePicture} alt="" 
      className="w-full h-full p-0 object-cover border-4  rounded-full border-[lightgray]"/>
      
      </div>
      <h2 className="text-center my-3 text-xl font-medium">Welcome {currentUser.username} to your profile</h2>
      {imageError && (<Alert color="failure">{imageError}</Alert>)}

      <TextInput type="text" placeholder="username" defaultValue={currentUser.username} onChange={handleChange} id="username"/>
      <TextInput type="email" placeholder="email" defaultValue={currentUser.email} onChange={handleChange} id="email"/>
      <TextInput type="text" placeholder="****************" onChange={handleChange} id="password"/>
      <Button type="submit" disabled={loading} >{loading?"loading......":"Update profile"}</Button>

      {
        currentUser.isAdmin && (
          <Link to="/create-post">
          <button className="bg-green-800 p-2 rounded-lg w-full dark:text-white text-white">Create a Post</button>
          </Link>
        )
      }
     </form>
     <div className="text-red-500 font-medium text-sm  my-5 flex justify-between">
      <span onClick={()=>{
        setShowModal(true)
      }} className="cursor-pointer">Delete Account</span>
      <span className="cursor-pointer" onClick={handleSignout}>Sign Out</span>
     </div>
     {error && (<Alert color="failure" className="mt-5">{error}</Alert>)}
     <Modal show={showModal} onClose={()=>{setShowModal(false)}} popup size="md">
      <Modal.Header/>
      <Modal.Body>
        <div className="text-center">
<HiOutlineExclamationCircle className="h-16 w-16 text-gray-400 dark:text-gray-200 mb-4 mx-auto"/>
<h3 className="mb-5 text-lg text-gray-500 dark:text-gray-200">Are you sure you want to delete this account ?</h3>
<div className="flex justify-center gap-4">
<Button color="failure" onClick={handleDelete}>
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
  )
}

export default DashProfile
