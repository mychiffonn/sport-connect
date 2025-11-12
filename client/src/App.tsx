import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

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
      <h1 className="mb-6 text-4xl font-bold">Sport Connect</h1>
      <p className="text-lg">
        Welcome to Sport Connect - Find and organize recreational sports events!
      </p>
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
