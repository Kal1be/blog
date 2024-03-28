import { Sidebar } from "flowbite-react"
import {HiArrowSmRight, HiDocumentText, HiUser} from "react-icons/hi"
import { Link, useLocation } from "react-router-dom"
import { useState,useEffect } from "react"
import { signOutSuccess } from "../redux/user/userSlice"
import { useDispatch, useSelector } from "react-redux"

function DashSidebar() {
    const location = useLocation()
    const [tab,setTab] = useState("")
    const dispatch = useDispatch()
    const {currentUser}=useSelector((state)=>state.user)
  
    useEffect(()=>{
      const urlParams = new URLSearchParams(location.search)
      const tabFromUrl = urlParams.get("tab")
      if(tabFromUrl){
        setTab(tabFromUrl)
      }
    },[location.search])
  return (
    <Sidebar className="w-full md:w-64">
        <Sidebar.Items>
            <Sidebar.ItemGroup className="flex flex-col gap-2">
                <Link to="/dashboard?tab=profile">

                <Sidebar.Item active={tab==="profile"} label={currentUser.isAdmin?"Admin":"User"} icon={HiUser} labelColor='dark' as="div">
                    Profile
                </Sidebar.Item>
                </Link>

                {
                  currentUser.isAdmin &&(
                    <Link to="/dashboard?tab=posts" className="my-4">
                <Sidebar.Item as={"div"} active={tab==="posts"}
                icon={HiDocumentText}
                >
                  Posts

                </Sidebar.Item>
                </Link>
                  )
                }

                <Sidebar.Item  icon={HiArrowSmRight} labelColor='gray' className="" onclick={()=>{
                  dispatch(signOutSuccess())
                }}>
                    Sign Out
                </Sidebar.Item>
            </Sidebar.ItemGroup>
        </Sidebar.Items>
    </Sidebar>
  )
}

export default DashSidebar
