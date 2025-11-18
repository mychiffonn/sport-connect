import { Link, useNavigate } from "react-router-dom"

function NotFoundPage() {
  const navigate = useNavigate()

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
        <h1 className="text-9xl font-bold">404</h1>
        <h2 className="mt-4 text-3xl font-semibold">Page Not Found</h2>
        <p className="mt-2 text-lg opacity-70">Oops! The page you're looking for doesn't exist.</p>
        <div className="mt-8 flex gap-4">
          <button onClick={() => navigate(-1)} className="btn btn-ghost">
            ← Go Back
          </button>
          <Link to="/" className="btn btn-primary">
            Go Home
          </Link>
        </div>
      </div>
    </div>
  )
}

export default NotFoundPage
