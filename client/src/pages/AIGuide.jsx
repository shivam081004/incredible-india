import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CustomCursor } from '../components/core/CustomCursor';
import NavBar from '../components/NavBar.jsx';

const PLACES = [
  { id: 1, name: 'Taj Mahal', city: 'Agra', description: 'A white marble mausoleum symbolizing eternal love', image: 'https://images.unsplash.com/photo-1564507592333-c60657e1e4b0?w=400&h=300&fit=crop' },
  { id: 2, name: 'Goa Beaches', city: 'Goa', description: 'Golden beaches with vibrant nightlife and water sports', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop' },
  { id: 3, name: 'Jaipur City Palace', city: 'Jaipur', description: 'A blend of Rajasthani and Mughal architecture', image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=400&h=300&fit=crop' },
  { id: 4, name: 'Ladakh Mountains', city: 'Ladakh', description: 'Majestic Himalayan peaks and pristine landscapes', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop' },
];

export default function AIGuide() {
  const [selectedPlace, setSelectedPlace] = useState(PLACES[0]);
  const [guide, setGuide] = useState('');
  const [tips, setTips] = useState('');
  const [loading, setLoading] = useState(false);
  const [ollamaStatus] = useState('online');

  const generateGuide = async () => {
    setLoading(true);
    setTimeout(() => {
      setGuide(`Welcome to ${selectedPlace.name}!\n\nThis magnificent landmark is one of India's most visited attractions. ${selectedPlace.description}\n\nBest time to visit: October to March\nExpected duration: 2-3 hours\n\nDon't miss:\n- Sunrise views are spectacular\n- Visit the museum for historical insights\n- Photography is allowed\n\nTips:\n- Wear comfortable shoes\n- Carry water and sun protection\n- Hire a guide for detailed information`);
      setLoading(false);
    }, 1000);
  };

  const generateTips = async () => {
    setLoading(true);
    setTimeout(() => {
      setTips(`Travel Tips for ${selectedPlace.city}:\n\n✈️ Getting There:\n- Flights available from major cities\n- Train connections available\n- Road trips are scenic\n\n🏨 Accommodation:\n- Budget hotels: ₹1000-2000/night\n- Mid-range: ₹2000-5000/night\n- Luxury: ₹5000+/night\n\n🍽️ Food:\n- Local cuisine is must-try\n- Street food is delicious but eat carefully\n- Vegetarian options widely available\n\n💰 Budget:\n- Daily budget: ₹2000-4000 per person\n- Entrance fees: ₹300-500\n- Food: ₹500-1000/day\n\n🎒 Packing:\n- Light cotton clothes\n- Sunscreen and hat\n- Comfortable shoes\n- Power bank for phones`);
      setLoading(false);
    }, 1000);
  };

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
        <h1 className="text-4xl font-bold mb-2">🤖 AI Tour Guide</h1>
        <p className="text-lg">Get intelligent insights about India's landmarks powered by AI</p>
        <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/20">
          <div className="w-3 h-3 rounded-full bg-green-400"></div>
          <span className="text-sm font-semibold">AI Engine: 🟢 Online</span>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Place Selector */}
          <motion.div
            className="bg-white rounded-xl shadow-lg p-6 h-fit"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h2 className="text-lg font-bold text-gray-800 mb-4">📍 Select Place</h2>
            <div className="space-y-2">
              {PLACES.map(place => (
                <button
                  key={place.id}
                  onClick={() => {
                    setSelectedPlace(place);
                    setGuide('');
                    setTips('');
                  }}
                  className={`w-full text-left px-4 py-3 rounded-lg transition ${
                    selectedPlace.id === place.id
                      ? 'bg-orange-500 text-white'
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                  }`}
                >
                  <h3 className="font-semibold text-sm">{place.name}</h3>
                  <p className="text-xs opacity-75">{place.city}</p>
                </button>
              ))}
            </div>
          </motion.div>

          {/* Guide Content */}
          <motion.div
            className="lg:col-span-3 space-y-4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            {selectedPlace && (
              <>
                {/* Place Info */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <div className="flex gap-4">
                    <img src={selectedPlace.image} alt={selectedPlace.name} className="w-24 h-24 object-cover rounded-lg" />
                    <div>
                      <h2 className="text-2xl font-bold text-gray-800">{selectedPlace.name}</h2>
                      <p className="text-gray-600">📍 {selectedPlace.city}</p>
                      <p className="text-sm text-gray-600 mt-2">{selectedPlace.description}</p>
                    </div>
                  </div>
                </div>

                {/* Query Input */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <label className="block text-sm font-semibold text-gray-700 mb-4">Ask a specific question (optional):</label>
                  <div className="flex gap-2 flex-wrap">
                    <button
                      onClick={generateGuide}
                      disabled={loading}
                      className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg transition disabled:opacity-50"
                    >
                      {loading ? 'Generating...' : '📖 Generate Guide'}
                    </button>
                    <button
                      onClick={generateTips}
                      disabled={loading}
                      className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg transition disabled:opacity-50"
                    >
                      {loading ? 'Generating...' : '💡 Travel Tips'}
                    </button>
                  </div>
                </div>

                {/* Guide Output */}
                {guide && (
                  <motion.div
                    className="bg-white rounded-xl shadow-lg p-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <h3 className="text-lg font-bold text-gray-800 mb-4">📖 Guide</h3>
                    <p className="text-gray-700 whitespace-pre-line">{guide}</p>
                  </motion.div>
                )}

                {/* Tips Output */}
                {tips && (
                  <motion.div
                    className="bg-white rounded-xl shadow-lg p-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <h3 className="text-lg font-bold text-gray-800 mb-4">💡 Travel Tips</h3>
                    <p className="text-gray-700 whitespace-pre-line">{tips}</p>
                  </motion.div>
                )}
              </>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
