import { BrowserRouter as Router, Routes, Route, useParams } from "react-router-dom"
import { GameList } from "@/components/GameList"
import { Layout } from "@/components/Layout"
import { api, type Game, type RSVP } from "@/services/api"
import { CreateGameForm } from "@/components/CreateGameForm"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { GameCard } from "@/components/GameCard"
import { EditGameForm } from "@/components/EditGameForm"
import { PageTransition } from "@/components/PageTransition"
import { Link } from "react-router-dom"

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/games" element={<BrowseGamesPage />} />
          <Route path="/games/:id" element={<GameDetailPage />} />
          <Route path="/games/:id/edit" element={<EditGamePage />} />
          <Route path="games/new/" element={<CreateGamePage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/my-events" element={<MyEventsPage />} />
          <Route path="*" element={<NotFoundPage />} /> {/*caches all unmatched routes*/}
        </Routes>
      </Layout>
    </Router>
  )
}

// Placeholder components
function HomePage() {
  const currentUserId = 1 // TODO replace with real userID from auth
  const [hostedGames, setHostedGames] = useState<Game[]>([])
  const [upcomingGames, setUpcomingGames] = useState<Game[]>([])
  const [pastGames, setPastGames] = useState<Game[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUserGames = async () => {
      try {
        setLoading(true)
        const [hosted, upcoming, pastRSVPs, pastHosted] = await Promise.all([
          api.getUserHostedGames(currentUserId),
          api.getUserRSVPGames(currentUserId),
          api.getUserPastGames(currentUserId),
          api.getUserPastHostedGames(currentUserId)
        ])
        setHostedGames(hosted)
        setUpcomingGames(upcoming)
        const allPastGames = [...pastRSVPs, ...pastHosted]
        allPastGames.sort((a, b) => {
          const dateA = new Date(`${a.date}T${a.time}`)
          const dateB = new Date(`${b.date}T${b.time}`)
          return dateB.getTime() - dateA.getTime()
        })
        setPastGames(allPastGames)
      } catch (err) {
        console.error("Error fetching user games: ", err)
      } finally {
        setLoading(false)
      }
    }

    fetchUserGames()
  }, [])

  if (loading) {
    return (
      <PageTransition>
        <div className="container mx-auto px-4 py-8">
          <div className="flex min-h-[400px] items-center justify-center">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        </div>
      </PageTransition>
    )
  }

  return (
    <PageTransition>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="mb-2 text-4xl font-bold">Your Dashboard</h1>
          <p className="mb-4 text-lg opacity-70">Manage your games and see what's coming up</p>
          <Link to="/games" className="btn btn-primary">
            Browse All Games
          </Link>
        </div>

        {/* Games You're Hosting */}
        <section className="mb-10">
          <h2 className="mb-4 text-2xl font-bold">Games You're Hosting ({hostedGames.length})</h2>
          {hostedGames.length === 0 ? (
            <div className="alert alert-info">
              <span>
                You haven't created any games yet.{" "}
                <Link to="/games/new" className="link">
                  Create one now!
                </Link>
              </span>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {hostedGames.map((game) => (
                <GameCard key={game.id} game={game} currentUserId={currentUserId} />
              ))}
            </div>
          )}
        </section>

        {/* Upcoming Games (RSVP'd) */}
        <section className="mb-10">
          <h2 className="mb-4 text-2xl font-bold">Upcoming Games ({upcomingGames.length})</h2>
          {upcomingGames.length === 0 ? (
            <div className="alert alert-info">
              <span>
                You haven't RSVP'd to any upcoming games.{" "}
                <Link to="/games" className="link">
                  Find a game to join!
                </Link>
              </span>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {upcomingGames.map((game) => (
                <GameCard key={game.id} game={game} currentUserId={currentUserId} />
              ))}
            </div>
          )}
        </section>

        {/* Past Events */}
        <section className="mb-10">
          <h2 className="mb-4 text-2xl font-bold">Past Events ({pastGames.length})</h2>
          {pastGames.length === 0 ? (
            <div className="alert alert-info">
              <span>No past events yet. Join some games to build your history!</span>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {pastGames.map((game) => (
                <GameCard key={game.id} game={game} currentUserId={currentUserId} />
              ))}
            </div>
          )}
        </section>
      </div>
    </PageTransition>
  )
}

function EditGamePage() {
  return (
    <PageTransition>
      <div className="container mx-auto px-4 py-8">
        <EditGameForm />
      </div>
    </PageTransition>
  )
}

function BrowseGamesPage() {
  return (
    <PageTransition>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4x1 mb-2 font-bold">Browse Games</h1>
          <p className="text-lg opacity-70">
            Find and join recreational sports events in your community
          </p>
        </div>
        <GameList />
      </div>
    </PageTransition>
  )
}

function GameDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [game, setGame] = useState<Game | null>(null)
  const [rsvps, setRsvps] = useState<RSVP[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchGameDetails = async () => {
      if (!id) return

      try {
        setLoading(true)
        const [gameData, rsvpData] = await Promise.all([
          api.getGame(Number(id)),
          api.getRSVPs(Number(id))
        ])
        setGame(gameData)
        setRsvps(rsvpData)
        setError(null)
      } catch (err) {
        setError("Failed to load game details")
        console.error("Error fetching game details:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchGameDetails()
  }, [id])

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric"
    })
  }

  const formatTime = (timeString: string) => {
    if (!game) return timeString

    // add 'Z' to indicate UTC
    const dateTime = new Date(`${game.date.split("T")[0]}T${timeString}Z`)

    return dateTime.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true
    })
  }

  const handleDeleteGame = async (gameId: number) => {
    // Confirm deletion
    if (!confirm("Are you sure you want to delete this game? This action cannot be undone.")) {
      return
    }

    try {
      await api.deleteGame(gameId)
      // Redirect to games list after deletion
      navigate("/games")
    } catch (err) {
      alert("Failed to delete game. Please try again.")
      console.error("Error deleting game:", err)
    }
  }

  const handleRSVP = async () => {
    if (!game) return

    const currentUserId = 1 // TODO: replace with real user ID from auth request

    try {
      await api.createRSVP(game.id, currentUserId)

      const [updatedGame, updatedRsvps] = await Promise.all([
        api.getGame(game.id),
        api.getRSVPs(game.id)
      ])

      setGame(updatedGame)
      setRsvps(updatedRsvps)

      alert("Successfully RSVP'd to the game!")
    } catch (err) {
      console.error("Error creating RSVP: ", err)
      const errorMessage = err instanceof Error ? err.message : "Failed to RSVP"
      alert(errorMessage)
    }
  }

  const handleCancelRSVP = async (rsvpId: number) => {
    if (!game) return

    if (!confirm("Are you sure you want to cancel your RSVP?")) {
      return
    }

    try {
      await api.deleteRSVP(rsvpId)

      // Refresh the game data and RSVPs
      const [updatedGame, updatedRsvps] = await Promise.all([
        api.getGame(game.id),
        api.getRSVPs(game.id)
      ])

      setGame(updatedGame)
      setRsvps(updatedRsvps)

      alert("RSVP cancelled successfully!")
    } catch (err) {
      console.error("Error cancelling RSVP:", err)
      alert("Failed to cancel RSVP. Please try again.")
    }
  }

  if (loading) {
    return (
      <PageTransition>
        <div className="container mx-auto px-4 py-8">
          <div className="flex min-h-[400px] items-center justify-center">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        </div>
      </PageTransition>
    )
  }

  if (error || !game) {
    return (
      <PageTransition>
        <div className="container mx-auto px-4 py-8">
          <div className="alert alert-error">
            <span>{error || "Game not found"}</span>
          </div>
        </div>
      </PageTransition>
    )
  }

  const spotsRemaining = game.max_capacity - game.current_capacity
  const isFull = spotsRemaining === 0

  console.log("Game organizer_id:", game.organizer_id)
  console.log("Current user id:", 1)
  console.log("Is organizer?", game.organizer_id === 1)

  return (
    <PageTransition>
      <div className="container mx-auto px-4 py-8">
        {/* Back button */}
        <div className="mb-6">
          <a href="/games" className="btn btn-ghost btn-sm">
            ← Back to Games
          </a>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Main Game Info */}
          <div className="lg:col-span-2">
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                {/* Title and Sport Badge */}
                <div className="flex items-start justify-between">
                  <div>
                    <h1 className="mb-2 text-3xl font-bold">{game.title}</h1>
                    <div className="badge badge-secondary badge-lg">{game.sport_type}</div>
                  </div>
                  {isFull && <div className="badge badge-error badge-lg">FULL</div>}
                </div>

                <div className="divider"></div>

                {/* Game Details Grid */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <h3 className="mb-1 text-sm font-semibold opacity-70">📍 Location</h3>
                    <p className="text-lg">{game.location}</p>
                  </div>
                  <div>
                    <h3 className="mb-1 text-sm font-semibold opacity-70">🗓️ Date & Time</h3>
                    <p className="text-lg">{formatDate(game.date)}</p>
                    <p className="text-lg">{formatTime(game.time)}</p>
                  </div>
                  <div>
                    <h3 className="mb-1 text-sm font-semibold opacity-70">👥 Capacity</h3>
                    <p className="text-lg">
                      {game.current_capacity} / {game.max_capacity} players
                    </p>
                    <progress
                      className={`progress ${isFull ? "progress-error" : "progress-success"} mt-2 w-full`}
                      value={game.current_capacity}
                      max={game.max_capacity}
                    />
                  </div>
                  <div>
                    <h3 className="mb-1 text-sm font-semibold opacity-70">✨ Available Spots</h3>
                    <p className={`text-2xl font-bold ${isFull ? "text-error" : "text-success"}`}>
                      {isFull ? "None" : spotsRemaining}
                    </p>
                  </div>
                </div>

                {game.description && (
                  <>
                    <div className="divider"></div>
                    <div>
                      <h3 className="mb-2 text-sm font-semibold opacity-70">📝 Description</h3>
                      <p className="text-base">{game.description}</p>
                    </div>
                  </>
                )}

                {/* RSVP Button */}
                <div className="card-actions mt-6 justify-end">
                  {/*TODO: replace with the real user ID from auth context */}
                  {game.organizer_id === 1 ? (
                    <div className="flex w-full justify-end gap-2">
                      <button className="btn btn-error" onClick={() => handleDeleteGame(game.id)}>
                        Delete Game
                      </button>
                      <button
                        className="btn btn-warning"
                        onClick={() => navigate(`/games/${game.id}/edit`)}
                      >
                        Edit Game
                      </button>
                    </div>
                  ) : (
                    // check if they're already RSVP'd
                    (() => {
                      const currentUserId = 1 // TODO: replcae with real user ID
                      const userRsvp = rsvps.find((rsvp) => rsvp.user_id === currentUserId)

                      return userRsvp ? (
                        <button
                          className="btn btn-error btn-lg"
                          onClick={() => handleCancelRSVP(userRsvp.id)}
                        >
                          Cancel RSVP
                        </button>
                      ) : (
                        // user hasn't RSVP'd - show the button to do so
                        <button
                          className="btn btn-primary btn-lg"
                          disabled={isFull}
                          onClick={handleRSVP}
                        >
                          {isFull ? "Game is Full" : "RSVP to this Game"}
                        </button>
                      )
                    })()
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Attendees Sidebar */}
          <div className="lg:col-span-1">
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <h2 className="card-title">Attendees ({rsvps.length})</h2>

                {rsvps.length === 0 ? (
                  <p className="text-sm opacity-70">No RSVPs yet. Be the first!</p>
                ) : (
                  <ul className="space-y-2">
                    {rsvps.map((rsvp) => (
                      <li
                        key={rsvp.id}
                        className="hover:bg-base-200 flex items-center gap-3 rounded-lg p-2"
                      >
                        {/* Avatar */}
                        <div className="avatar placeholder">
                          <div className="bg-neutral text-neutral-content w-10 rounded-full">
                            <span className="text-sm">{rsvp.user_name?.charAt(0) || "?"}</span>
                          </div>
                        </div>
                        {/* User Info */}
                        <div className="flex-1">
                          <p className="font-semibold">{rsvp.user_name || "Unknown"}</p>
                          <p className="text-xs opacity-70">
                            {rsvp.status === "confirmed" && "Confirmed"}
                            {rsvp.status === "waitlisted" && "Waitlisted"}
                            {rsvp.status === "rejected" && "Rejected"}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  )
}

function CreateGamePage() {
  return (
    <PageTransition>
      <div className="container mx-auto px-4 py-8">
        <CreateGameForm />
      </div>
    </PageTransition>
  )
}

function ProfilePage() {
  return (
    <PageTransition>
      <div className="container mx-auto px-4 py-8">
        <h1 className="mb-4 text-3xl font-bold">Your Profile</h1>
        <p>Profile settings will appear here.</p>
      </div>
    </PageTransition>
  )
}

function MyEventsPage() {
  const navigate = useNavigate()

  useEffect(() => {
    navigate("/", { replace: true })
  }, [navigate])

  return null
}

// 404 page
function NotFoundPage() {
  const navigate = useNavigate()

  return (
    <PageTransition>
      <div className="container mx-auto px-4 py-8">
        <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
          <h1 className="text-9xl font-bold">404</h1>
          <h2 className="mt-4 text-3xl font-semibold">Page Not Found</h2>
          <p className="mt-2 text-lg opacity-70">
            Oops! The page you're looking for doesn't exist.
          </p>
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
    </PageTransition>
  )
}

export default App
