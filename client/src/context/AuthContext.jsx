import { createContext, useContext, useEffect, useState } from "react";
import api, {
  refreshSession,
  setAccessToken,
  setOnLogout,
} from "../services/api.js";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    setOnLogout(() => setUser(null));

    // try to silently restore a session using the refresh cookie
    refreshSession()
      .then(({ data }) => {
        setAccessToken(data.accessToken);
        setUser(data.user);
      })
      .catch(() => {})
      .finally(() => setInitializing(false));
  }, []);

  async function signup(name, email, password) {
    const { data } = await api.post("/auth/signup", { name, email, password });
    setAccessToken(data.accessToken);
    setUser(data.user);
  }

  async function login(email, password) {
    const { data } = await api.post("/auth/login", { email, password });
    setAccessToken(data.accessToken);
    setUser(data.user);
  }

  async function logout() {
    await api.post("/auth/logout").catch(() => {});
    setAccessToken(null);
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, initializing, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
