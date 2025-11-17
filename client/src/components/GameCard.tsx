import type { Game } from "../services/api"
import { Link } from "react-router-dom"

interface GameCardProps {
  game: Game
  currentUserId?: number
}

export function GameCard({ game, currentUserId }: GameCardProps) {
  // date formatting
  const formatDate = (dateString: string) => {
    // the date comes as a UTC string, convert to local
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric"
    })
  }

  const formatTime = (timeString: string) => {
    // add 'Z' to indicate UTC, then convert to local
    const dateTime = new Date(`${game.date.split("T")[0]}T${timeString}Z`)

    return dateTime.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true
    })
  }

  // calc spots remaning
  const spotsRemaining = game.max_capacity - game.current_capacity
  const isFull = spotsRemaining === 0

  const isOrganizer = currentUserId && game.organizer_id === currentUserId

  return (
    <div className="card bg-base-100 shadow-xl transition-shadow hover:shadow-2xl">
      <div className="card-body">
        {/*title and sports title*/}
        {/*title and sports title*/}
        {/*title and sports title*/}
        <h2 className="card-title">
          <span className="flex-1 truncate">{game.title}</span>
          <div className="badge badge-secondary whitespace-nowrap">{game.sport_type}</div>
          {isOrganizer && (
            <div className="badge badge-accent whitespace-nowrap">You're Hosting</div>
          )}
        </h2>
        {/* location */}
        <p className="text-sm opacity-70">{game.location}</p>

        {/*date and time*/}
        <p className="text-sm">
          {formatDate(game.date)} at {formatTime(game.time)}
        </p>

        {/* description*/}
        {game.description && <p className="mt-2 text-sm">{game.description}</p>}

        {/*capacity*/}
        <div className="mt-4">
          <div className="mb-1 flex items-center justify-between">
            <span className="text-sm font-semibold">
              {game.current_capacity} / {game.max_capacity} player
            </span>
            <span className={`text-sm ${isFull ? "text-error" : "text-success"}`}>
              {isFull ? "FULL" : `${spotsRemaining} spots left`}
            </span>
          </div>
          <progress
            className={`progress ${isFull ? "progress-error" : "progress-success"} w-full`}
            value={game.current_capacity}
            max={game.max_capacity}
          />
        </div>
        {/*actions*/}
        <div className="card-actions mt-4 justify-end">
          <Link to={`/games/${game.id}`} className="btn btn-primary btn-sm">
            {isFull ? "Full - View Details" : "View Details"}
          </Link>
        </div>
      </div>
    </div>
  )
}
