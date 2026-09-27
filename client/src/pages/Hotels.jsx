import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CustomCursor } from '../components/core/CustomCursor';
import NavBar from '../components/NavBar.jsx';

const HOTELS = [
  { id: 1, name: "Goa Beach Resort", location: "Goa", rating: 4.8, price: "₹5,000/night", image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop", status: "Confirmed" },
  { id: 2, name: "Jaipur Heritage Hotel", location: "Jaipur", rating: 4.6, price: "₹3,500/night", image: "https://images.unsplash.com/photo-1564507592333-c60657e1e4b0?w=400&h=300&fit=crop", status: "Confirmed" },
  { id: 3, name: "Kerala Houseboat", location: "Kerala", rating: 4.9, price: "₹4,000/night", image: "https://images.unsplash.com/photo-1537225228614-b4faea917c4f?w=400&h=300&fit=crop", status: "Pending" },
];

const CULTURAL_PLACES = [
  { id: 1, name: "Taj Mahal", location: "Agra", type: "Monument", free: true, image: "https://images.unsplash.com/photo-1564507592333-c60657e1e4b0?w=400&h=300&fit=crop" },
  { id: 2, name: "Red Fort", location: "Delhi", type: "Historical", free: false, image: "https://images.unsplash.com/photo-1518684185147-78519c66842f?w=400&h=300&fit=crop" },
  { id: 3, name: "Varanasi Ghats", location: "Varanasi", type: "Spiritual", free: true, image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop" },
];

export default function Hotels() {
  const [activeTab, setActiveTab] = useState('hotels');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <CustomCursor />
      <NavBar />

      {/* Header */}
      <motion.div
        className="bg-gradient-to-r from-orange-500 to-red-500 text-white py-12 px-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <h1 className="text-4xl font-bold mb-2">🏨 Hotels & Places</h1>
        <p className="text-lg">Find the best stays and free cultural spots</p>
      </motion.div>

      {/* Tabs */}
      <div className="max-w-7xl mx-auto px-8 mt-8 mb-12">
        <motion.div
          className="flex gap-4 bg-white/10 backdrop-blur p-2 rounded-lg w-fit"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <button
            onClick={() => setActiveTab('hotels')}
            className={`px-8 py-3 rounded-lg font-semibold transition ${
              activeTab === 'hotels'
                ? 'bg-orange-500 text-white'
                : 'text-gray-300 hover:text-white'
            }`}
          >
            🏨 Hotels & Food
          </button>
          <button
            onClick={() => setActiveTab('cultural')}
            className={`px-8 py-3 rounded-lg font-semibold transition ${
              activeTab === 'cultural'
                ? 'bg-orange-500 text-white'
                : 'text-gray-300 hover:text-white'
            }`}
          >
            🕌 Free & Cultural
          </button>
        </motion.div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-8 pb-16">
        {activeTab === 'hotels' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <h2 className="text-3xl font-bold text-white mb-8">My Bookings</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {HOTELS.map((hotel, i) => (
                <motion.div
                  key={i}
                  className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition"
                  whileHover={{ scale: 1.05 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <img src={hotel.image} alt={hotel.name} className="w-full h-48 object-cover" />
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-bold text-gray-800">{hotel.name}</h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        hotel.status === 'Confirmed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {hotel.status}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-2">📍 {hotel.location}</p>
                    <p className="text-lg font-bold text-orange-500 mb-4">{hotel.price}</p>
                    <div className="flex gap-2">
                      <button className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg transition">
                        View Details
                      </button>
                      <button className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 rounded-lg transition">
                        Modify
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {activeTab === 'cultural' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <h2 className="text-3xl font-bold text-white mb-8">Free & Cultural Spots</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {CULTURAL_PLACES.map((place, i) => (
                <motion.div
                  key={i}
                  className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition"
                  whileHover={{ scale: 1.05 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <img src={place.image} alt={place.name} className="w-full h-48 object-cover" />
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{place.name}</h3>
                    <p className="text-gray-600 mb-2">📍 {place.location}</p>
                    <div className="flex justify-between items-center mb-4">
                      <span className="bg-purple-100 text-purple-800 text-xs font-semibold px-3 py-1 rounded-full">
                        {place.type}
                      </span>
                      <span className="text-lg font-bold text-green-600">
                        {place.free ? 'FREE ✓' : 'Paid'}
                      </span>
                    </div>
                    <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg transition">
                      Learn More
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
