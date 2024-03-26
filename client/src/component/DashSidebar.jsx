import { Sidebar } from "flowbite-react"
import {HiArrowSmRight, HiUser} from "react-icons/hi"
import { Link, useLocation } from "react-router-dom"
import { useState,useEffect } from "react"
import { signOutSuccess } from "../redux/user/userSlice"
import { useDispatch } from "react-redux"

function DashSidebar() {
    const location = useLocation()
    const [tab,setTab] = useState("")
    const dispatch = useDispatch()
  
    useEffect(()=>{
      const urlParams = new URLSearchParams(location.search)
      const tabFromUrl = urlParams.get("tab")
      if(tabFromUrl){
        setTab(tabFromUrl)
      }
    },[location.search])
  return (
    <Sidebar className="w-full md:w-72">
        <Sidebar.Items>
            <Sidebar.ItemGroup>
                <Link to="/dashboard?tab=profile">

                <Sidebar.Item active={tab==="profile"} label={"user"} icon={HiUser} labelColor='dark' as="div">
                    Profile
                </Sidebar.Item>
                </Link>
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
