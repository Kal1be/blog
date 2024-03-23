import {Button, Navbar, TextInput} from "flowbite-react"
import { Link,useLocation } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {faMoon} from "@fortawesome/free-solid-svg-icons"
import {AiOutlineSearch} from "react-icons/ai"
function Header() {
    const path = useLocation().pathname
  return (
   <Navbar className="border-b-2 sticky top-0 z-50 items-center">
<Link to="/" className="self-center flex items-center gap-2 font-medium whitespace-nowrap">
    {/* <span className="px-2 md:py-2 py-1   bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-500 rounded-lg text-white">Kalibe`s </span> <span> Blog</span> */}
  <img src="./icon.jpg" className="md:w-12 md:h-12 w-10 h-10" alt="" />
   <h2>
   <span className="text-blue-800">AnasDev</span> <span className="text-green-700">Institute</span>
   </h2>
    </Link>
    <form>
        <TextInput type="text" placeholder="search" rightIcon={AiOutlineSearch} className="hidden lg:inline"/>
    </form>
        <Button className="w-12 h-10 lg:hidden outline-none " pill  color="gray">
<AiOutlineSearch/>
       </Button>
        <div className="flex md:gap-3 gap-2 items-center md:order-2">
            <Button className="w-12 h-10 hidden sm:inline " color="gray" pill>
                <FontAwesomeIcon icon={faMoon} className="text-gray-600"/>
            </Button>
            <Link to="/sign-in">
                <Button gradientDuoTone="purpleToBlue" outline className="border hidden md:inline border-purple-500 md:py-0 md:px-0 -p-2">Sign in</Button>
            </Link>
            <Navbar.Toggle/>
        </div>
            <Navbar.Collapse>
                <Navbar.Link active={path==="/"}  as={"div"}>
    <Link to="/" >
    Home   
      </Link>
                </Navbar.Link>
   <Navbar.Link active={path==="/about"} as={"div"}>
   <Link to="/about">
    About 
   </Link>
   </Navbar.Link >
   <Navbar.Link active={path==="/projects"} as={"div"} >
   <Link to="/projects">
    Projects
    </Link>
   </Navbar.Link>
   <Navbar.Link as={"div"}>
    <Link to="./sign-in">
   <Button gradientDuoTone="purpleToBlue" outline className="border w-full text-center inline md:hidden border-purple-500 md:py-0 md:px-0 -p-2">Sign in</Button>
    </Link>
   </Navbar.Link>
   </Navbar.Collapse>

   </Navbar>
  )
}

export default Header
