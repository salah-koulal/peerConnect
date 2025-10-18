import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({ currentPage }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    navigate('/'); // redirect to home
  };

  return (
    <header className="flex items-center justify-between px-6 py-4 bg-gray-800 border-b border-gray-700">
      <h1 className="text-2xl font-semibold text-indigo-400">peerConnect</h1>
      <nav className="space-x-4 flex">
        <Link
          to="/"
          className={`${currentPage === 'home' ? 'text-indigo-400 font-medium' : 'text-gray-300 hover:text-indigo-400'}`}
        >
          Home
        </Link>

        {user && (
          <>
            <Link
              to="/dashboard"
              className={`${currentPage === 'dashboard' ? 'text-indigo-400 font-medium' : 'text-gray-300 hover:text-indigo-400'}`}
            >
              Dashboard
            </Link>
          </>
        )}

        {!user ? (
          <Link
            to="/login"
            className="bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-md font-semibold"
          >
            Login
          </Link>
        ) : (
          <div className="flex justify-center gap-3">
            <Link
              to="/create-group"
              className={`${currentPage === 'create-group' ? 'text-indigo-400 font-medium' : 'text-gray-300 hover:text-indigo-400'} bg-green-600 hover:bg-green-700 px-4 py-2 rounded-md font-semibold text-white`}
            >
              Create Group
            </Link>
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-md font-semibold text-white"
            >
              Logout
            </button>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
