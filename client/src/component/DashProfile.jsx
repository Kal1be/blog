import {  useSelector } from "react-redux"
import {Alert, Button, TextInput } from "flowbite-react"
import { useState,useRef,useEffect } from "react"
import {getDownloadURL, getStorage, uploadBytesResumable} from "firebase/storage"
import {ref} from "firebase/storage"
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

import {app} from "../../firebase"
function DashProfile() {
  const {currentUser} = useSelector((state)=>state.user)
  const [image,setImage] = useState(null)
  const [imageUrl,setImageUrl] = useState(null)
  const [imageUpload,setImageUpload] = useState(null)
  const [imageError,setImageError] = useState(null)
  const filePickRef = useRef()

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
      })
    }
  )


 }

  return (
    <div className="max-w-lg mx-auto w-full px-4 md:px-0">
     <h2 className="text-center my-3 text-xl font-medium">Welcome {currentUser.username} to your profile</h2>
     <form className="flex flex-col gap-5 md:w-full">
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
      {imageError && (<Alert color="failure">{imageError}</Alert>)}

      <TextInput type="text" placeholder="username" defaultValue={currentUser.username} id="username"/>
      <TextInput type="email" placeholder="email" defaultValue={currentUser.email} id="email"/>
      <TextInput type="text" placeholder="****************" id="password"/>
      <Button type="submit" >Update Profile</Button>
     </form>
     <div className="text-red-500 font-medium text-sm  my-5 flex justify-between">
      <span>Delete Account</span>
      <span>Sign Out</span>
     </div>
    </div>
  )
}

export default DashProfile
