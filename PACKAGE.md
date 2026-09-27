# Packages & Modules - Incredible India

## Client Packages

### Production Dependencies

#### `react@^18.0.0`
**Purpose**: UI library for building interactive components
**Usage**: Core framework for all page and component rendering
**Key Files**: 
- `src/App.jsx` - Root component
- `src/pages/` - Page components
- `src/components/` - Reusable components

#### `react-router-dom@^6.0.0`
**Purpose**: Client-side routing and navigation
**Usage**: Route definitions, navigation links, protected routes
**Key Files**:
- `src/App.jsx` - Route configuration
- All page components use useNavigate(), useParams()

#### `framer-motion@^10.0.0`
**Purpose**: Animation library for smooth transitions and interactions
**Usage**: Page entrance/exit, hover effects, loading animations
**Key Files**:
- `src/components/LiveValidationDashboard.jsx`
- `src/pages/Login.jsx`, `Dashboard.jsx`, etc.
- `motion.div`, `motion.button`, `AnimatePresence`

#### `tailwindcss@^3.0.0`
**Purpose**: Utility-first CSS framework for styling
**Usage**: All styling across the application
**Key Files**:
- `tailwind.config.js` - Configuration
- All components use `className=""`

#### `lucide-react@^0.x.x`
**Purpose**: Icon library with React components
**Usage**: UI icons throughout the application
**Key Files**:
- Imported in components: `import { Search, MapPin } from 'lucide-react'`

#### `axios@^1.0.0`
**Purpose**: HTTP client for API calls
**Usage**: All communication with backend
**Key Files**:
- `src/services/api.js` - Centralized API client
- Used in all page components for data fetching

#### `zod@^3.0.0`
**Purpose**: Schema validation library
**Usage**: Frontend form validation
**Key Files**:
- `src/utils/validation.ts` - Validation schemas
- Form components validate before submission

### Dev Dependencies

#### `vite@^4.0.0`
**Purpose**: Fast frontend build tool and dev server
**Usage**: Development server, production bundling
**Commands**: `npm run dev`, `npm run build`

#### `@vitejs/plugin-react@^3.0.0`
**Purpose**: Vite plugin for React JSX transformation
**Usage**: Enables JSX syntax in .jsx files

#### `tailwindcss@^3.0.0` (dev)
**Purpose**: CSS generation for Tailwind
**Usage**: Build process generates CSS from utilities

#### `postcss@^8.0.0`
**Purpose**: CSS transformation processor
**Usage**: Processes Tailwind directives

#### `autoprefixer@^10.0.0`
**Purpose**: Adds vendor prefixes to CSS
**Usage**: Cross-browser compatibility

#### `eslint@^8.0.0`
**Purpose**: Code linting and quality checks
**Usage**: Find bugs and style issues before runtime

#### `prettier@^2.0.0`
**Purpose**: Code formatter
**Usage**: Consistent code formatting

---

## Server Packages

### Production Dependencies

#### `express@^4.18.0`
**Purpose**: Web framework for Node.js
**Usage**: REST API server, routing, middleware
**Key Files**:
- `server/index.js` - Main entry point
- `server/routes/` - API endpoints

#### `@supabase/supabase-js@^2.0.0`
**Purpose**: Supabase client for PostgreSQL database
**Usage**: Database operations with Row-Level Security
**Key Files**:
- `server/services/db.js` - Database client initialization
- All route handlers use Supabase client

#### `jsonwebtoken@^9.0.0`
**Purpose**: JWT token generation and verification
**Usage**: Authentication and session management
**Key Files**:
- `server/middleware/auth.js` - Token verification
- `server/routes/auth.js` - Token generation

#### `bcryptjs@^2.4.3`
**Purpose**: Password hashing with salt
**Usage**: Secure password storage
**Key Files**:
- `server/routes/auth.js` - Hash passwords on registration
- `server/routes/auth.js` - Compare passwords on login

#### `cors@^2.8.5`
**Purpose**: Cross-Origin Resource Sharing middleware
**Usage**: Allow frontend to call API from different origin
**Key Files**:
- `server/index.js` - CORS configuration

#### `helmet@^7.0.0`
**Purpose**: Security headers middleware
**Usage**: Add HTTP security headers (CSP, HSTS, etc.)
**Key Files**:
- `server/index.js` - Helmet setup

#### `express-rate-limit@^6.0.0`
**Purpose**: Rate limiting middleware
**Usage**: Prevent brute force attacks on auth endpoints
**Key Files**:
- `server/middleware/rateLimit.js` - Rate limiter configuration

#### `dotenv@^16.0.0`
**Purpose**: Load environment variables from .env file
**Usage**: Store sensitive configuration outside code
**Key Files**:
- `server/.env.local` - Environment variables (not committed)
- `server/.env.example` - Template with placeholders

#### `zod@^3.0.0`
**Purpose**: Schema validation at API boundaries
**Usage**: Validate request data before processing
**Key Files**:
- `server/utils/validation.js` - Schema definitions
- Route handlers use schemas: `const data = UserSchema.parse(req.body)`

#### `axios@^1.0.0`
**Purpose**: HTTP client for external API calls
**Usage**: Call Ollama API, payment gateways, third-party services
**Key Files**:
- `server/services/ollama.js` - Call Ollama for AI guides
- `server/services/external.js` - Other external calls

### Dev Dependencies

#### `nodemon@^2.0.0`
**Purpose**: Auto-restart server on file changes
**Usage**: Development convenience
**Commands**: `npm run dev`

#### `eslint@^8.0.0`
**Purpose**: Code linting
**Usage**: Find bugs and enforce style consistency

#### `jest@^29.0.0`
**Purpose**: Testing framework
**Usage**: Unit and integration tests
**Commands**: `npm test`

#### `supertest@^6.0.0`
**Purpose**: HTTP assertion library for testing
**Usage**: Test API endpoints in isolation

---

## Utility & Helper Files

### Frontend Utils

#### `src/services/api.js`
**Purpose**: Centralized HTTP client with interceptors
**Exports**:
- Default: Axios instance with base URL and auth headers
- Auto-attaches JWT token from localStorage
- Handles errors globally

#### `src/utils/liveValidator.js`
**Purpose**: Real-time health monitoring system
**Exports**:
- `LiveValidator` class - Register and run checks
- `checks` object - Pre-built health checks (API, DB, performance)
- Provides: `register()`, `start()`, `subscribe()`, `getStatus()`

#### `src/contexts/AuthContext.jsx`
**Purpose**: Global authentication state management
**Provides**:
- `useAuth()` hook - Access user, login, logout
- `isAuthenticated`, `user`, `loading`, `login()`, `logout()`, `register()`

### Backend Utils

#### `server/middleware/auth.js`
**Purpose**: JWT verification middleware
**Usage**: Protect routes that require authentication
**Exports**: Middleware function that validates token and attaches user to request

#### `server/middleware/rateLimit.js`
**Purpose**: Rate limiting configuration
**Usage**: Prevent brute force attacks
**Exports**: Middleware with configurable thresholds per endpoint

#### `server/utils/validation.js`
**Purpose**: Zod schema definitions for all API inputs
**Exports**: Schemas for User, Route, Hotel, Trip, AIGuide
**Usage**: `const data = UserSchema.parse(req.body)`

#### `server/services/db.js`
**Purpose**: Supabase client initialization
**Usage**: All database operations go through this client
**Exports**: Configured Supabase client with auth context

#### `server/services/ollama.js`
**Purpose**: Ollama API integration for AI guides
**Usage**: Generate travel guides and tips
**Exports**: Functions like `generateGuide(place)`, `generateTips(place)`

---

## Configuration Files

### Frontend

#### `vite.config.js`
- Vite configuration
- React plugin setup
- Build optimization
- Dev server settings (port 5173)

#### `tailwind.config.js`
- Tailwind theme customization
- Color palette
- Font sizing
- Custom animations

#### `postcss.config.js`
- PostCSS plugins (Tailwind, Autoprefixer)
- CSS transformation pipeline

#### `.env.example` (committed)
```
VITE_API_URL=http://localhost:3000/api
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_anon_key
OLLAMA_API_URL=http://localhost:11434
```

### Backend

#### `server/.env.example` (committed)
```
PORT=3000
DATABASE_URL=your_supabase_connection_string
JWT_SECRET=your_jwt_secret
OLLAMA_API_URL=http://localhost:11434
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

#### `server/index.js`
- Express app initialization
- Middleware setup (CORS, Helmet, rate limiting)
- Route registration
- Error handling setup
- Server startup

---

## Key Module Relationships

```
Browser
  │
  └─→ Frontend (React)
      ├─→ api.js (Axios client)
      │   └─→ Backend API
      ├─→ AuthContext (JWT management)
      │   └─→ Login/Signup routes
      ├─→ Pages (Dashboard, MapDiscovery, etc.)
      │   └─→ useAuth() hooks
      │   └─→ API calls via api.js
      └─→ LiveValidationDashboard
          └─→ Health checks (API, DB, performance)

Backend (Node.js + Express)
  ├─→ Auth routes
  │   ├─→ validation.js (Zod schemas)
  │   ├─→ bcryptjs (password hashing)
  │   └─→ jsonwebtoken (JWT generation)
  ├─→ Route finder, Hotels, Trips routes
  │   ├─→ middleware/auth.js (verify JWT)
  │   ├─→ db.js (Supabase client)
  │   └─→ validation.js (input validation)
  ├─→ AI Guide route
  │   └─→ services/ollama.js (call Ollama)
  └─→ Middleware
      ├─→ CORS configuration
      ├─→ Helmet (security headers)
      ├─→ Rate limiter
      └─→ Error handler

Database (Supabase PostgreSQL)
  ├─→ users table (with RLS)
  ├─→ routes table (with RLS)
  ├─→ hotels table (public read)
  ├─→ landmarks table (public read)
  └─→ trips table (with RLS)

External Services
  ├─→ Ollama (AI model for guides)
  ├─→ Google OAuth
  ├─→ Supabase (auth + DB)
  └─→ (Future) Payment gateway
```

---

## Adding New Packages

### Before Installing

1. **Check if it's necessary** - Don't add bloat
2. **Check size** - Use `npm info <package>` or bundlephobia.com
3. **Check maintenance** - GitHub stars, last update, open issues
4. **Check security** - `npm audit` for known vulnerabilities

### Installation

```bash
# Frontend
cd client
npm install <package>

# Backend (if separate)
cd ../server
npm install <package>

# With version pin (recommended)
npm install <package>@^1.2.3
```

### After Installation

1. Add to `.gitignore` if needed
2. Update `package.json` with exact version
3. Commit `package-lock.json` (or yarn.lock / pnpm-lock.yaml)
4. Document usage in this file
5. Run audit: `npm audit`

---

## Dependency Security

- **No secrets in node_modules** - They're in .gitignore
- **Audit regularly** - `npm audit` before every release
- **Update carefully** - Test major version upgrades
- **Review lockfiles** - Detect unexpected changes
- **Use exact versions** for security-critical packages (bcrypt, jsonwebtoken, helmet)
