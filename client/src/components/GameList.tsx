import { useEffect, useState } from "react"
import { api, type Game } from "../services/api"
import { GameCard } from "./GameCard"
import { FilterBar } from "./FilterBar"

export function GameList() {
  const [games, setGames] = useState<Game[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [filters, setFilters] = useState<{
    sport_type?: string
    location?: string
    date?: string
    has_spots?: boolean
    search?: string
    sort?: string
  }>({})

  // fetch games when component mounts
  useEffect(() => {
    const fetchGames = async () => {
      try {
        setLoading(true)
        const data = await api.getGames(filters)
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
  }, [filters])

  // handle filter changes
  const handleFilterChange = (newFilters: typeof filters) => {
    setFilters(newFilters)
  }

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

  return (
    <div>
      {/* Filter Bar */}
      <FilterBar onFilterChange={handleFilterChange} />

      {/* Empty state */}
      {games.length === 0 ? (
        <div className="alert alert-info">
          <span>No games found matching your filters. Try adjusting your search!</span>
        </div>
      ) : (
        /* Games grid */
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {games.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      )}
    </div>
  )
}
