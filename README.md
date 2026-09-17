# RouteFinder

A full-stack, login-protected route-finding app: React + Leaflet/OpenStreetMap on the front end, Express + MongoDB + JWT auth on the back end. Uses **OSRM** for free routing and **Nominatim** for geocoding — no API keys required!

## What's included

- **`server/`** — Express API: signup/login/refresh/logout (JWT, bcrypt), a `/api/routes` endpoint that proxies OSRM routing, a `/api/routes/geocode` endpoint using Nominatim, and full CRUD on saved trips (MongoDB via Mongoose).
- **`client/`** — React (Vite) app with Leaflet maps, 3D globe visualization (Three.js @react-three/fiber), auth pages, a protected map dashboard with autocomplete search, and a "My trips" page.
- **`docker-compose.yml`** — spins up MongoDB, the API, and the built frontend together.

## 1. Get a MongoDB connection string (optional)

You can use a free [MongoDB Atlas](https://www.mongodb.com/atlas) cluster, or install MongoDB locally and use `mongodb://localhost:27017/routefinder`.

## 2. Open in VS Code and run locally

1. Open the `routefinder/` folder in VS Code.
2. Install dependencies:
   ```bash
   npm run install:all
   ```
3. Set up your env files:
   ```bash
   cp server/.env.example server/.env
   cp client/.env.example client/.env
   ```
   Edit `server/.env` with your MongoDB URI and JWT secrets.
4. Start both servers:
   ```bash
   npm run dev:windows
   ```
   This runs the API on `http://localhost:5000` and the client on `http://localhost:5173`.

## 3. Run with Docker Compose

```powershell
docker compose up --build
```

## 4. What to try

1. Go to `http://localhost:5173` → redirected to `/login`.
2. Create an account.
3. On the dashboard, type an origin and destination with autocomplete suggestions.
4. Hit **Find route** — the route draws on the Leaflet map with turn-by-turn steps.
5. Click **Explore 3D Globe** to see a rotating 3D globe visualization of the route.
6. Click **Save trip**, then check **My trips** to see it listed with beautiful place images.
7. Favorite or delete saved trips.

## Architecture

- **Maps**: Leaflet + OpenStreetMap tiles (free, no API key)
- **Routing**: OSRM (Open Source Routing Machine) via `router.project-osrm.org`
- **Geocoding**: Nominatim (OpenStreetMap) via `nominatim.openstreetmap.org`
- **3D**: Three.js with @react-three/fiber and @react-three/drei
- **Auth**: JWT with access + refresh tokens (httpOnly cookies)
- **Database**: MongoDB with Mongoose

## Features

- 🗺️ Free map tiles from OpenStreetMap
- 🧭 Route planning via OSRM (driving, walking, cycling, transit)
- 🔍 Autocomplete search using Nominatim geocoding
- 🌐 3D rotating globe visualization
- 📸 Trip cards with beautiful place images
- ✨ Glassmorphism, gradients, and smooth animations
- 🔐 JWT authentication with refresh token rotation
- 💾 Save, favorite, and delete trips
- 📱 Responsive design for all screen sizes
- 🐳 Docker Compose deployment
