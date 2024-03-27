import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import About from "./pages/About"
import Sign from "./pages/Sign"
import Signup from "./pages/Signup"
import Dashboard from "./pages/Dashboard"
import NotFound from "./pages/NotFound"
import Projects from "./pages/Projects"
import Header from "./component/Header"
import FooterCom from "./component/FooterCom"
import PrivateRoute from "./component/PrivateRoute"
import CreatePost from "./pages/CreatePost"
import PrivateAdmin from "./component/PrivateAdmin"
// import {useState,useEffect} from "react"
// import { useSelector } from "react-redux"

function App() {
  // const [loading,setLoading] = useState(false)
  // const{theme} = useSelector((state)=>state.theme)
  // useEffect(()=>{
  //   setTimeout(() => {
  //     setLoading(true)
  //   }, 7000);
  // },[loading])

  // if(!loading){
  //   return (
  //     <div className=" max-w-screen mx-auto flex justify-center items-center h-screen my-auto">
  //       <img src={theme=="light"?"/icon.jpg":"icon2.jpg"} alt="my-icon image" className="my-image shadow-2xl"/>
  //     </div>
  //   )
  // }


  return (
   <BrowserRouter>
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
   <Route path="/create-post" element={<CreatePost/>}/>
   </Route>
   <Route path="*" element={<NotFound/>}/>
   </Routes>
   <FooterCom/>
   </BrowserRouter>
  ) 
}

export default App
