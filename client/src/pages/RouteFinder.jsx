import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CustomCursor } from '../components/core/CustomCursor';
import NavBar from '../components/NavBar.jsx';

const PLACES = [
  { name: 'Goa', lat: 15.2993, lng: 73.8243 },
  { name: 'Jaipur', lat: 26.9124, lng: 75.7873 },
  { name: 'Delhi', lat: 28.7041, lng: 77.1025 },
  { name: 'Agra', lat: 27.1767, lng: 78.0081 },
  { name: 'Kerala', lat: 10.8505, lng: 76.2711 },
];

export default function RouteFinder() {
  const [origin, setOrigin] = useState('Delhi');
  const [destination, setDestination] = useState('Jaipur');
  const [mode, setMode] = useState('train');
  const [routes, setRoutes] = useState([]);

  const transportModes = [
    { id: 'train', label: 'Train', icon: '🚂' },
    { id: 'bus', label: 'Bus', icon: '🚌' },
    { id: 'flight', label: 'Flight', icon: '✈️' },
    { id: 'car', label: 'Car', icon: '🚗' },
    { id: 'auto', label: 'Auto', icon: '🛺' },
  ];

  const handleSearch = () => {
    setRoutes([
      { id: 1, duration: '8h 30m', distance: '240 km', price: '₹800', stops: 2 },
      { id: 2, duration: '10h 15m', distance: '240 km', price: '₹600', stops: 0 },
      { id: 3, duration: '9h', distance: '240 km', price: '₹700', stops: 1 },
    ]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <CustomCursor />
      <NavBar />

      {/* Hero Section */}
      <motion.div
        className="text-center py-16 px-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-5xl font-bold text-white mb-4">🗺️ Find Your Route</h1>
        <p className="text-xl text-gray-200">Discover the best way to reach your destination</p>
      </motion.div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-8 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Search Form */}
          <motion.div
            className="bg-white rounded-xl shadow-lg p-8"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Search Route</h2>

            <div className="space-y-4">
              {/* Origin */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">From</label>
                <select
                  value={origin}
                  onChange={(e) => setOrigin(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  {PLACES.map(p => (
                    <option key={p.name} value={p.name}>{p.name}</option>
                  ))}
                </select>
              </div>

              {/* Destination */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">To</label>
                <select
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  {PLACES.map(p => (
                    <option key={p.name} value={p.name}>{p.name}</option>
                  ))}
                </select>
              </div>

              {/* Transport Mode */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">Transport Mode</label>
                <div className="space-y-2">
                  {transportModes.map(t => (
                    <button
                      key={t.id}
                      onClick={() => setMode(t.id)}
                      className={`w-full px-4 py-3 rounded-lg font-semibold transition text-left ${
                        mode === t.id
                          ? 'bg-orange-500 text-white'
                          : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                      }`}
                    >
                      {t.icon} {t.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Search Button */}
              <button
                onClick={handleSearch}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-lg transition mt-6"
              >
                Search Routes
              </button>
            </div>
          </motion.div>

          {/* Routes */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h2 className="text-2xl font-bold text-white mb-6">Available Routes</h2>
            <div className="space-y-4">
              {routes.length === 0 ? (
                <div className="bg-white/10 backdrop-blur border border-white/20 rounded-lg p-12 text-center">
                  <p className="text-gray-300 text-lg">Click "Search Routes" to find available options</p>
                </div>
              ) : (
                routes.map((route, i) => (
                  <motion.div
                    key={i}
                    className="bg-white rounded-lg shadow-lg p-6 hover:shadow-2xl transition"
                    whileHover={{ scale: 1.02 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <div className="grid grid-cols-4 gap-4 mb-4">
                      <div>
                        <p className="text-xs text-gray-600">Duration</p>
                        <p className="text-lg font-bold text-gray-800">{route.duration}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600">Distance</p>
                        <p className="text-lg font-bold text-gray-800">{route.distance}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600">Stops</p>
                        <p className="text-lg font-bold text-gray-800">{route.stops}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600">Price</p>
                        <p className="text-2xl font-bold text-orange-500">{route.price}</p>
                      </div>
                    </div>
                    <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg transition">
                      Book Now
                    </button>
                  </motion.div>
                ))
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
