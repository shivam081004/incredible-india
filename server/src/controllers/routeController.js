import axios from "axios";

const OSRM_URL = "https://router.project-osrm.org/route/v1";
const NOMINATIM_URL = "https://nominatim.openstreetmap.org/search";

function parseOSRMCoords(geometry) {
  if (!geometry?.coordinates?.length) return [];
  return geometry.coordinates.map(([lng, lat]) => ({ lat, lng }));
}

function decodeOSRMSteps(steps) {
  if (!steps) return [];
  return steps.map((s) => ({
    instruction: s.maneuver?.instruction || s.name || "Continue",
    distanceText: `${(s.distance / 1000).toFixed(1)} km`,
    durationText: `${Math.round(s.duration / 60)} min`,
  }));
}

export async function getRoute(req, res) {
  const { origin, destination, mode = "driving" } = req.query;

  if (!origin || !destination) {
    return res.status(400).json({ error: "origin and destination are required" });
  }

  const profile = mode === "bicycling" ? "cycling" : mode === "walking" ? "foot" : "driving";

  try {
    const [originResult, destResult] = await Promise.all([
      axios.get(NOMINATIM_URL, { params: { q: origin, format: "json", limit: 1 }, headers: { "User-Agent": "RouteFinder/1.0" } }),
      axios.get(NOMINATIM_URL, { params: { q: destination, format: "json", limit: 1 }, headers: { "User-Agent": "RouteFinder/1.0" } }),
    ]);

    const origCoords = originResult.data?.[0];
    const destCoords = destResult.data?.[0];
    if (!origCoords || !destCoords) {
      return res.status(404).json({ error: "Could not resolve one or both locations" });
    }

    const startLocation = { lat: parseFloat(origCoords.lat), lng: parseFloat(origCoords.lon) };
    const endLocation = { lat: parseFloat(destCoords.lat), lng: parseFloat(destCoords.lon) };

    const routeRes = await axios.get(`${OSRM_URL}/${profile}/${startLocation.lng},${startLocation.lat};${endLocation.lng},${endLocation.lat}`, {
      params: { overview: "full", geometries: "geojson", alternatives: "false", steps: "true" },
    });

    if (routeRes.data.code !== "Ok" || !routeRes.data.routes?.length) {
      return res.status(422).json({ error: "No route found between these locations" });
    }

    const route = routeRes.data.routes[0];
    const coords = parseOSRMCoords(route.geometry);
    const steps = decodeOSRMSteps(route.legs?.[0]?.steps);

    res.json({
      distanceText: `${(route.distance / 1000).toFixed(1)} km`,
      durationText: `${Math.round(route.duration / 60)} min`,
      startAddress: origCoords.display_name,
      endAddress: destCoords.display_name,
      startLocation,
      endLocation,
      polyline: coords.length > 0 ? JSON.stringify(coords) : null,
      coords,
      steps,
    });
  } catch (err) {
    console.error("OSRM error:", err.message);
    res.status(502).json({ error: "Failed to fetch route from OpenStreetMap" });
  }
}

export async function geocode(req, res) {
  const { q } = req.query;
  if (!q || q.length < 2) return res.json([]);

  try {
    const { data } = await axios.get(NOMINATIM_URL, {
      params: { q, format: "json", limit: 5 },
      headers: { "User-Agent": "RouteFinder/1.0" },
    });
    const results = data.map((item) => ({
      label: item.display_name,
      lat: parseFloat(item.lat),
      lng: parseFloat(item.lon),
    }));
    res.json(results);
  } catch {
    res.status(502).json({ error: "Geocoding failed" });
  }
}