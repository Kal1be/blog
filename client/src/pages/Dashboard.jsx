import {useEffect,useState} from "react"
import {useLocation} from "react-router-dom"
import DashSidebar from "../component/DashSidebar"
import DashProfile from "../component/DashProfile"
import DashPost from "../component/DashPost"
import DashUser from "../component/DashUser"
import { Spinner } from "flowbite-react"
import DashComments from "../component/DashComments"
import DashboardComponent from "../component/DashboardComponent"
function Dashboard() {
  const location = useLocation()
  const [tab,setTab] = useState("")
  const [loading,setLoading] = useState(false)


  useEffect(()=>{
    setTimeout(() => {
      setLoading(true)
    }, 4000);
  },[loading])


  if(!loading){
    <div className="flex justify-center items-center min-h-screen">
    <Spinner size='xl'/>
</div>
  }

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
      {/* the users tab */}

      {
        tab==="users" && <DashUser/>
      }

      {/* the comments tab */}
      
      {tab==="comments" && <DashComments/>}

      {/* the dash componet */}
      {tab==="dash" && <DashboardComponent/>}
    </div>
  )
}

export default Dashboard
