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

function App() {
  return (
   <BrowserRouter>
   <Header/>
   <Routes>
  <Route path="/" exact element={<Home/>}/>
  <Route path="/about" element={<About/>}/>
   <Route path="/sign-in" element={<Sign/>}/>
   <Route path="/signup" element={<Signup/>}/>
   <Route path="/dashboard"  element={<Dashboard/>}/>
   <Route path="/projects" element={<Projects/>}/>
   <Route path="*" element={<NotFound/>}/>
   </Routes>
   <FooterCom/>
   </BrowserRouter>
  )
}

export default App
