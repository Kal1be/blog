import {Alert, Button, Label, Spinner, TextInput} from "flowbite-react"
import { useState } from "react"
import { Link,useNavigate } from "react-router-dom"
import Oauth from "../component/Oauth"
// import { useSelector } from "react-redux"
function Signup() {
  const [formdata,setFormdata] = useState({})
  const [errorMessage,setErrorMessage] = useState(null)
  const [isloading,setIsloading] = useState(false)
  // const {theme} = useSelector((state)=>state.theme)
const navigate = useNavigate()
  const handleChange = (e)=>{
    setFormdata({...formdata,[e.target.id]:e.target.value.trim()})
    console.log(formdata)
  }

  const handleSubmit =async(e)=>{
    e.preventDefault()

    if(!formdata.username || !formdata.email || !formdata.password){
      return setErrorMessage("All fields are mandatory !")
    }
 try {
  setIsloading(true)
  setErrorMessage(null)
  const res = await fetch("/api/auth/signup",{
    headers:{"content-Type":"application/json"},
    method:"POST",
    body:JSON.stringify(formdata)
  })

  const data = await res.json()

  if(data.success === false){
    return setErrorMessage(data.message)
  }
  setIsloading(false)

  if(res.ok){
    navigate("/sign-in")
  }
  
 } catch (error) {
  setErrorMessage("please refresh the page and try again later !",error.message)
  setIsloading(false)

 }
  }
  return (
    <div className="min-h-[60vh] md:mt-12 mt-8">
       <div className="flex p-3 max-w-7xl mx-auto flex-col md:flex-row md:items-center md:gap-8 gap-5">
        {/* left side */}
        <div className="flex-1 ">
          <h2 className="text-lg font-medium">
           {/* <h3 className=" flex justify-center">
             <img src={theme==="light"?"/icon.jpg":"/icon2.jpg"} className="w-16 rounded-full h-16 md:w-20 md:h-20" alt="" />
           </h3>
         <h2 className="text-center text-xl font-medium">   <span className="text-blue-800">AnasDev</span><span className="text-green-700"> Institute</span></h2> */}
        <img src="/abuimage.png" className="h-16" alt="" />
          </h2>
            <p className="text-sm mt-1 dark:text-white ">This is the signup page for the user registration,you can register with your username,email and password or you can register with your google information by clicking in the google button below the the button section!</p>
        </div>
        {/* right side */}
        <div className="flex-1">
        {
            errorMessage && (<div>
              <Alert className="mt-5" color="failure" >
               {errorMessage}
              </Alert>
            </div>)
          }
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div>
              <Label value="Enter your username"></Label>
              <TextInput type="text" placeholder="username" id="username" onChange={handleChange}/>
            </div>
            <div>
              <Label value="Enter your email"></Label>
              <TextInput type="email" placeholder="namecompany@gmail.com" id="email" onChange={handleChange} />
            </div>
            <div>
              <Label value="Enter your password"></Label>
              <TextInput type="password" placeholder="password" id="password" onChange={handleChange}/>
            </div>
            <Button gradientDuoTone="purpleToRed" className="bg-green-600 text-white" type="submit" disabled={isloading}>
              {
                isloading ? (<div>
                  <Spinner size="sm"/>
                  <span className="pl-3 text-white">loading...</span>
                </div>):<span className="text-white">Sign Up</span>
              }
            </Button>
            <Oauth/>
          </form>
          <div className="flex gap-2 text-sm font-medium mt-4">
            <span>Have an account?</span>
            <Link to="/sign-in" className="text-blue-800">Sign In</Link>
          </div>
          
        </div>
       </div>
    </div>
  )
}

export default Signup
