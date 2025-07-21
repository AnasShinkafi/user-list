import { useEffect, useState } from 'react';
import API from '../services/api';

export default function Home() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await API.get('/movies/discover');
        setMovies(res.data.results); // assumes results is an array
      } catch (err) {
        console.error('Failed to fetch movies:', err.message);
      }
    };
    fetchMovies();
  }, []);

  const handleAddFavorite = async (movie) => {
    try {
      await API.post('/movies/favorites', { movie });
      alert(`${movie.title} added to favorites!`);
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to add to favorites');
    }
  };

  const handleAddWatchlist = async (movie) => {
    try {
      await API.post('/movies/watchlist', { movie });
      alert(`${movie.title} added to watchlist!`);
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to add to watchlist');
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Discover Popular Movies</h2>
      <button
  onClick={() => handleAddFavorite()} //movie
  className="bg-yellow-500 hover:bg-yellow-600 text-white mt-2 px-2 py-1 rounded text-sm"
>
  Add to Favorites
</button>
<button
  onClick={() => handleAddWatchlist()} //movie
  className="bg-green-600 hover:bg-green-700 text-white mt-1 px-2 py-1 rounded text-sm"
>
  Add to Watchlist
</button>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {movies.map((movie) => (
          <div key={movie.id} className="bg-white rounded shadow overflow-hidden">
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="w-full h-72 object-cover"
            />
            <div className="p-2">
              <h3 className="font-semibold text-lg truncate">{movie.title}</h3>
              <p className="text-sm text-gray-500">{movie.release_date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
