import { Sidebar } from "flowbite-react"
import {HiArrowSmRight, HiUser} from "react-icons/hi"
import { Link, useLocation } from "react-router-dom"
import { useState,useEffect } from "react"

function DashSidebar() {
    const location = useLocation()
    const [tab,setTab] = useState("")
  
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
                <Sidebar.Item active icon={HiArrowSmRight} labelColor='gray' className="">
                    Sign Out
                </Sidebar.Item>
            </Sidebar.ItemGroup>
        </Sidebar.Items>
    </Sidebar>
  )
}

export default DashSidebar
