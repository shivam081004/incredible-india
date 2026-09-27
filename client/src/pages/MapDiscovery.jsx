import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CustomCursor } from '../components/core/CustomCursor';
import NavBar from '../components/NavBar.jsx';

const LANDMARKS = [
  { id: 1, name: "Taj Mahal", city: "Agra", category: "Monument", image: "https://images.unsplash.com/photo-1564507592333-c60657e1e4b0?w=400&h=300&fit=crop", description: "Symbol of love and one of the Seven Wonders" },
  { id: 2, name: "Goa Beaches", city: "Goa", category: "Beaches", image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop", description: "Golden sands and vibrant nightlife" },
  { id: 3, name: "Hawa Mahal", city: "Jaipur", category: "Heritage", image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=400&h=300&fit=crop", description: "The Pink City's iconic structure" },
  { id: 4, name: "Ladakh Mountains", city: "Ladakh", category: "Nature", image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop", description: "Majestic peaks and pristine landscapes" },
  { id: 5, name: "Kerala Backwaters", city: "Kerala", category: "Nature", image: "https://images.unsplash.com/photo-1537225228614-b4faea917c4f?w=400&h=300&fit=crop", description: "Serene waterways and houseboats" },
  { id: 6, name: "Red Fort", city: "Delhi", category: "Monument", image: "https://images.unsplash.com/photo-1518684185147-78519c66842f?w=400&h=300&fit=crop", description: "Historic fortress in the heart of Delhi" },
  { id: 7, name: "Varanasi Ghats", city: "Varanasi", category: "Spiritual", image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop", description: "Sacred riverside spirituality" },
  { id: 8, name: "Andaman Islands", city: "Andaman", category: "Islands", image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop", description: "Tropical paradise with pristine beaches" },
];

export default function MapDiscovery() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [filteredLandmarks, setFilteredLandmarks] = useState(LANDMARKS);

  const categories = ['All', 'Monument', 'Beaches', 'Heritage', 'Nature', 'Spiritual', 'Islands'];

  useEffect(() => {
    let filtered = LANDMARKS;

    if (selectedCategory !== 'All') {
      filtered = filtered.filter(l => l.category === selectedCategory);
    }

    if (searchTerm) {
      filtered = filtered.filter(l =>
        l.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        l.city.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredLandmarks(filtered);
  }, [searchTerm, selectedCategory]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <CustomCursor />
      <NavBar />

      {/* Hero Section */}
      <div className="relative h-80 bg-cover bg-center overflow-hidden" style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=400&fit=crop')",
      }}>
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 to-slate-900/60"></div>

        <motion.div
          className="relative h-full flex flex-col justify-center items-center text-center px-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-5xl font-bold text-white mb-4">🗺️ Explore India</h1>
          <p className="text-xl text-gray-200 max-w-2xl">
            From snow-capped mountains to sun-kissed beaches, India has it all. Find your next adventure.
          </p>
        </motion.div>
      </div>

      {/* Search Bar */}
      <div className="max-w-7xl mx-auto px-8 -mt-12 relative z-10 mb-16">
        <motion.div
          className="bg-white rounded-lg shadow-2xl p-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">📍 Where do you want to go?</label>
              <input
                type="text"
                placeholder="e.g. Goa, Jaipur, Kerala"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">📅 Check-in - Check-out</label>
              <input type="date" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500" />
            </div>
            <div className="flex items-end">
              <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-lg transition">
                Search
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Category Filter */}
      <div className="max-w-7xl mx-auto px-8 mb-16">
        <div className="flex overflow-x-auto gap-2 pb-4">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-6 py-2 rounded-full font-semibold whitespace-nowrap transition ${
                selectedCategory === cat
                  ? 'bg-orange-500 text-white'
                  : 'bg-white/10 text-gray-200 hover:bg-white/20'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Landmarks Grid */}
      <div className="max-w-7xl mx-auto px-8 pb-16">
        <h2 className="text-3xl font-bold text-white mb-8">Popular Destinations</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredLandmarks.map((landmark, i) => (
            <motion.div
              key={i}
              className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition cursor-pointer group"
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="h-48 overflow-hidden">
                <img
                  src={landmark.image}
                  alt={landmark.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-bold text-gray-800">{landmark.name}</h3>
                <p className="text-sm text-gray-600 mb-2">{landmark.city}</p>
                <p className="text-xs text-gray-500 mb-4">{landmark.category}</p>
                <p className="text-sm text-gray-700 line-clamp-2 mb-4">{landmark.description}</p>
                <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg transition">
                  Explore
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
