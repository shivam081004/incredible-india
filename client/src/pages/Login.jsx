import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Login3DScene from "../components/Login3DScene.jsx";
import { useAuth } from "../context/AuthContext.jsx";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(email, password);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.error || "Could not log in");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-shell grid min-h-screen md:grid-cols-2">
      <div className="relative hidden flex-col justify-between bg-gradient-to-br from-navy via-navy-dark to-emerald p-10 text-paper md:flex lg:p-14">
        <div className="relative z-10">
          <span className="font-display font-bold text-xl flex items-center gap-2">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M4 18 C 8 6, 16 22, 20 6" stroke="#F2A03D" strokeWidth="2.5" strokeLinecap="round" fill="none" />
              <circle cx="4" cy="18" r="2" fill="#F7F6F2" />
              <circle cx="20" cy="6" r="2" fill="#F7F6F2" />
            </svg>
            RouteFinder
          </span>
          <div>
            <h1 className="font-display text-3xl font-bold mt-8 max-w-sm leading-tight">
              Every good trip starts with a clear route.
            </h1>
            <p className="text-white/70 mt-4 max-w-xs text-sm leading-relaxed">
              Sign in to plan directions, see live ETAs, and keep a record of everywhere you've been.
            </p>
          </div>
        </div>
        <span className="relative z-10 text-xs text-white/40">
          © {new Date().getFullYear()} RouteFinder
        </span>
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-10 right-10 w-64 h-64 rounded-full border border-white/5 animate-spin-slow" />
          <div className="absolute bottom-20 left-10 w-48 h-48 rounded-full border border-amber/10 animate-spin-slow" style={{ animationDirection: 'reverse' }} />
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-1/3">
          <Login3DScene />
        </div>
      </div>

      <div className="flex items-center justify-center p-5 sm:p-8 bg-paper">
        <div className="w-full max-w-sm">
          <div className="flex items-center gap-3 mb-6 md:hidden">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M4 18 C 8 6, 16 22, 20 6" stroke="#F2A03D" strokeWidth="2.5" strokeLinecap="round" fill="none" />
              <circle cx="4" cy="18" r="2" fill="#1F3A5F" />
              <circle cx="20" cy="6" r="2" fill="#1F3A5F" />
            </svg>
            <span className="font-display font-bold text-lg text-navy">RouteFinder</span>
          </div>

          <form onSubmit={handleSubmit} className="surface w-full max-w-sm rounded-2xl p-8">
            <div>
              <h2 className="font-display text-2xl font-bold text-ink">Welcome back</h2>
              <p className="text-sm text-ink/60 mt-1">Log in to continue to your map.</p>
            </div>

            {error && (
              <p role="alert" className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                {error}
              </p>
            )}

            <label className="flex flex-col gap-1.5 text-sm text-ink/70 font-medium mt-4">
              Email
              <input
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-field"
              />
            </label>

            <label className="flex flex-col gap-1.5 text-sm text-ink/70 font-medium mt-4">
              Password
              <input
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-field"
              />
            </label>

            <button
              type="submit"
              disabled={loading}
              className="btn-secondary w-full mt-6 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Logging in…
                </>
              ) : (
                "Log in"
              )}
            </button>

            <p className="text-sm text-ink/60 text-center mt-4">
              New here?{" "}
              <Link to="/signup" className="text-navy font-semibold hover:underline">
                Create an account
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}