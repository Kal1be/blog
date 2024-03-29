import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import About from "./pages/About"
import Sign from "./pages/Sign"
import Signup from "./pages/Signup"
import Dashboard from "./pages/Dashboard"
// import NotFound from "./pages/NotFound"
import Projects from "./pages/Projects"
import Header from "./component/Header"
import FooterCom from "./component/FooterCom"
import PrivateRoute from "./component/PrivateRoute"
import CreatePost from "./pages/CreatePost"
import PrivateAdmin from "./component/PrivateAdmin"
import UpdatePost from "./pages/UpdatePost"
import Postpage from "./pages/Postpage"
import {useState,useEffect} from "react"
import Scroll from "./component/Scroll"
// import { useSelector } from "react-redux"

function App() {
  const [loading,setLoading] = useState(false)
  // const{theme} = useSelector((state)=>state.theme)
  useEffect(()=>{
    setTimeout(() => {
      setLoading(true)
    }, 8000);
  },[loading])

  if(!loading){
    return (
   
       <div className="bg-white max-w-screen mx-auto flex justify-center items-center h-screen my-auto">
        <img src="/abu-logo.jpg" alt="my-icon image" className="my-image w-72 h-72 object-cover p-6 shadow-2xl"/>
       </div>
    )
  }


  return (
   <BrowserRouter>
   <Scroll/>
   <Header/>
   <Routes>
  <Route path="/" exact element={<Home/>}/>
  <Route path="/about" element={<About/>}/>
   <Route path="/sign-in" element={<Sign/>}/>
   <Route path="/signup" element={<Signup/>}/>
   <Route element={<PrivateRoute/>}>
   <Route path="/dashboard"  element={<Dashboard/>}/>
   </Route>
   <Route path="/projects" element={<Projects/>}/>
   <Route element={<PrivateAdmin/>}>
    <Route path="/update-post/:postId" element={<UpdatePost/>}/>
   <Route path="/create-post" element={<CreatePost/>}/>
   </Route>
   <Route path="/post/:postSlug" element={<Postpage/>}/>
   </Routes>
   <FooterCom/>
   </BrowserRouter>
  ) 
}

export default App
