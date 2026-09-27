import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { CustomCursor } from "../components/core/CustomCursor";
import api from "../services/api.js";
import NavBar from "../components/NavBar.jsx";

const DESTINATIONS = [
  { id: 1, name: "Goa", category: "Beaches & Nightlife", image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop", color: "from-blue-400 to-blue-600" },
  { id: 2, name: "Jaipur", category: "Royal Heritage", image: "https://images.unsplash.com/photo-1564507592333-c60657e1e4b0?w=400&h=300&fit=crop", color: "from-orange-400 to-orange-600" },
  { id: 3, name: "Kerala", category: "Backwaters & Nature", image: "https://images.unsplash.com/photo-1537225228614-b4faea917c4f?w=400&h=300&fit=crop", color: "from-green-400 to-green-600" },
  { id: 4, name: "Ladakh", category: "Mountains & Adventure", image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop", color: "from-purple-400 to-purple-600" },
];

export default function Dashboard() {
  const navigate = useNavigate();
  const [upcomingTrips, setUpcomingTrips] = useState([]);
  const [userGreeting, setUserGreeting] = useState("Good Morning");

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setUserGreeting("Good Morning");
    else if (hour < 18) setUserGreeting("Good Afternoon");
    else setUserGreeting("Good Evening");

    fetchTrips();
  }, []);

  const fetchTrips = async () => {
    try {
      const { data } = await api.get("/trips");
      setUpcomingTrips(data.slice(0, 3));
    } catch (err) {
      console.error("Error fetching trips:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <CustomCursor />
      <NavBar />

      {/* Hero Section */}
      <div className="relative h-80 bg-cover bg-center overflow-hidden" style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=400&fit=crop')",
      }}>
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 to-transparent"></div>

        <motion.div
          className="relative h-full flex flex-col justify-center px-8 lg:px-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-5xl lg:text-6xl font-bold text-white mb-4">
            {userGreeting}, Traveler! 👋
          </h1>
          <p className="text-xl text-gray-200 mb-8 max-w-2xl">
            Ready for your next adventure?
          </p>
          <button
            onClick={() => navigate("/map-discovery")}
            className="w-fit bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-lg transition transform hover:scale-105"
          >
            Explore Destinations
          </button>
        </motion.div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-16">
        {/* Stats */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {[
            { label: "Upcoming Trips", value: upcomingTrips.length, icon: "🎫" },
            { label: "Total Bookings", value: "4", icon: "📅" },
            { label: "Wishlist", value: "3", icon: "❤️" },
            { label: "Loyalty Points", value: "1250", icon: "⭐" },
          ].map((stat, i) => (
            <motion.div
              key={i}
              className="bg-white/10 backdrop-blur border border-white/20 rounded-lg p-6 text-white hover:bg-white/15 transition"
              whileHover={{ scale: 1.05 }}
            >
              <div className="text-4xl mb-2">{stat.icon}</div>
              <div className="text-gray-300 text-sm mb-1">{stat.label}</div>
              <div className="text-3xl font-bold">{stat.value}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Upcoming Trips */}
        {upcomingTrips.length > 0 && (
          <motion.div
            className="mb-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="text-3xl font-bold text-white mb-8">Your Upcoming Trips</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcomingTrips.map((trip, i) => (
                <motion.div
                  key={i}
                  className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="h-40 bg-gradient-to-r from-blue-400 to-blue-600"></div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">
                      {trip.origin?.address || "Unknown"} → {trip.destination?.address || "Unknown"}
                    </h3>
                    <p className="text-gray-600 mb-4">{trip.travelMode || "Travel"}</p>
                    <button
                      onClick={() => navigate("/dashboard", { state: { trip } })}
                      className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
                    >
                      View Details
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Continue Your Journey */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-white">Continue Your Journey</h2>
            <button className="text-orange-500 font-semibold hover:text-orange-400">
              View All →
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {DESTINATIONS.map((dest, i) => (
              <motion.div
                key={i}
                className="group cursor-pointer"
                whileHover={{ scale: 1.05 }}
                onClick={() => navigate("/map-discovery")}
              >
                <div className="relative overflow-hidden rounded-lg h-48 mb-4">
                  <img
                    src={dest.image}
                    alt={dest.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                </div>
                <h3 className="text-lg font-bold text-white">{dest.name}</h3>
                <p className="text-gray-400 text-sm">{dest.category}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
