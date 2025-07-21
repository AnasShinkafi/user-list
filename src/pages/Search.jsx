import { useState } from 'react';
import API from '../services/api';

export default function Search() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    try {
      const res = await API.get(`/movies/search?query=${query}`);
      setResults(res.data.results);
    } catch (err) {
      alert('Search failed: ' + err.message);
    }
  };

  return (
    <div className="p-4">
      <form onSubmit={handleSearch} className="mb-4">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search movies by title..."
          className="border p-2 rounded w-full md:w-1/2"
        />
        <button type="submit" className="ml-2 bg-blue-600 text-white px-4 py-2 rounded">Search</button>
      </form>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {results.map((movie) => (
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
