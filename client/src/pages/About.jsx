import CallAction from "../component/CallAction"
function About() {
  return (
    <div className="my-12 max-w-7xl mx-auto px-2">
      <div className="my-8 px-2">
        <div className="md:mx-12">
          <h1 className="md:text-4xl text-2xl text-green-600 font-semibold">About Distance Learning Center</h1>
          <div className="max-w-2xl">
            <p className="text-xl text-gray-400 font-normal">Distance Learning Center is Ahmadu Bello University for online 
              teaching for anybody or anyone in the world who want to study 
              in ABU . 
            </p> 
            </div>
           <div className="md:flex max-w-6xl my-6">
          <div className="flex-1">
<img src="./bello.jpg" alt="" />
          </div>
          <div className="flex-1">
            <h2 className="text-blue-900 dark:text-gray-200 text-xl font-medium my-4">Welcome to Ahmadu Bello University</h2>
            <hr className="border border-green-600 w-56 my-4"/>
            <h2 className="text-3xl text-blue-950 italic">ABU Vision</h2>
          <h2 className="text-xl font-medium my-3">According to Sir Ahmadu Bello</h2>
            <p className="my-p text-xl font-sans text-gray-400">``Ahmadu Bello University shall be 
              a world-class university comparable 
              to any other, engaged in imparting 
              contemporary knowledge, using high quality 
              facilities and multi-disciplinary approaches, 
              to men and women of all races, as well as
               generating new ideas and intellectual
                practices relevant to the needs of its
                 immediate community, Nigeria and the 
                 world at large.``</p>
          </div>
           </div>
        
        </div>
      </div>
     <div className="bg-gray-100 dark:bg-slate-800 rounded-xl">
     <CallAction/>
     </div>
    </div>
  )
}

export default About
