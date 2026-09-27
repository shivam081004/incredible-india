import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  withCredentials: true, // send the httpOnly refresh cookie
});

let accessToken = null;
let onLogout = () => {};

export function setAccessToken(token) {
  accessToken = token;
}

export function setOnLogout(fn) {
  onLogout = fn;
}

api.interceptors.request.use((config) => {
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

let refreshPromise = null;

export function refreshSession() {
  refreshPromise = refreshPromise || api.post("/auth/refresh");
  return refreshPromise.finally(() => {
    refreshPromise = null;
  });
}

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const original = error.config;
    const isRefreshRequest = original?.url?.endsWith("/auth/refresh");
    if (
      error.response?.status === 401 &&
      !isRefreshRequest &&
      !original._retry
    ) {
      original._retry = true;
      try {
        const { data } = await refreshSession();
        setAccessToken(data.accessToken);
        original.headers = original.headers || {};
        original.headers.Authorization = `Bearer ${data.accessToken}`;
        return api(original);
      } catch (refreshErr) {
        setAccessToken(null);
        onLogout();
        return Promise.reject(refreshErr);
      }
    }
    return Promise.reject(error);
  },
);

export default api;
