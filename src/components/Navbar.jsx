import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  // const { user, logout } = useAuth(user);

  return (
    <nav className="bg-gray-900 shadow w-full">
      <div className="container mx-auto flex items-center justify-between p-4">
        <Link to="/" className="text-xl font-bold text-emerald-400">MovieBox</Link>
        <div className="flex gap-4 items-center">
          {/* {user ? ( */}
            <>
              <Link to="/favorites">Favorites</Link>
              <Link to="/watchlist">Watchlist</Link>
              {/* <button onClick={logout} className="text-red-400">Logout</button> */}
            </>
          {/* ) : ( */}
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          {/* )} */}
        </div>
      </div>
    </nav>
  );
}