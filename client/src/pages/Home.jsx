import CallAction from "../component/CallAction"

function Home() {
  return (
    <div className="max-w-6xl mx-auto w-full md:mt-28 mt-12 px-3 md:px-0 mb-10">
      <div className="max-w-3xl mt-12 w-full mb-10 md:mx-4">
        <h2 className="md:text-5xl text-3xl font-bold mt-2 mb- text-green-600">Welcome to Distance Learning Center</h2>
        <p>Distance Learning Center is a platform for online course for
           AHmadu Bello university,the platform are building for integrating
            the teaching of school online for everybody and anyone in the world who want to school in ABU.</p>
      </div>
        <CallAction/>
    </div>
  )
}

export default Home
