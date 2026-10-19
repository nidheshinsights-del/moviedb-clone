import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaFilm, FaUserCircle, FaBell } from 'react-icons/fa';

const Navbar = () => {
  const { user, token, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [unreadCount, setUnreadCount] = useState(0);

  // Fetch unread count whenever the user, token, or current page changes
  useEffect(() => {
    const fetchUnreadCount = async () => {
      if (!token) return;
      try {
        const response = await fetch('/api/notifications/unread-count', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await response.json();
        if (response.ok) {
          setUnreadCount(data.count);
        }
      } catch (error) {
        console.error('Failed to fetch unread count', error);
      }
    };

    fetchUnreadCount();
  }, [token, location.pathname]); // Re-run when page changes (e.g., after marking as read)

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-moviedb-gray border-b border-gray-800 p-4 flex justify-between items-center">
      <Link to="/" className="text-yellow-400 text-2xl font-bold flex items-center gap-2">
        <FaFilm /> MovieDB
      </Link>
      
      <div className="flex items-center gap-6">
        {user ? (
          <>
            <Link to="/" className="text-white hover:text-yellow-400">Home</Link>
            <Link to="/follow" className="text-white hover:text-yellow-400">Follow Actors</Link>
            {user.role === 'ADMIN' && (
              <Link to="/admin" className="text-red-400 hover:text-red-300 font-bold">Admin</Link>
            )}
            
            {/* NOTIFICATION BELL WITH BADGE */}
            <Link to="/notifications" className="relative text-white hover:text-yellow-400">
              <FaBell size={20} />
              {unreadCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </Link>

            <div className="flex items-center gap-2 text-white">
              <FaUserCircle size={24} />
              <span>{user.username}</span>
              <button onClick={handleLogout} className="ml-2 bg-red-600 px-3 py-1 rounded text-sm hover:bg-red-700 transition">Logout</button>
            </div>
          </>
        ) : (
          <>
            <Link to="/login" className="text-white hover:text-yellow-400">Login</Link>
            <Link to="/register" className="bg-yellow-400 text-black px-4 py-1 rounded font-bold hover:bg-yellow-500 transition">Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;