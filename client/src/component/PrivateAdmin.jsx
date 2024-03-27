// import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom"

function PrivateAdmin() {
  const isadmin=true
  // const {currentUser} = useSelector((state)=>state.user)

  return isadmin ?<Outlet/>:<Navigate to="/sign-in"/>
}

export default PrivateAdmin
