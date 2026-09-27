import { useEffect, useRef, useMemo } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

const startIcon = new L.Icon({
  iconUrl: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 32 32'%3E%3Ccircle cx='16' cy='16' r='14' fill='%23F2A03D' stroke='%23fff' stroke-width='3'/%3E%3Ctext x='16' y='21' text-anchor='middle' fill='%23fff' font-size='14' font-weight='bold'%3EA%3C/text%3E%3C/svg%3E",
  iconSize: [32, 32],
  iconAnchor: [16, 16],
});

const endIcon = new L.Icon({
  iconUrl: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 32 32'%3E%3Ccircle cx='16' cy='16' r='14' fill='%23E76F51' stroke='%23fff' stroke-width='3'/%3E%3Ctext x='16' y='21' text-anchor='middle' fill='%23fff' font-size='14' font-weight='bold'%3EB%3C/text%3E%3C/svg%3E",
  iconSize: [32, 32],
  iconAnchor: [16, 16],
});

function MapBounds({ coords }) {
  const map = useMap();
  useEffect(() => {
    if (!coords || coords.length < 2) return;
    const bounds = L.latLngBounds(coords);
    map.fitBounds(bounds, { padding: [50, 50], maxZoom: 14 });
  }, [coords, map]);
  return null;
}

function GlobeDecoration() {
  return (
    <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full border border-amber/20 animate-spin-slow pointer-events-none z-0" style={{ boxShadow: 'inset 0 0 30px rgba(242,160,61,0.1)' }}>
      <div className="absolute inset-4 rounded-full border border-emerald/20 animate-spin-slow" style={{ animationDirection: 'reverse' }} />
      <div className="absolute inset-10 rounded-full border border-amber/10 animate-spin-slow" />
    </div>
  );
}

export default function MapView({ route }) {
  const coords = route?.coords || [];
  const center = coords.length >= 2 ? [coords[0].lat, coords[0].lng] : [20.5937, 78.9629];

  const markerOptions = {
    icon: startIcon,
    alt: "Start",
  };

  return (
    <div className="relative w-full h-full rounded-2xl overflow-hidden">
      <GlobeDecoration />
      <MapContainer
        center={center}
        zoom={route ? 12 : 5}
        style={{ height: "100%", width: "100%" }}
        zoomControl={false}
        className="rounded-2xl"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {coords.length >= 2 && <MapBounds coords={coords} />}
        {route?.startLocation && (
          <Marker position={[route.startLocation.lat, route.startLocation.lng]} icon={startIcon}>
            <Popup>
              <div className="font-display font-semibold text-navy">Origin</div>
              <p className="text-sm text-ink/70">{route.startAddress}</p>
            </Popup>
          </Marker>
        )}
        {route?.endLocation && (
          <Marker position={[route.endLocation.lat, route.endLocation.lng]} icon={endIcon}>
            <Popup>
              <div className="font-display font-semibold text-navy">Destination</div>
              <p className="text-sm text-ink/70">{route.endAddress}</p>
            </Popup>
          </Marker>
        )}
        {coords.length > 1 && (
          <Polyline
            positions={coords.map((c) => [c.lat, c.lng])}
            pathOptions={{
              color: "#F2A03D",
              weight: 5,
              opacity: 0.85,
              lineCap: "round",
              lineJoin: "round",
            }}
          />
        )}
      </MapContainer>
    </div>
  );
}