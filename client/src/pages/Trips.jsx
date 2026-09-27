import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import NavBar from "../components/NavBar.jsx";
import { CustomCursor } from "../components/core/CustomCursor";
import api from "../services/api.js";

export default function Trips() {
  const navigate = useNavigate();
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchTrips();
  }, []);

  async function fetchTrips() {
    try {
      const { data } = await api.get("/trips");
      setTrips(data || []);
    } catch (err) {
      setError("Could not load your trips");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(trip) {
    if (!window.confirm("Delete this saved trip?")) return;
    const previousTrips = trips;
    setTrips((prev) => prev.filter((t) => t._id !== trip._id));
    try {
      await api.delete(`/trips/${trip._id}`);
    } catch {
      setTrips(previousTrips);
      setError("Could not delete that trip.");
    }
  }

  function handleOpen(trip) {
    navigate("/dashboard", { state: { trip } });
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <CustomCursor />
      <NavBar />

      {/* Header */}
      <motion.div
        className="bg-gradient-to-r from-blue-500 to-blue-700 text-white py-12 px-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <h1 className="text-4xl font-bold mb-2">🎫 My Trips</h1>
        <p className="text-lg">View and manage your route history</p>
      </motion.div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-8 py-16">
        <motion.div
          className="flex justify-between items-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-orange-400 mb-2">Your Route History</p>
            <h2 className="text-3xl font-bold text-white">My Trips</h2>
          </div>
          <button
            onClick={() => navigate("/dashboard")}
            className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-lg transition"
          >
            ➕ Plan a New Route
          </button>
        </motion.div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-16">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
            <p className="text-gray-300 mt-4">Loading your trips...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <motion.div
            className="bg-red-500/20 border border-red-500 text-red-300 px-6 py-4 rounded-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {error}
          </motion.div>
        )}

        {/* Empty State */}
        {!loading && trips.length === 0 && (
          <motion.div
            className="bg-white/10 backdrop-blur border border-white/20 rounded-lg p-16 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <p className="text-3xl mb-4">🛤️</p>
            <p className="text-gray-300 text-lg mb-6">No trips yet. Start planning your next adventure!</p>
            <button
              onClick={() => navigate("/dashboard")}
              className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-lg transition"
            >
              Plan Your First Trip
            </button>
          </motion.div>
        )}

        {/* Trips Grid */}
        {!loading && trips.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trips.map((trip, i) => (
              <motion.div
                key={trip._id}
                className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition"
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="h-40 bg-gradient-to-r from-blue-400 to-blue-600"></div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-2">
                    {trip.origin?.address || "Unknown"} → {trip.destination?.address || "Unknown"}
                  </h3>
                  <div className="space-y-2 mb-4 text-sm text-gray-600">
                    <p>🚗 Mode: <span className="font-semibold capitalize">{trip.travelMode || "Travel"}</span></p>
                    <p>⏱️ Duration: <span className="font-semibold">{trip.durationText || "N/A"}</span></p>
                    <p>📏 Distance: <span className="font-semibold">{trip.distanceText || "N/A"}</span></p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleOpen(trip)}
                      className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg transition font-semibold"
                    >
                      View Details
                    </button>
                    <button
                      onClick={() => handleDelete(trip)}
                      className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg transition font-semibold"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
