import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar.jsx";
import TripCard from "../components/TripCard.jsx";
import api from "../services/api.js";

export default function Trips() {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function loadTrips() {
    setLoading(true);
    setError("");
    try {
      const { data } = await api.get("/trips");
      setTrips(data);
    } catch (err) {
      setError(err.response?.data?.error || "Could not load your trips.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadTrips();
  }, []);

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

  async function handleToggleFavorite(trip) {
    try {
      const { data } = await api.patch(`/trips/${trip._id}/favorite`);
      setTrips((prev) => prev.map((t) => (t._id === data._id ? data : t)));
    } catch {
      setError("Could not update that favorite.");
    }
  }

  function handleOpen(trip) {
    navigate("/dashboard", { state: { trip } });
  }

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <div className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:px-6">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div className="fade-in-up">
            <p className="mb-1 text-xs font-semibold uppercase tracking-[0.18em] text-amber-dark">
              Your route history
            </p>
            <h1 className="font-display text-3xl font-bold text-navy">
              My trips
            </h1>
          </div>
          <button
            type="button"
            onClick={() => navigate("/dashboard")}
            className="rounded-full bg-gradient-to-r from-navy to-emerald px-5 py-2.5 text-sm font-semibold text-paper transition-all hover:shadow-lg hover:scale-105"
          >
            <i className="fa-solid fa-plus mr-2"></i>
            Plan a new route
          </button>
        </div>

        {loading && (
          <div className="flex items-center justify-center py-20">
            <svg className="animate-spin h-8 w-8 text-amber" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
          </div>
        )}

        {error && (
          <div
            role="alert"
            className="mb-4 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
          >
            <span>{error}</span>
            <button
              type="button"
              onClick={loadTrips}
              className="font-semibold underline"
            >
              Try again
            </button>
          </div>
        )}

        {!loading && trips.length === 0 && (
          <div className="surface rounded-2xl p-12 text-center">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-amber/10">
              <i className="fa-solid fa-map-location-dot text-3xl text-amber"></i>
            </div>
            <p className="font-display text-xl font-bold text-navy">
              No saved trips yet
            </p>
            <p className="mx-auto mt-2 max-w-md text-sm text-ink/60 leading-relaxed">
              Plan a route on the map and save it here for quick access later.
            </p>
            <button
              type="button"
              onClick={() => navigate("/dashboard")}
              className="mt-6 rounded-full bg-navy px-6 py-2.5 text-sm font-semibold text-paper transition-all hover:bg-navy-dark hover:shadow-lg"
            >
              Plan your first route
            </button>
          </div>
        )}

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {trips.map((trip, i) => (
            <div key={trip._id} className="fade-in-up" style={{ animationDelay: `${i * 100}ms`, animationFillMode: 'both' }}>
              <TripCard
                trip={trip}
                onDelete={handleDelete}
                onToggleFavorite={handleToggleFavorite}
                onOpen={handleOpen}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}