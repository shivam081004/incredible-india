import { useState, useRef, useCallback } from "react";
import api from "../services/api.js";

const MODES = [
  { value: "DRIVING", label: "Drive", icon: "fa-car" },
  { value: "WALKING", label: "Walk", icon: "fa-person-walking" },
  { value: "BICYCLING", label: "Bike", icon: "fa-bicycle" },
  { value: "TRANSIT", label: "Transit", icon: "fa-bus" },
];

export default function RouteSearchBar({ onSearch, loading }) {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [mode, setMode] = useState("DRIVING");
  const [suggestions, setSuggestions] = useState([]);
  const [activeSuggest, setActiveSuggest] = useState(null);
  const [suggestFor, setSuggestFor] = useState(null);
  const debounceRef = useRef(null);
  const originRef = useRef(null);
  const destRef = useRef(null);

  const fetchSuggestions = useCallback(async (query, field) => {
    if (!query || query.length < 3) {
      setSuggestions([]);
      setSuggestFor(null);
      return;
    }
    try {
      const { data } = await api.get("/routes/geocode", { params: { q: query } });
      setSuggestions(data);
      setSuggestFor(field);
    } catch {
      setSuggestions([]);
    }
  }, []);

  function handleOriginChange(e) {
    const val = e.target.value;
    setOrigin(val);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => fetchSuggestions(val, "origin"), 300);
  }

  function handleDestChange(e) {
    const val = e.target.value;
    setDestination(val);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => fetchSuggestions(val, "destination"), 300);
  }

  function selectSuggestion(text, field) {
    if (field === "origin") {
      setOrigin(text);
      setSuggestions([]);
      setSuggestFor(null);
    } else {
      setDestination(text);
      setSuggestions([]);
      setSuggestFor(null);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!origin.trim() || !destination.trim()) return;
    const originRef_val = originRef.current || origin;
    const destRef_val = destRef.current || destination;
    onSearch({ origin, destination, mode });
    setSuggestions([]);
    setSuggestFor(null);
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3" aria-label="Route search">
      <div className="flex flex-col gap-2">
        <div className="relative">
          <div className="flex items-center gap-2 rounded-xl border border-mist bg-white px-3 py-2 focus-within:border-amber/50 focus-within:ring-2 focus-within:ring-amber/10 transition-all">
            <span className="w-2.5 h-2.5 rounded-full bg-navy shrink-0" />
            <input
              ref={originRef}
              aria-label="Starting point"
              value={origin}
              onChange={handleOriginChange}
              placeholder="Starting point"
              className="w-full outline-none text-sm bg-transparent"
            />
          </div>
          {suggestions.length > 0 && suggestFor === "origin" && (
            <ul className="absolute z-20 w-full mt-1 bg-white rounded-xl border border-mist shadow-xl max-h-48 overflow-y-auto">
              {suggestions.map((s, i) => (
                <li key={i} className="px-4 py-2 text-sm hover:bg-amber/10 cursor-pointer transition-colors" onClick={() => selectSuggestion(s.label, "origin")}>
                  <i className="fa-solid fa-location-dot text-amber text-xs mr-2" />
                  {s.label}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="relative">
          <div className="flex items-center gap-2 rounded-xl border border-mist bg-white px-3 py-2 focus-within:border-amber/50 focus-within:ring-2 focus-within:ring-amber/10 transition-all">
            <span className="w-2.5 h-2.5 rounded-full bg-amber shrink-0" />
            <input
              ref={destRef}
              aria-label="Destination"
              value={destination}
              onChange={handleDestChange}
              placeholder="Destination"
              className="w-full outline-none text-sm bg-transparent"
            />
          </div>
          {suggestions.length > 0 && suggestFor === "destination" && (
            <ul className="absolute z-20 w-full mt-1 bg-white rounded-xl border border-mist shadow-xl max-h-48 overflow-y-auto">
              {suggestions.map((s, i) => (
                <li key={i} className="px-4 py-2 text-sm hover:bg-amber/10 cursor-pointer transition-colors" onClick={() => selectSuggestion(s.label, "destination")}>
                  <i className="fa-solid fa-flag text-rose text-xs mr-2" />
                  {s.label}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="flex gap-1.5">
        {MODES.map((m) => (
          <button
            key={m.value}
            type="button"
            aria-pressed={mode === m.value}
            onClick={() => setMode(m.value)}
            className={`flex-1 text-xs py-2 rounded-lg border transition-all duration-300 ${
              mode === m.value
                ? "bg-navy text-paper border-navy shadow-md"
                : "border-mist text-ink/60 hover:border-amber/40 hover:text-amber hover:bg-amber/5"
            }`}
          >
            <i className={`${m.icon} mr-1`}></i>
            {m.label}
          </button>
        ))}
      </div>

      <button type="submit" disabled={loading} className="btn-primary flex items-center justify-center gap-2">
        {loading ? (
          <>
            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Finding route…
          </>
        ) : (
          <>
            <i className="fa-solid fa-route"></i>
            Find route
          </>
        )}
      </button>
    </form>
  );
}