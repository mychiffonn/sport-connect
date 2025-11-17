import { GameList } from "@/components/GameList"
import PageTransition from "@/components/PageTransition"

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

export default BrowseGamesPage
