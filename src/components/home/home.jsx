import { useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"

const Home = () => {
  const navigate = useNavigate()

  useEffect(() => {
    navigate("/login")
  }, [navigate])
  return (
    <div>
      <h1>Redirecionamento...</h1>
    </div>
  )
}

export default Home