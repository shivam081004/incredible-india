import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

const linkClasses = ({ isActive }) =>
  `px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
    isActive
      ? "bg-navy text-paper shadow-md shadow-navy/20"
      : "text-navy/70 hover:text-navy hover:bg-navy/5"
  }`;

export default function NavBar() {
  const { user, logout } = useAuth();

  return (
    <header className="sticky top-0 z-50 flex flex-wrap items-center justify-between gap-3 border-b border-mist/60 bg-white/80 px-4 py-3 backdrop-blur-xl sm:px-6">
      <div className="flex items-center gap-3">
        <div className="relative">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" className="relative z-10">
            <path
              d="M4 18 C 8 6, 16 22, 20 6"
              stroke="#F2A03D"
              strokeWidth="2.5"
              strokeLinecap="round"
              fill="none"
            />
            <circle cx="4" cy="18" r="2" fill="#1F3A5F" />
            <circle cx="20" cy="6" r="2" fill="#1F3A5F" />
          </svg>
          <div className="absolute -inset-1 rounded-full bg-amber/20 blur-md animate-pulse" />
        </div>
        <span className="font-display font-bold text-lg tracking-tight text-navy">
          RouteFinder
        </span>
      </div>

      <nav className="order-3 flex w-full items-center justify-center gap-1 sm:order-none sm:w-auto sm:gap-2">
        <NavLink to="/dashboard" className={linkClasses}>
          <i className="fa-solid fa-map-location-dot mr-1"></i>
          Map
        </NavLink>
        <NavLink to="/trips" className={linkClasses}>
          <i className="fa-solid fa-route mr-1"></i>
          My trips
        </NavLink>
      </nav>

      <div className="flex items-center gap-3">
        <span className="text-sm text-ink/60 hidden sm:inline font-medium">
          <i className="fa-solid fa-user mr-1"></i>
          {user?.name}
        </span>
        <button
          type="button"
          onClick={logout}
          className="rounded-full border border-mist px-3 py-1.5 text-sm text-ink/70 transition-all hover:border-rose hover:text-rose hover:bg-rose/5"
        >
          <i className="fa-solid fa-right-from-bracket mr-1"></i>
          Log out
        </button>
      </div>
    </header>
  );
}