import {Button, Label, TextInput} from "flowbite-react"
import { Link } from "react-router-dom"
function Signup() {
  return (
    <div className="min-h-screen md:mt-20 mt-12">
       <div className="flex p-3 max-w-4xl mx-auto flex-col md:flex-row md:items-center md:gap-8 gap-5">
        {/* left side */}
        <div className="flex-1 ">
          <h2 className="text-lg font-medium">
           <h3 className=" flex justify-center">
             <img src="./icon.jpg" className="w-16 h-16 md:w-20 md:h-20" alt="" />
           </h3>
         <h2 className="text-center text-xl font-medium">   <span className="text-blue-800">AnasDev</span><span className="text-green-700"> Institute</span></h2>
          </h2>
            <p className="text-sm mt-1 dark:text-white ">This is the signup page for the user registration,you can register with your username,email and password or you can register with your google information by clicking in the google button below the the button section!</p>
        </div>
        {/* right side */}
        <div className="flex-1">
          <form className="flex flex-col gap-4">
            <div>
              <Label value="Your username"></Label>
              <TextInput type="text" placeholder="username" id="username" />
            </div>
            <div>
              <Label value="Your email"></Label>
              <TextInput type="email" placeholder="namecompany@gmail.com" id="email" />
            </div>
            <div>
              <Label value="Your password"></Label>
              <TextInput type="password" placeholder="password" id="password" />
            </div>
            <Button gradientDuoTone="purpleToRed" className="bg-green-600 text-white" type="submit">Sign Up</Button>
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
