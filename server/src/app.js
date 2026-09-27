import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import rateLimit from "express-rate-limit";

import authRoutes from "./routes/authRoutes.js";
import routeRoutes from "./routes/routeRoutes.js";
import tripRoutes from "./routes/tripRoutes.js";

const app = express();
const allowedOrigins = (process.env.CLIENT_ORIGIN || "http://localhost:5173")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

const isLocalDevOrigin = (origin) => {
  if (!origin) return true;
  try {
    const url = new URL(origin);
    return (
      (url.hostname === "localhost" ||
        url.hostname === "127.0.0.1" ||
        url.hostname === "0.0.0.0") &&
      /^\d+$/.test(url.port || "")
    );
  } catch {
    return false;
  }
};

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: (origin, callback) => {
      if (
        !origin ||
        allowedOrigins.includes(origin) ||
        isLocalDevOrigin(origin)
      ) {
        return callback(null, true);
      }
      return callback(new Error("Origin is not allowed by CORS"));
    },
    credentials: true,
  }),
);

const authLimiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 30 });
const routeLimiter = rateLimit({ windowMs: 60 * 1000, max: 30 });

app.use("/api/auth", authLimiter, authRoutes);
app.use("/api/routes", routeLimiter, routeRoutes);
app.use("/api/trips", tripRoutes);

app.get("/api/health", (req, res) => res.json({ ok: true }));

// central error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "Something went wrong" });
});

export default app;
