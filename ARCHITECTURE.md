# Architecture - Incredible India

## System Overview

The Incredible India platform is a full-stack MERN application with a focus on modularity, security, and real-time performance monitoring. The system is divided into three main layers: **Presentation (Frontend)**, **Business Logic (Backend)**, and **Data (Database)**.

```
┌─────────────────────────────────────────────────────────────┐
│                    CLIENT (React 18 + Vite)                 │
│  ┌──────────┬──────────┬──────────┬──────────┬──────────┐  │
│  │ Dashboard│ MapDisc. │ RouteFnd │ Hotels   │ AIGuide  │  │
│  └──────────┴──────────┴──────────┴──────────┴──────────┘  │
│         │ API Calls │ State Management │ Authentication │   │
└─────────────────────────────────────────────────────────────┘
                            ↓ HTTPS/REST ↓
┌─────────────────────────────────────────────────────────────┐
│           BACKEND (Node.js + Express)                       │
│  ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐   │
│  │ Auth   │ │ Routes │ │ Hotels │ │ Trips  │ │ AI     │   │
│  │ Routes │ │ Routes │ │ Routes │ │ Routes │ │ Routes │   │
│  └────────┘ └────────┘ └────────┘ └────────┘ └────────┘   │
│         │ Validation │ Security │ Error Handling │        │
└─────────────────────────────────────────────────────────────┘
                            ↓ SQL/JWT ↓
┌─────────────────────────────────────────────────────────────┐
│    DATABASE (Supabase PostgreSQL + Row-Level Security)     │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐      │
│  │ Users    │ │ Routes   │ │ Hotels   │ │ Landmarks│      │
│  │ Trips    │ │ Bookings │ │ Reviews  │ │ Categories     │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘      │
└─────────────────────────────────────────────────────────────┘
                            ↓ API ↓
┌─────────────────────────────────────────────────────────────┐
│         EXTERNAL SERVICES                                   │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐      │
│  │ Ollama   │ │ Google   │ │ Maps     │ │ Payment  │      │
│  │ (AI)     │ │ OAuth    │ │ API      │ │ Gateway  │      │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘      │
└─────────────────────────────────────────────────────────────┘
```

## Frontend Architecture

### Pages (Entry Points)

| Page | Purpose | Key Components |
|------|---------|-----------------|
| **Login.jsx** | User authentication | Email/password form, Google OAuth |
| **Signup.jsx** | User registration | Form with password strength indicator |
| **Dashboard.jsx** | Home page after login | Stats cards, trip carousel, greeting |
| **MapDiscovery.jsx** | Explore destinations | Category filters, landmark grid, search |
| **RouteFinder.jsx** | Plan routes | From/To selectors, transport modes, results |
| **Hotels.jsx** | Browse accommodations | Tabs: Hotels/Free Places, booking cards |
| **AIGuide.jsx** | AI-powered guidance | Place selector, guide generation, tips |
| **Trips.jsx** | View saved trips | Trip history, delete/view options |

### Components

#### Core Components (`src/components/core/`)
- **CustomCursor.jsx** - Branded cursor with animations
- **NavBar.jsx** - Navigation bar with user menu

#### Shared Components (`src/components/`)
- **LiveValidationDashboard.jsx** - Real-time health monitoring
- Form components, cards, modals (as needed)

### State Management

- **AuthContext** - User authentication state, login/logout
- **React Hooks** - Local component state (useState, useEffect)
- **API Service** - Centralized HTTP client for backend communication

### Styling

- **Tailwind CSS** - Utility-first framework
- **Framer Motion** - Entry/exit animations, hover effects
- **Custom CSS** - Global cursor styles, custom animations

### Key Libraries

```json
{
  "react": "^18.0.0",
  "react-router-dom": "^6.0.0",
  "framer-motion": "^10.0.0",
  "tailwindcss": "^3.0.0",
  "lucide-react": "^0.x.x",
  "axios": "^1.0.0" // API calls
}
```

## Backend Architecture

### API Routes

#### Authentication (`/api/auth`)
```
POST   /auth/register       → Create new user
POST   /auth/login          → User login (JWT issued)
POST   /auth/google         → Google OAuth callback
POST   /auth/logout         → Invalidate session
GET    /auth/me             → Verify token, get current user
```

#### Routes (`/api/routes`)
```
GET    /routes              → List all routes
POST   /routes              → Create new route
GET    /routes/:id          → Get route details
PUT    /routes/:id          → Update route
DELETE /routes/:id          → Delete route
POST   /routes/search       → Search routes by criteria
```

#### Hotels (`/api/hotels`)
```
GET    /hotels              → List hotels
GET    /hotels/:id          → Hotel details
POST   /hotels/:id/book     → Create booking
GET    /hotels/search       → Search by location/price
```

#### Trips (`/api/trips`)
```
GET    /trips               → User's saved trips
POST   /trips               → Save new trip
GET    /trips/:id           → Trip details
DELETE /trips/:id           → Remove trip
```

#### AI Guide (`/api/ai-guide`)
```
POST   /ai-guide/generate   → Generate guide for place
POST   /ai-guide/tips       → Get travel tips
```

### Middleware Stack

```
Request
  ↓
1. CORS Validation (origin allowlist)
  ↓
2. Rate Limiting (shared store backend)
  ↓
3. Body Parser (JSON/URL encoded)
  ↓
4. Authentication (JWT verification)
  ↓
5. Authorization (RLS + role checks)
  ↓
6. Input Validation (Zod schema)
  ↓
7. Route Handler
  ↓
8. Error Handler
  ↓
Response
```

### Security Middleware

- **CORS** - Restrict to frontend origins
- **Helmet** - Security headers (CSP, HSTS, X-Frame-Options)
- **Rate Limiting** - Redis-backed, per-endpoint thresholds
- **JWT** - Authentication token validation
- **Input Validation** - Schema-based at boundary
- **Error Handler** - Generic errors to client, details to logs

## Database Schema

### Users Table
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  username VARCHAR(100) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  google_id VARCHAR(255),
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);
```

### Routes Table
```sql
CREATE TABLE routes (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  origin_city VARCHAR(100),
  destination_city VARCHAR(100),
  transport_mode VARCHAR(50), -- Train, Bus, Flight, Car, Auto
  distance DECIMAL(10,2),
  duration_hours DECIMAL(10,2),
  estimated_cost DECIMAL(10,2),
  stops INTEGER,
  created_at TIMESTAMP
);
```

### Hotels Table
```sql
CREATE TABLE hotels (
  id UUID PRIMARY KEY,
  name VARCHAR(255),
  city VARCHAR(100),
  rating DECIMAL(3,2),
  price_per_night DECIMAL(10,2),
  amenities TEXT[],
  description TEXT,
  location_lat DECIMAL(10,8),
  location_lng DECIMAL(11,8)
);
```

### Landmarks Table
```sql
CREATE TABLE landmarks (
  id UUID PRIMARY KEY,
  name VARCHAR(255),
  city VARCHAR(100),
  category VARCHAR(50), -- Monument, Beach, Heritage, etc.
  description TEXT,
  image_url TEXT,
  location_lat DECIMAL(10,8),
  location_lng DECIMAL(11,8)
);
```

### Row-Level Security (RLS)

All tables have RLS policies:
- Users can only see/modify their own routes, trips, bookings
- Landmarks and hotels are publicly readable
- Admin users can modify reference data

## Data Flow

### User Registration Flow
```
1. User fills signup form (client)
2. POST /api/auth/register with email, password
3. Backend validates schema
4. Password hashed with bcrypt (12 rounds)
5. User inserted into DB
6. JWT issued
7. User redirected to dashboard
```

### Route Search Flow
```
1. User enters from/to cities, transport mode (client)
2. GET /api/routes/search?from=X&to=Y&mode=Z
3. Backend queries routes table
4. Filters by distance, mode, availability
5. Returns sorted results
6. Client displays in UI with animations
```

### AI Guide Generation Flow
```
1. User selects place, clicks "Generate Guide" (client)
2. POST /api/ai-guide/generate { place_id, place_name }
3. Backend calls Ollama API with place context
4. Ollama returns guide text
5. Backend caches result
6. Client displays in UI with streaming animation
```

## Security Architecture

### Authentication
- **JWT tokens** issued at login, verified on protected routes
- **Refresh tokens** stored in httpOnly cookies
- **Session expiry** - 24 hours, auto-refresh

### Authorization
- **Role-based access control** (user, admin, moderator)
- **Row-Level Security** - PostgreSQL policies enforce data isolation
- **Resource ownership** - Users can only modify their own data

### Data Protection
- **Encryption at rest** - Supabase default
- **Encryption in transit** - HTTPS only
- **Password hashing** - bcrypt, never stored plaintext
- **Sensitive fields stripped** - Password, tokens removed from responses

### Input Validation
- **Zod schemas** at every API boundary
- **Type-safe parsing** - Unknown fields rejected
- **Size caps** - Prevent oversized payloads
- **Format validation** - Email, URL, enum formats

## Monitoring & Observability

### Live Validation Dashboard
- Real-time health checks (API, DB, performance)
- Memory usage tracking
- Network status monitoring
- Page performance metrics (FCP, LCP, load time)
- Auto-refresh every 5 seconds

### Logging
- Backend logs to console + file (`logs/app.log`)
- Security events logged (login, unauthorized access)
- Performance metrics tracked
- Error traces stored for debugging

### Metrics Tracked
- API response times
- Database query duration
- Memory heap usage
- Page load times
- Authentication failures
- RLS policy violations

## Deployment

### Development Environment
```
Frontend: http://localhost:5173 (Vite dev server)
Backend:  http://localhost:3000
Database: Supabase (dev project)
```

### Production Environment
```
Frontend: Vercel / Netlify
Backend:  AWS EC2 / Heroku / DigitalOcean
Database: Supabase (production project)
Cache:    Redis (for rate limiting)
```

### Environment-Specific Config
- `.env.development` - Local dev settings
- `.env.production` - Production URLs, keys
- `.env.example` - Template (committed, no secrets)

## Performance Optimization

### Frontend
- **Code splitting** - Route-based lazy loading
- **Tree shaking** - Unused code removed by Vite
- **Image optimization** - Unsplash URLs with size params
- **Memoization** - React.memo for expensive components

### Backend
- **Query optimization** - Indexed columns, pagination
- **Caching** - Redis for rate limits, API responses
- **Connection pooling** - Reuse DB connections
- **Compression** - gzip middleware on responses

### Database
- **Indexes** - On frequently queried columns
- **Pagination** - Limit result sets
- **Materialized views** - Pre-aggregated data
- **Connection limits** - Prevent connection storms

## Error Handling

### Client-Side
- Try/catch wraps API calls
- User-friendly error messages
- Fallback UI for failed states
- Console logging for debugging

### Server-Side
- Validation errors (422 Unprocessable Entity)
- Authentication errors (401 Unauthorized)
- Authorization errors (403 Forbidden)
- Server errors (500 Internal Server Error)
- Generic error response (no internals leaked)

### Database
- Constraint violations caught, logged
- Connection errors retried
- Query timeouts enforced
- RLS violations logged as security events

## Testing Strategy

### Unit Tests
- Individual function logic
- Validation schemas
- Utility functions

### Integration Tests
- API endpoint behavior
- Database operations
- Authentication flow

### E2E Tests
- User workflows (signup → login → plan route)
- Form submissions
- Navigation flows

### Performance Tests
- Lighthouse audits
- Bundle size analysis
- Database query performance

## Future Architecture Considerations

1. **Microservices** - Separate AI service, booking service
2. **Event Streaming** - Kafka for real-time updates
3. **GraphQL** - Alternative to REST for complex queries
4. **Caching Layer** - Redis for user sessions, API responses
5. **Search Engine** - Elasticsearch for full-text landmark search
6. **CDN** - CloudFront for global asset delivery
7. **WebSockets** - Real-time notifications, chat
8. **Message Queue** - RabbitMQ for async jobs
