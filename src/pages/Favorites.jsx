"use client"
import { useEffect, useState } from 'react';
import API from '../services/api';

export default function Favorites() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchFavs = async () => {
      try {
        const res = await API.get('/movies/favorites');
        setFavorites(res.data);
      } catch (err) {
        console.error('Failed to fetch favorites:', err.message);
      }
    };
    fetchFavs();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Your Favorites</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {favorites.map((movie) => (
          <div key={movie.id} className="bg-white rounded shadow overflow-hidden">
            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt='' className="w-full h-72 object-cover" />
            <div className="p-2">
              <h3 className="font-semibold text-lg truncate">{movie.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
