import { Button } from "flowbite-react"
import {AiFillGoogleCircle} from "react-icons/ai"
import {GoogleAuthProvider, getAuth, signInWithPopup} from "firebase/auth"
import { app } from "../../firebase"
import { useDispatch } from "react-redux"
import { signInSuccess } from "../redux/user/userSlice"
import { useNavigate } from "react-router-dom"
function Oauth() {
const dispatch = useDispatch()
const navigate = useNavigate()
  const handleGoogleClick = async ()=>{
    const provider = new GoogleAuthProvider()
    const auth = getAuth(app)
    provider.setCustomParameters({prompt:"select_account"})

    try {
      const responseSignup = await signInWithPopup(auth,provider)
      const  res = await fetch("/api/auth/google",{
        method:"POST",
        headers:{"content-Type":"application/json"},
        body:JSON.stringify({
          name:responseSignup.user.displayName,
          email:responseSignup.user.email,
          googlePhotoUrl:responseSignup.user.photoURL
        })
      })

      const data = await res.json()

      if(res.ok){
        dispatch(signInSuccess(data))
        navigate("/dashboard")
      }
    } catch (error) {
      console.log(error)
      
    }
  }
  return (
    <div>
    <Button type="button" className="bg-blue-800 text-white w-full" onClick={handleGoogleClick}>
      <AiFillGoogleCircle className="w-10 h-8 mr-2"/>Continue with Google</Button>
    </div>
  )
}

export default Oauth
