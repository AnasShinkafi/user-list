import { useEffect, useState } from 'react';
import API from '../services/api';

export default function Profile() {
  const [user, setUser] = useState(null);

  const fetchProfile = async () => {
    try {
      const res = await API.get('/user/profile');
      setUser(res.data);
    } catch (err) {
      console.error('Failed to load profile');
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  if (!user) return <div className="p-4">Loading profile...</div>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-2">👤 Profile</h2>
      <p className="mb-4 text-gray-700">Name: {user.name} <br /> Email: {user.email}</p>

      <h3 className="text-xl font-semibold mb-2">⭐ Favorites</h3>
      {user.favorites?.length === 0 ? (
        <p className="text-gray-500 mb-4">No favorite movies yet.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {user.favorites.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}

      <h3 className="text-xl font-semibold mb-2">🎬 Watchlist</h3>
      {user.watchlist?.length === 0 ? (
        <p className="text-gray-500">Your watchlist is empty.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {user.watchlist.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
}

function MovieCard({ movie }) {
  return (
    <div className="bg-white rounded shadow overflow-hidden">
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        className="w-full h-72 object-cover"
        alt={movie.title}
      />
      <div className="p-2">
        <h4 className="font-semibold text-md truncate">{movie.title}</h4>
        <p className="text-sm text-gray-600">{movie.release_date}</p>
      </div>
    </div>
  );
}
