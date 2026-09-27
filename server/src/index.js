import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Initialize Supabase
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

// Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running', timestamp: new Date().toISOString() });
});

// Import routes (we'll create these next)
import authRoutes from './routes/auth.js';
import placesRoutes from './routes/places.js';
import hotelsRoutes from './routes/hotels.js';
import aiGuideRoutes from './routes/aiGuide.js';
import routeFinderRoutes from './routes/routeFinder.js';

// Register routes
app.use('/api/auth', authRoutes);
app.use('/api/places', placesRoutes);
app.use('/api/hotels', hotelsRoutes);
app.use('/api/ai-guide', aiGuideRoutes);
app.use('/api/route-finder', routeFinderRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({
    error: err.message || 'Internal server error',
    timestamp: new Date().toISOString(),
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📍 Supabase connected: ${process.env.SUPABASE_URL}`);
  console.log(`🤖 Ollama API: ${process.env.OLLAMA_BASE_URL}`);
});

export { app, supabase };
