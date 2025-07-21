import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import MovieDetails from './pages/MovieDetails'
import Favorites from './pages/Favorites';
import ProtectedRoute from './components/ProtectedRoutes';
import Search from './pages/Search';
import Profile from './pages/Profile';
import './App.css';



export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-950 text-gray-100">
      <Navbar />
      <div className="container mx-auto p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
          <Route path="/search" element={<Search />} />
          {/* Protected routes */}
          <Route element={<ProtectedRoute />}>
          <Route path="/watchlist" element={<Watchlist />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/watchlist" element={<Watchlist />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Routes>
      </div>
    </div>
    </BrowserRouter>
  );
}