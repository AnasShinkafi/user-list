"use client"
import { useEffect, useState } from 'react';
import API from '../services/api';

export default function Watchlist() {
  const [watchlist, setWatchlist] = useState([]);

  const fetchWatchlist = async () => {
    try {
      const res = await API.get('/movies/watchlist');
      setWatchlist(res.data);
    } catch (err) {
      console.error('Failed to load watchlist');
    }
  };

  const removeFromWatchlist = async (id) => {
    try {
      await API.delete(`/movies/watchlist/${id}`);
      fetchWatchlist();
    } catch (err) {
      console.error('Failed to remove movie');
    }
  };

  useEffect(() => {
    fetchWatchlist();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Your Watchlist</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {watchlist.map((movie) => (
          <div key={movie.id} className="bg-white rounded shadow overflow-hidden">
            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt='' className="w-full h-72 object-cover" />
            <div className="p-2">
              <h3 className="font-semibold text-lg truncate">{movie.title}</h3>
              <button
                onClick={() => removeFromWatchlist(movie.id)} 
                className="mt-2 bg-red-500 text-white px-3 py-1 rounded"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
