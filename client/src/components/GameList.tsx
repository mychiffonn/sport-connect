import { useEffect, useState } from "react"
import { api, type Game } from "../services/api"
import { GameCard } from "./GameCard"

export function GameList() {
  const [games, setGames] = useState<Game[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // fetch games when component mounts
  useEffect(() => {
    const fetchGames = async () => {
      try {
        setLoading(true)
        const data = await api.getGames()
        setGames(data)
        setError(null)
      } catch (err) {
        setError("Failed to load games. Please try again later.")
        console.error("Error fetching games: ", err)
      } finally {
        setLoading(false)
      }
    }
    fetchGames()
  }, [])

  // loading state
  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    )
  }

  // error state
  if (error) {
    return (
      <div className="alert alert-error">
        <span>{error}</span>
      </div>
    )
  }

  // empty state
  if (games.length === 0) {
    return (
      <div className="alert alert-info">
        <span>No games available. Be the first to create one!</span>
      </div>
    )
  }

  // games grid
  return (
    <div className="lg:grid-cols3 grid grid-cols-1 gap-6 md:grid-cols-2">
      {games.map((game) => (
        <GameCard key={game.id} game={game} />
      ))}
    </div>
  )
}
