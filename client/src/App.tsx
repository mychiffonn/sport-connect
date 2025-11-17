import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import Layout from "@/layouts/Layout"
import HomePage from "@/pages/HomePage"
import BrowseGamesPage from "@/pages/BrowseGamesPage"
import GameDetailPage from "@/pages/GameDetailPage"
import EditGamePage from "@/pages/EditGamePage"
import CreateGamePage from "@/pages/CreateGamePage"
import ProfilePage from "@/pages/ProfilePage"
import MyEventsPage from "@/pages/MyEventsPage"
import NotFoundPage from "@/pages/NotFoundPage"

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/games" element={<BrowseGamesPage />} />
          <Route path="/games/:id" element={<GameDetailPage />} />
          <Route path="/games/:id/edit" element={<EditGamePage />} />
          <Route path="/games/new/" element={<CreateGamePage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/my-events" element={<MyEventsPage />} />
          <Route path="*" element={<NotFoundPage />} /> {/*caches all unmatched routes*/}
        </Routes>
      </Layout>
    </Router>
  )
}

export default App
