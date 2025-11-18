import { GameList } from "@/components/GameList"

function BrowseGamesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4x1 mb-2 font-bold">Browse Games</h1>
        <p className="text-lg opacity-70">
          Find and join recreational sports events in your community
        </p>
      </div>
      <GameList />
    </div>
  )
}

export default BrowseGamesPage
