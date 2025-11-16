import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { GameList } from "./components/GameList"

function App() {
  return (
    <Router>
      <div className="bg-base-100 min-h-screen">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/events/:id" element={<EventDetailPage />} />
          <Route path="/new" element={<CreateEventPage />} />
        </Routes>
      </div>
    </Router>
  )
}

// Placeholder components
function HomePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="mb-2 text-4xl font-bold">Sports Connect</h1>
        <p className="text-lg opacity-70">
          Find and join recreational sports evens in your community
        </p>
      </div>

      <GameList />
    </div>
  )
}

function EventDetailPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-4 text-3xl font-bold">Event Details</h1>
      <p>Event details will appear here.</p>
    </div>
  )
}

function CreateEventPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-4 text-3xl font-bold">Create New Event</h1>
      <p>Event creation form will appear here.</p>
    </div>
  )
}

export default App
