# Installation Guide - Incredible India

Complete step-by-step setup instructions for getting the Incredible India application running on your local machine or deploying to production.

## 📋 Prerequisites

Before you start, make sure you have:

- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **npm** or **pnpm** (comes with Node.js)
- **Git** - [Download](https://git-scm.com/)
- **Supabase Account** - [Create Free](https://supabase.com/)
- **Ollama** (for AI features) - [Download](https://ollama.ai/)
- **Text Editor** (VS Code recommended) - [Download](https://code.visualstudio.com/)

### Verify Installation
```bash
node --version  # Should be v18+
npm --version   # Should be v9+
git --version   # Any version is fine
```

---

## 🚀 Quick Start (5 Minutes)

### 1. Clone the Repository
```bash
git clone https://github.com/shivam081004/incredible-india.git
cd incredible-india
```

### 2. Install Frontend Dependencies
```bash
cd client
npm install
```

### 3. Install Backend Dependencies
```bash
cd ../server
npm install
```

### 4. Create Environment Files
```bash
# In client/ directory
cp .env.example .env.local
# Edit .env.local with your values

# In server/ directory
cp .env.example .env.local
# Edit .env.local with your values
```

### 5. Run Development Servers

**Terminal 1 - Frontend:**
```bash
cd client
npm run dev
# Visit http://localhost:5173
```

**Terminal 2 - Backend:**
```bash
cd server
npm start
# Backend running on http://localhost:3000
```

---

## 🔧 Detailed Setup Instructions

### Step 1: Clone Repository

```bash
# Using HTTPS (default)
git clone https://github.com/shivam081004/incredible-india.git
cd incredible-india

# Or using SSH (if SSH keys configured)
git clone git@github.com:shivam081004/incredible-india.git
cd incredible-india
```

---

### Step 2: Frontend Setup (React + Vite)

Navigate to client directory:
```bash
cd client
```

Install dependencies:
```bash
npm install
```

Expected packages installed:
- react@18.x
- react-router-dom@6.x
- framer-motion@10.x
- tailwindcss@3.x
- lucide-react@latest
- axios@latest
- zod@latest

---

### Step 3: Backend Setup (Node.js + Express)

Navigate to server directory:
```bash
cd ../server
```

Install dependencies:
```bash
npm install
```

Expected packages installed:
- express@4.x
- @supabase/supabase-js@2.x
- jsonwebtoken@9.x
- bcryptjs@2.x
- cors@2.x
- helmet@7.x
- express-rate-limit@6.x
- dotenv@16.x
- zod@3.x

---

### Step 4: Supabase Setup

1. **Create Supabase Project**
   - Go to [https://supabase.com](https://supabase.com)
   - Click "New Project"
   - Name: `incredible-india`
   - Choose region closest to you
   - Create project

2. **Get Credentials**
   - Go to Project Settings → API
   - Copy **Project URL** → `SUPABASE_URL`
   - Copy **Anon Key** → `SUPABASE_ANON_KEY`
   - Copy **Service Role Key** → `SUPABASE_SERVICE_ROLE_KEY`

3. **Create Database Tables**
   - Go to SQL Editor
   - Create new query
   - Paste content from `server/src/db/schema.sql`
   - Click "Run"

4. **Set Up Row-Level Security (RLS)**
   - For each table, enable RLS
   - Create policies (templates in schema.sql)

---

### Step 5: Environment Variables

Create `.env.local` files with the template below:

**client/.env.local:**
```bash
VITE_API_URL=http://localhost:3000/api
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGc...
VITE_OLLAMA_API_URL=http://localhost:11434
VITE_GOOGLE_CLIENT_ID=your_google_client_id.apps.googleusercontent.com
```

**server/.env.local:**
```bash
PORT=3000
NODE_ENV=development

# Database
DATABASE_URL=postgresql://user:password@db.supabase.co:5432/postgres
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=eyJhbGc...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...

# Authentication
JWT_SECRET=your_super_secret_key_minimum_32_chars_long

# External Services
OLLAMA_API_URL=http://localhost:11434
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# Optional: Payment Gateway
STRIPE_SECRET_KEY=sk_live_...
```

⚠️ **IMPORTANT**: Never commit `.env.local` files. They're in `.gitignore` for security.

---

### Step 6: Ollama Setup (for AI features)

1. **Download Ollama**
   - Go to [https://ollama.ai](https://ollama.ai)
   - Download for your OS
   - Install

2. **Run Ollama**
   ```bash
   ollama serve
   ```

3. **Pull a Model** (in another terminal)
   ```bash
   ollama pull mistral
   # or any other model you prefer
   ```

4. **Test Connection**
   ```bash
   curl http://localhost:11434/api/tags
   ```

---

### Step 7: Google OAuth Setup (Optional)

1. **Create Google Project**
   - Go to [https://console.cloud.google.com](https://console.cloud.google.com)
   - Create new project
   - Enable Google+ API

2. **Create OAuth Credentials**
   - Go to Credentials
   - Create OAuth 2.0 Client ID
   - Application type: Web
   - Authorized redirect URIs:
     - `http://localhost:5173/auth/google/callback`
     - `https://your-domain.com/auth/google/callback` (production)

3. **Copy Credentials**
   - Copy **Client ID** → `VITE_GOOGLE_CLIENT_ID`
   - Copy **Client Secret** → `GOOGLE_CLIENT_SECRET`

---

### Step 8: Run Development Servers

**Terminal 1 - Frontend (port 5173):**
```bash
cd client
npm run dev
```
Output:
```
VITE v4.x.x  ready in XXX ms

➜  Local:   http://localhost:5173/
➜  Press h to show help
```

**Terminal 2 - Backend (port 3000):**
```bash
cd server
npm start
```
Output:
```
Server running on http://localhost:3000
Database connected
```

**Terminal 3 - Ollama (port 11434):**
```bash
ollama serve
```

Visit **http://localhost:5173** in your browser.

---

## 📱 Project Structure

```
incredible-india/
├── client/                    # React frontend
│   ├── src/
│   │   ├── pages/            # Page components
│   │   ├── components/       # Reusable components
│   │   ├── utils/            # Utility functions
│   │   ├── services/         # API services
│   │   ├── contexts/         # React contexts
│   │   └── App.jsx
│   ├── public/               # Static assets
│   ├── package.json
│   ├── vite.config.js
│   └── .env.example
│
├── server/                    # Node.js backend
│   ├── src/
│   │   ├── routes/           # API routes
│   │   ├── middleware/       # Express middleware
│   │   ├── services/         # Business logic
│   │   ├── db/               # Database files
│   │   └── index.js          # Entry point
│   ├── package.json
│   └── .env.example
│
├── designprompts/            # AI-friendly documentation
│   ├── README.md             # This guide
│   ├── ANIMATION_PATTERNS.md # 24 animation codes
│   ├── DESIGN_SYSTEM.md      # Design standards
│   ├── COMPONENT_LIBRARY.md  # Pre-built components
│   ├── API_REFERENCE.md      # API docs
│   ├── SECURITY_CHECKLIST.md # Security patterns
│   └── DATABASE_SCHEMA.sql   # DB schema
│
├── ARCHITECTURE.md           # System design
├── PACKAGE.md                # Package documentation
├── SECURITY.md               # Security guidelines
├── README.md                 # Project overview
└── .gitignore                # Git ignore rules
```

---

## ✅ Verification Checklist

After setup, verify everything works:

- [ ] Frontend running at http://localhost:5173
- [ ] Backend running at http://localhost:3000
- [ ] Ollama running at http://localhost:11434
- [ ] Can login with test account
- [ ] Can view dashboard
- [ ] Can view map discovery
- [ ] Live validation dashboard shows "API: ✓"
- [ ] No console errors

---

## 🧪 Testing the Setup

### Test Frontend
```bash
cd client
npm test
```

### Test Backend
```bash
cd server
npm test
```

### Test API Connection
```bash
curl http://localhost:3000/api/health
```

Expected response:
```json
{ "status": "ok" }
```

---

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Find process using port 5173
lsof -i :5173

# Kill process
kill -9 <PID>
```

### Dependencies Installation Failed
```bash
# Clear npm cache
npm cache clean --force

# Remove package-lock.json
rm package-lock.json

# Reinstall
npm install
```

### Can't Connect to Supabase
- Verify `SUPABASE_URL` and `SUPABASE_ANON_KEY` in `.env.local`
- Check Supabase project is running
- Verify network connection

### Ollama Connection Failed
- Verify Ollama is running: `curl http://localhost:11434/api/tags`
- Check `OLLAMA_API_URL` in environment variables
- Ensure port 11434 is not blocked by firewall

### JWT Authentication Error
- Verify `JWT_SECRET` in `server/.env.local` is set
- Check token expiry: tokens expire after 24 hours
- Clear browser cookies and login again

---

## 🚀 Build for Production

### Frontend Build
```bash
cd client
npm run build
```

Creates optimized bundle in `client/dist/`

### Backend Build
```bash
cd server
npm run build
```

### Environment for Production
Create `server/.env.production` with:
```bash
NODE_ENV=production
PORT=3000
DATABASE_URL=postgresql://prod-user:prod-password@prod-db.supabase.co:5432/postgres
JWT_SECRET=your_production_secret_key
OLLAMA_API_URL=http://ollama-service:11434
# ... other production values
```

---

## 📦 Deployment Options

### Frontend
- **Vercel** (recommended, free tier available)
- **Netlify** (free tier available)
- **AWS S3 + CloudFront**
- **GitHub Pages**

### Backend
- **Heroku** (free tier removed, but affordable)
- **DigitalOcean** (App Platform)
- **AWS EC2 / Lightsail**
- **Railway** (free tier available)
- **Render.com** (free tier available)

### Database
- **Supabase** (PostgreSQL, free tier)
- **AWS RDS**
- **Google Cloud SQL**

---

## 📚 Next Steps

After successful installation:

1. **Read DESIGN_SYSTEM.md** - Understand design standards
2. **Read ANIMATION_PATTERNS.md** - Learn animation patterns
3. **Read API_REFERENCE.md** - Understand available APIs
4. **Read SECURITY_CHECKLIST.md** - Follow security practices
5. **Start developing** - Build new features!

---

## 📞 Getting Help

If you encounter issues:

1. Check **Troubleshooting** section above
2. Search existing [GitHub Issues](https://github.com/shivam081004/incredible-india/issues)
3. Check documentation in `designprompts/` folder
4. Review logs in browser console and server terminal

---

## 🔄 Keep Everything Updated

```bash
# Check for outdated packages
npm outdated

# Update packages safely
npm update

# Run security audit
npm audit

# Fix vulnerabilities
npm audit fix
```

---

**Last Updated**: 2026-09-27
**Node Version**: 18+
**npm Version**: 9+
**React Version**: 18+
**Status**: Production Ready
