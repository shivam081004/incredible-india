-- India Tour Guide Database Schema
-- Run these SQL commands in Supabase SQL Editor

-- ===== Users Table =====
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255),
  full_name VARCHAR(255),
  google_id VARCHAR(255),
  profile_picture_url TEXT,
  bio TEXT,
  preferred_language VARCHAR(10) DEFAULT 'en',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  last_login TIMESTAMP
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_google_id ON users(google_id);

-- ===== Login Attempts Table (for security tracking) =====
CREATE TABLE IF NOT EXISTS login_attempts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255),
  ip_address VARCHAR(50),
  success BOOLEAN,
  attempted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  user_agent TEXT
);

CREATE INDEX idx_login_attempts_email ON login_attempts(email);
CREATE INDEX idx_login_attempts_attempted_at ON login_attempts(attempted_at);

-- ===== Places/Landmarks Table =====
CREATE TABLE IF NOT EXISTS places (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  category VARCHAR(100), -- 'Monument', 'Temple', 'Fort', 'Natural', 'Cultural', etc.
  city VARCHAR(100),
  state VARCHAR(100),
  country VARCHAR(100) DEFAULT 'India',
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  image_url TEXT,
  gallery_urls TEXT[], -- Array of image URLs
  entry_fee_adults DECIMAL(10, 2),
  entry_fee_children DECIMAL(10, 2),
  opening_time VARCHAR(50),
  closing_time VARCHAR(50),
  best_time_to_visit TEXT,
  how_to_reach TEXT,
  nearby_attractions TEXT,
  historical_significance TEXT,
  cultural_importance TEXT,
  visitor_rating DECIMAL(3, 2),
  review_count INTEGER DEFAULT 0,
  website_url TEXT,
  phone_number VARCHAR(20),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_places_city ON places(city);
CREATE INDEX idx_places_category ON places(category);
CREATE INDEX idx_places_name ON places(name);

-- ===== Hotels Table =====
CREATE TABLE IF NOT EXISTS hotels (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  city VARCHAR(100),
  address TEXT,
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  price_per_night DECIMAL(10, 2),
  currency VARCHAR(10) DEFAULT 'INR',
  rating DECIMAL(3, 2),
  review_count INTEGER DEFAULT 0,
  amenities TEXT[], -- Array of amenities
  image_url TEXT,
  gallery_urls TEXT[],
  phone_number VARCHAR(20),
  email VARCHAR(255),
  website_url TEXT,
  booking_link TEXT,
  is_food_specialty BOOLEAN DEFAULT FALSE,
  food_specialty TEXT,
  checkout_time VARCHAR(50),
  checkin_time VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_hotels_city ON hotels(city);
CREATE INDEX idx_hotels_rating ON hotels(rating DESC);

-- ===== Cultural/Free Places Table =====
CREATE TABLE IF NOT EXISTS cultural_places (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  type VARCHAR(100), -- 'Museum', 'Temple', 'Garden', 'Gurudwara', 'Library', etc.
  city VARCHAR(100),
  address TEXT,
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  is_free BOOLEAN DEFAULT TRUE,
  entry_fee DECIMAL(10, 2),
  opening_time VARCHAR(50),
  closing_time VARCHAR(50),
  image_url TEXT,
  gallery_urls TEXT[],
  significance TEXT,
  visiting_tips TEXT,
  accessibility_info TEXT,
  phone_number VARCHAR(20),
  website_url TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_cultural_places_city ON cultural_places(city);
CREATE INDEX idx_cultural_places_type ON cultural_places(type);
CREATE INDEX idx_cultural_places_is_free ON cultural_places(is_free);

-- ===== AI Guides/Place Information =====
CREATE TABLE IF NOT EXISTS guides (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  place_id UUID REFERENCES places(id) ON DELETE CASCADE,
  content TEXT,
  generated_by VARCHAR(50) DEFAULT 'ollama', -- 'ollama', 'claude', 'manual'
  language VARCHAR(10) DEFAULT 'en',
  generated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_guides_place_id ON guides(place_id);

-- ===== User Favorites/Wishlist =====
CREATE TABLE IF NOT EXISTS user_favorites (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  place_id UUID REFERENCES places(id) ON DELETE CASCADE,
  added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(user_id, place_id)
);

CREATE INDEX idx_user_favorites_user_id ON user_favorites(user_id);
CREATE INDEX idx_user_favorites_place_id ON user_favorites(place_id);

-- ===== User Reviews/Ratings =====
CREATE TABLE IF NOT EXISTS reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  place_id UUID REFERENCES places(id) ON DELETE CASCADE,
  rating DECIMAL(3, 2),
  comment TEXT,
  image_urls TEXT[],
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_reviews_user_id ON reviews(user_id);
CREATE INDEX idx_reviews_place_id ON reviews(place_id);

-- ===== Sessions Table (for auth tracking) =====
CREATE TABLE IF NOT EXISTS sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  token_hash VARCHAR(255),
  expires_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  ip_address VARCHAR(50),
  user_agent TEXT,
  is_active BOOLEAN DEFAULT TRUE
);

CREATE INDEX idx_sessions_user_id ON sessions(user_id);
CREATE INDEX idx_sessions_expires_at ON sessions(expires_at);

-- ===== Travel Itineraries =====
CREATE TABLE IF NOT EXISTS itineraries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(255),
  description TEXT,
  start_date DATE,
  end_date DATE,
  places TEXT[], -- Array of place IDs
  notes TEXT,
  is_public BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_itineraries_user_id ON itineraries(user_id);

-- Enable RLS (Row Level Security) on sensitive tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE login_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_favorites ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE itineraries ENABLE ROW LEVEL SECURITY;

-- Create policies
-- Users can only see their own data
CREATE POLICY "Users can view own data" ON users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own data" ON users
  FOR UPDATE USING (auth.uid() = id);

-- Sessions can only be viewed by the user
CREATE POLICY "Users can view own sessions" ON sessions
  FOR SELECT USING (auth.uid() = user_id);

-- Favorites are private
CREATE POLICY "Users can manage own favorites" ON user_favorites
  FOR ALL USING (auth.uid() = user_id);

-- Reviews are public but users can only edit their own
CREATE POLICY "Reviews are readable" ON reviews
  FOR SELECT USING (TRUE);

CREATE POLICY "Users can manage own reviews" ON reviews
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can edit own reviews" ON reviews
  FOR UPDATE USING (auth.uid() = user_id);

-- Itineraries are private by default
CREATE POLICY "Users can manage own itineraries" ON itineraries
  FOR ALL USING (auth.uid() = user_id);

-- Places are public
CREATE POLICY "Places are readable" ON places
  FOR SELECT USING (TRUE);

-- Hotels are public
CREATE POLICY "Hotels are readable" ON hotels
  FOR SELECT USING (TRUE);

-- Cultural places are public
CREATE POLICY "Cultural places are readable" ON cultural_places
  FOR SELECT USING (TRUE);

-- Guides are public
CREATE POLICY "Guides are readable" ON guides
  FOR SELECT USING (TRUE);
