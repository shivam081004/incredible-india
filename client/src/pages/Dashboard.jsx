import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import GlobeScene from "../components/GlobeScene.jsx";
import NavBar from "../components/NavBar.jsx";
import MapView from "../components/MapView.jsx";
import RouteSearchBar from "../components/RouteSearchBar.jsx";
import RouteStepsPanel from "../components/RouteStepsPanel.jsx";
import api from "../services/api.js";

function routeFromTrip(trip) {
  const coords = trip.polyline ? JSON.parse(trip.polyline) : [];
  return {
    distanceText: trip.distanceText,
    durationText: trip.durationText,
    polyline: trip.polyline,
    coords,
    startLocation: { lat: trip.origin.lat, lng: trip.origin.lng },
    endLocation: { lat: trip.destination.lat, lng: trip.destination.lng },
    steps: trip.steps || [],
  };
}

export default function Dashboard() {
  const location = useLocation();
  const navigate = useNavigate();
  const openedTrip = location.state?.trip;

  const [route, setRoute] = useState(openedTrip ? routeFromTrip(openedTrip) : null);
  const [lastSearch, setLastSearch] = useState(
    openedTrip
      ? { origin: openedTrip.origin.address, destination: openedTrip.destination.address, mode: openedTrip.travelMode }
      : null
  );
  const [isSavedTrip, setIsSavedTrip] = useState(Boolean(openedTrip));
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [show3D, setShow3D] = useState(false);

  useEffect(() => {
    if (openedTrip) navigate(".", { replace: true, state: null });
  }, [openedTrip, navigate]);

  async function handleSearch({ origin, destination, mode }) {
    setLoading(true);
    setError("");
    try {
      const { data } = await api.get("/routes", { params: { origin, destination, mode } });
      setRoute(data);
      setLastSearch({ origin, destination, mode });
      setIsSavedTrip(false);
    } catch (err) {
      setError(err.response?.data?.error || "Could not find a route");
      setRoute(null);
    } finally {
      setLoading(false);
    }
  }

  async function handleSave() {
    if (!route || !lastSearch) return;
    setSaving(true);
    try {
      await api.post("/trips", {
        origin: { address: lastSearch.origin, lat: route.startLocation.lat, lng: route.startLocation.lng },
        destination: { address: lastSearch.destination, lat: route.endLocation.lat, lng: route.endLocation.lng },
        distanceText: route.distanceText,
        durationText: route.durationText,
        polyline: route.polyline,
        coords: route.coords,
        steps: route.steps,
        travelMode: lastSearch.mode,
      });
      setIsSavedTrip(true);
    } catch {
      setError("Could not save this trip");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <NavBar />
      <div className="flex flex-1 flex-col lg:min-h-[calc(100vh-73px)] lg:flex-row">
        <aside className="flex w-full flex-col border-b border-mist/80 bg-paper/80 p-4 sm:p-6 lg:max-w-md lg:border-b-0 lg:border-r overflow-y-auto">
          <div className="mb-5">
            <p className="mb-1 text-xs font-semibold uppercase tracking-[0.18em] text-amber-dark">
              Your next journey
            </p>
            <h1 className="font-display text-2xl font-semibold leading-tight text-navy">
              Plan a route
            </h1>
            <p className="mt-1 text-sm text-ink/60">
              Find the clearest way from here to there. Powered by OpenStreetMap
            </p>
          </div>

          <RouteSearchBar onSearch={handleSearch} loading={loading} />

          {error && (
            <p role="alert" className="mt-3 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
              {error}
            </p>
          )}

          <RouteStepsPanel route={route} onSave={handleSave} saving={saving} showSave={!isSavedTrip} />

          {route && (
            <button
              type="button"
              onClick={() => setShow3D(!show3D)}
              className="mt-4 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-navy to-emerald text-paper font-semibold text-sm py-3 transition-all hover:shadow-lg hover:scale-[1.02]"
            >
              <i className={`fa-solid ${show3D ? 'fa-globe' : 'fa-cube'}`} />
              {show3D ? 'Hide 3D View' : 'Explore 3D Globe'}
            </button>
          )}

          {show3D && route && (
            <div className="mt-4 h-64 rounded-2xl overflow-hidden border border-mist bg-white">
              <GlobeScene route={route} />
            </div>
          )}
        </aside>

        <main className="min-h-[52vh] flex-1 bg-gradient-to-br from-emerald/5 to-navy/5 p-3 lg:min-h-0">
          <div className="h-full rounded-2xl overflow-hidden shadow-xl border border-mist/50">
            <MapView route={route} />
          </div>
          <div className="mt-3 flex items-center gap-2 text-xs text-ink/40">
            <i className="fa-solid fa-circle-info"></i>
            <span>Powered by OpenStreetMap &amp; OSRM</span>
          </div>
        </main>
      </div>
    </div>
  );
}