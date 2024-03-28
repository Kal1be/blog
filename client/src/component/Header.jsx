import { Button, Dropdown, Navbar, TextInput} from "flowbite-react"
import { Link,useLocation } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {faMoon,faSun} from "@fortawesome/free-solid-svg-icons"
import {AiOutlineSearch} from "react-icons/ai"
import {useDispatch, useSelector} from "react-redux"
import { toggleTheme } from "../redux/theme/themeSlice"
import { signOutSuccess } from "../redux/user/userSlice"
function Header() {
    const {currentUser}=useSelector((state)=>state.user)
    const {theme} = useSelector((state)=>state.theme)
    const dispatch = useDispatch()
    const path = useLocation().pathname
  return (
   <Navbar className="border-b-2 sticky top-0 px-0 z-50 items-center">
<Link to="/" className="md:self-center flex items-center gap-2 font-medium whitespace-nowrap">
    {/* <span className="px-2 md:py-2 py-1   bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-500 rounded-lg text-white">Kalibe`s </span> <span> Blog</span> */}
  {/* <img src={theme==="light"?"/icon.jpg":"/icon2.jpg" }  className="md:w-12 rounded-full md:h-12 w-10 h-10" alt="" />
   <h2>
   <span className="text-blue-800">AnasDev</span> <span className="text-green-700">Institute</span>
   </h2> */}
   <img src="/abuimage.png" alt="" className="md:h-12 h-10 md:w-full w-44" />
    </Link>
    <form>
        <TextInput type="text" placeholder="search" rightIcon={AiOutlineSearch} className="hidden lg:inline"/>
    </form>
        <Button className="md:w-12 w-10 h-10 md:h-10 lg:hidden outline-none " pill  color="gray">
<AiOutlineSearch/>
       </Button>
        <div className="flex md:gap-8 gap-0 items-center md:order-2">
            <button className="w-10 border border-gray-300 rounded-full h-10 hidden sm:inline"  onClick={()=>{
                    dispatch(toggleTheme())
                }}>
               {theme==="light"? <FontAwesomeIcon icon={faMoon}  className="text-gray-600"/>:<FontAwesomeIcon icon={faSun}/>}
            </button>
            {currentUser?(<Dropdown arrowIcon={false} inline   label={<img src={currentUser.profilePicture}  alt="user" 
            className="md:w-12 w-10 object-cover rounded-full md:h-12 h-10"/>}>
                
                <Dropdown.Header>
                    <span className="block text-sm">@{currentUser.username}</span>
                    <span className="block text-sm font-medium ">{currentUser.email}</span>
                </Dropdown.Header>
                <Link to="/dashboard?tab=profile">
                    <Dropdown.Item>Profile</Dropdown.Item>
                </Link>
                <Dropdown.Divider/>
                <Dropdown.Item onClick={()=>{
                    dispatch(signOutSuccess())
                }}>
                    Signout
                </Dropdown.Item>
            </Dropdown>):<Link to="/sign-in">
                <Button gradientDuoTone="purpleToBlue" outline className="border  border-purple-500 md:py-0 md:px-0 -p-2">
                    Sign in</Button>
            </Link>}
        </div>
          <Navbar.Toggle/>
            <Navbar.Collapse>
                <div className=" border flex w-[160px] mx-2 p-1 rounded-full sm:hidden items-center gap-2 ">
            <button className="w-10 border border-gray-300 rounded-full h-10 inline sm:hidden"  onClick={()=>{
                    dispatch(toggleTheme())
                }}>
               {theme==="light"? <FontAwesomeIcon icon={faMoon}  className="text-gray-600"/>:<FontAwesomeIcon icon={faSun}/>}
            </button>
                {theme==="light"?<h2 className="text-sm font-medium">Dark mode</h2>:<h2 className="text-sm font-medium">Light mode</h2>}

                </div>
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
