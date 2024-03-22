import {Button, Navbar, TextInput} from "flowbite-react"
import { Link,useLocation } from "react-router-dom"
function Header() {
    const path = useLocation().pathname
  return (
   <Navbar className="border-b-2 items-center">
<Link to="/" className="self-center font-medium whitespace-nowrap">
    <span className="px-2 py-1  bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-500 rounded-lg text-white">Kalibe`s </span>Blog
    </Link>
    <form>
        <TextInput type="text" placeholder="search" className="hidden md:inline"/>
    </form>
        <Button className="w-12 h-10 md:hidden " pill  color="gray">
Q        </Button>
        <div className="flex md:gap-3 gap-2 items-center md:order-2">
            <Button className="w-12 h-10 hidden sm:inline " color="gray" pill>
                0
            </Button>
            <Link to="sign-in">
                <Button gradientDuoTone="purpleToBlue" outline className="border border-purple-500 py-0 px-0">Sign in</Button>
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
   </Navbar.Collapse>

   </Navbar>
  )
}

export default Header
