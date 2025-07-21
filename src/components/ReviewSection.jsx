"use client"
import { useEffect, useState } from 'react';
import API from '../services/api';
import { useAuth } from '../context/AuthContext';

export default function ReviewSection({ movie }) {
  const { user } = useAuth();
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');

  const fetchReviews = async () => {
    try {
      const res = await API.get(`/reviews/${movie.id}`);
      setReviews(res.data);
    } catch (err) {
      console.error('Failed to load reviews');
    }
  };
  
  useEffect(() => {
    fetchReviews();
  }, [movie.id, fetchReviews]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/reviews', {
        movieId: movie.id,
        movieTitle: movie.title,
        rating,
        comment,
      });
      setComment('');
      fetchReviews();
    } catch (err) {
      alert(err?.response?.data?.message || 'Review submission failed');
    }
  };

  return (
    <div className="mt-8">
      <h3 className="text-xl font-semibold mb-2">💬 Reviews</h3>

      {user && (
        <form onSubmit={handleSubmit} className="mb-6 bg-white p-4 rounded shadow">
          <label className="block mb-2">Your Rating (1-10):</label>
          <input
            type="number"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            min="1"
            max="10"
            className="w-20 border p-1 mb-3"
            required
          />

          <label className="block mb-2">Comment:</label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows="3"
            className="w-full border p-2 mb-3"
          />

          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Submit Review
          </button>
        </form>
      )}

      {reviews.length === 0 ? (
        <p className="text-gray-500">No reviews yet.</p>
      ) : (
        <ul className="space-y-4">
          {reviews.map((rev) => (
            <li key={rev._id} className="border-b pb-2">
              <p className="text-sm font-semibold">
                {rev.user?.name || 'Anonymous'} rated {rev.rating}/10
              </p>
              <p className="text-sm">{rev.comment}</p>
              <p className="text-xs text-gray-400">{new Date(rev.createdAt).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
