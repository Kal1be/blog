import CallAction from "../component/CallAction"

function Home() {
  return (
    <div>
      <div className="max-w-3xl w-full my-10 mx-4 ">
        <h2 className="text-5xl font-bold mt-12 mb- text-green-600">Welcome to Distance Learning Center</h2>
        <p>Distance Learning Center is a platform for online course for
           AHmadu Bello university,the platform are building for integrating
            the teaching of school online for everybody and anyone in the world who want to school in ABU.</p>
      </div>
        <CallAction/>
    </div>
  )
}

export default Home
