import { Link, useNavigate } from "react-router-dom"

function Navbar() {
  const navigate = useNavigate()
  const isLoggedIn = true // TODO: verify with auth context later
  const userName = "John Doe"

  // ✏️ ADDED: Handler to clear filters
  const handleBrowseClick = (e: React.MouseEvent) => {
    e.preventDefault()
    navigate("/games", { replace: true })
  }

  return (
    <nav className="navbar bg-base-100 px-4 shadow-sm">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl font-bold">
          ⚽ SportConnect
        </Link>
      </div>

      {/* Right side - Nav buttons + Profile */}
      <div className="flex-none gap-2">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <button onClick={handleBrowseClick}>Browse Games</button>
          </li>
          <li>
            <Link to="/games/new">Create Game</Link>
          </li>
        </ul>

        {/* Profile or Login */}
        {isLoggedIn ? (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-circle btn-ghost avatar avatar-placeholder"
            >
              <div className="bg-neutral text-neutral-content w-10 rounded-full">
                <span className="text-lg">{userName.charAt(0)}</span>
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li className="menu-title">
                <span>{userName}</span>
              </li>
              <li>
                <Link to="/profile">Profile</Link>
              </li>
              <li>
                <Link to="/my-events">Your Events</Link>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li>
                <a className="text-error">Logout</a>
              </li>
            </ul>
          </div>
        ) : (
          <Link to="/login" className="btn btn-primary">
            Login
          </Link>
        )}
      </div>
    </nav>
  )
}

export default Navbar
