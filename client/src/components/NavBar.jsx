import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { motion } from 'framer-motion';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    { path: '/home', label: 'Map', icon: '🗺️' },
    { path: '/route-finder', label: 'Route', icon: '🚗' },
    { path: '/hotels', label: 'Hotels', icon: '🏨' },
    { path: '/ai-guide', label: 'AI Guide', icon: '🤖' },
  ];

  return (
    <nav className="bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/home" className="flex items-center gap-2 text-2xl font-bold">
          <span className="text-3xl">🏛️</span>
          <span>India Tour Guide</span>
        </Link>

        {/* Desktop menu */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className="flex items-center gap-2 hover:bg-white hover:bg-opacity-20 px-3 py-2 rounded-lg transition"
            >
              <span className="text-lg">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          ))}
        </div>

        {/* User menu */}
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-2">
            <span className="text-sm">👤</span>
            <span className="text-sm">{user?.fullName || user?.email}</span>
          </div>

          <motion.button
            onClick={handleLogout}
            className="px-4 py-2 bg-white bg-opacity-20 rounded-lg hover:bg-opacity-30 transition"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Logout
          </motion.button>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-2xl"
          >
            ☰
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <motion.div
          className="md:hidden bg-orange-600 px-4 py-4 space-y-2"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className="block px-4 py-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition"
              onClick={() => setIsMenuOpen(false)}
            >
              <span className="text-lg mr-2">{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;
