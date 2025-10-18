import { NavLink } from 'react-router-dom';

export default function Navbar() {
  return (
    <header className="flex items-center justify-between px-6 py-4 bg-gray-800 border-b border-gray-700">
      <h1 className="text-2xl font-semibold text-indigo-400">peerConnect</h1>
      <nav className="space-x-4">
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            isActive ? 'text-indigo-400 font-medium' : 'text-gray-300 hover:text-indigo-400'
          }
        >
          Dashboard
        </NavLink>
        <NavLink
          to="/group"
          className={({ isActive }) =>
            isActive ? 'text-indigo-400 font-medium' : 'text-gray-300 hover:text-indigo-400'
          }
        >
          Groups
        </NavLink>
        <NavLink
          to="/login"
          className="bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-md font-semibold"
        >
          Logout
        </NavLink>
      </nav>
    </header>
  );
}
