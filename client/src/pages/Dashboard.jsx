import {useEffect,useState} from "react"
import {useLocation} from "react-router-dom"
import DashSidebar from "../component/DashSidebar"
import DashProfile from "../component/DashProfile"
import DashPost from "../component/DashPost"

function Dashboard() {
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
    <div className="md:min-h-[90vh] w-full mini-h-screen flex flex-col md:flex-row">
      <div className="">
        {/* Sidbar */}
        <DashSidebar/>
      </div>
      {/* the profile  */}

      {tab==="profile" && <DashProfile/>}

      {/* the posts...... */}
      {
        tab==="posts" && <DashPost/>
      }
      
    </div>
  )
}

export default Dashboard
