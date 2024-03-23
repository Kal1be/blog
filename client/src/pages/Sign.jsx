import { Button } from "flowbite-react"
import { Link } from "react-router-dom"

function Sign() {
  return (
    <div>
      signin
      <Link to="/signup">
        <Button>Signup</Button>
      </Link>
    </div>
  )
}

export default Sign
