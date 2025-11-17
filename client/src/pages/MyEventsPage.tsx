import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

function MyEventsPage() {
  const navigate = useNavigate()

  useEffect(() => {
    navigate("/", { replace: true })
  }, [navigate])

  return null
}
export default MyEventsPage
