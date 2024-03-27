import {Footer} from "flowbite-react"
import {Link} from "react-router-dom"
import {BsFacebook,BsInstagram,BsTwitterX,BsGithub,BsWhatsapp} from "react-icons/bs"
import { useSelector } from "react-redux"

function FooterCom() {
  const {theme} = useSelector((state)=>state.theme)
  return (
    <Footer container className="border bottom-0 relative mt-8 -mb-12 flex-col bg-white text-gray-700 dark:text-gray-200 dark:bg-[#101010] border-t-2 border-t-green-800">
     <div className="md:flex">
       <div className="flex-1">
       <Link to="/" className="self-center flex items-center gap-2 text-xl font-medium ">
    {/* <span className="px-2 md:py-2 py-1   bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-500 rounded-lg text-white">Kalibe`s </span> <span> Blog</span> */}
  <img src={theme=="light"?"/icon.jpg":"/icon2.jpg"}className="md:w-12 rounded-full md:h-12 w-10 h-10" alt="" />
   <h2>
   <span className="text-blue-800">AnasDev</span> <span className="text-green-700">Institute</span>
   </h2>
    </Link>
   <p className=" dark:text-white text-gray-800">Lorem ipsum dolor, ullam tempore ipsam facere. Architecto eius amet adipisci nam pariatur commodi ad similique quis, illo dolorum illum soluta officiis ex numquam magnam inventore aliquam impedit ea eaque provident maxime hic nisi. Doloremque repellat praesentium amet eveniet.</p>
        </div> 
       <div className="md:flex  flex-1 w-full justify-around gap-8">
       <div className="grid-cols-2 mt-3  gap-3 sm:mt-4 sm:grid-cols-3 sm:gap-6">
           <h2> <Footer.Title title="About the Institute"/></h2>
            <Footer.LinkGroup col>
           <Footer.Link href="kal1be.github.io/yahoulbo-portfolio" rel="noopener nonreferrer" className="" target="_blank">
            100 js Projects</Footer.Link> 
           <Footer.Link href="/about" rel="noopener nonreferrer" className="" target="_blank">
            AnasDev Institute</Footer.Link> 
            
            </Footer.LinkGroup>
        </div>
        <div className=" grid-cols-2  mt-3   gap-3 sm:mt-4 sm:grid-cols-3 sm:gap-6">
            <Footer.Title title="Follow AnasDev"/>
            <Footer.LinkGroup col>
           <Footer.Link href="github.com/kal1be" rel="noopener nonreferrer" className="" target="_blank">
         Github</Footer.Link> 
           <Footer.Link href="#" rel="noopener nonreferrer" target="_blank" className="">
      Join Discord</Footer.Link> 
            
            </Footer.LinkGroup>
        </div>
        <div className=" grid-cols-2  mt-3   gap-3 sm:mt-4 sm:grid-cols-3 sm:gap-6">
            <Footer.Title title="Join AnasDev Institute"/>
            <Footer.LinkGroup col>
           <Footer.Link href="github.com/kal1be" rel="noopener nonreferrer" className="" target="_blank">
        Privacy Policy</Footer.Link> 
           <Footer.Link href="#" rel="noopener nonreferrer" target="_blank" className="">
            Term &amp; Condition
    </Footer.Link> 
            
            </Footer.LinkGroup>
        </div>
       </div>
     </div>
     <div className="mt-12 flex justify-between items-center w-full mb-1">
       <h2 className="text-xl font-bold dark:text-white text-gray-400 "> Follow Us:</h2>
       <div className="flex md:gap-8 gap-4">
<Footer.Icon href="#" icon={BsFacebook}/>
<Footer.Icon href="#" icon={BsInstagram}/>
<Footer.Icon href="#" icon={BsGithub}/>
<Footer.Icon href="#" icon={BsTwitterX}/>
<Footer.Icon href="#" icon={BsWhatsapp}/>
       </div>
     </div>
<Footer.Divider/>
<div className="md:flex justify-between  text-sm dark:text-white text-slate-600 font-medium w-full"> 
    <h2 className="mt-2">Copyright AnasDev Institute</h2>
    <h2 className="flex mt-2 gap-1 items-center">
      <Footer.Copyright by="DevSoftware Yahoulbo" year={new Date().getFullYear()} className="dark:text-white text-slate-600 font-medium"/> <span></span>
    </h2>
</div>
    </Footer>
  )
}

export default FooterCom
