# 🏛️ INDIA TOUR GUIDE - QUICK REFERENCE

## 🚀 START HERE (Copy & Paste These Commands)

### First Time Setup
```bash
cd D:\projects\routefinder
npm run install:all
```

### Start Everything
```bash
npm run dev
```

### Then Open
```
http://localhost:5173
```

---

## 📋 Essential Setup Steps

### 1️⃣ Ensure Ollama is Running
```bash
# Terminal 1: Start Ollama
ollama serve

# Terminal 2: Pull model (first time only)
ollama pull mistral
```

### 2️⃣ Setup Supabase Database
1. Go to: https://app.supabase.com/projects
2. SQL Editor → New Query
3. Copy from: `server/src/db/schema.sql`
4. Run it
5. Copy from: `server/src/db/seed.sql`
6. Run it

### 3️⃣ Environment Variables Already Set
- ✅ Backend `.env` configured
- ✅ Client `.env` configured
- ✅ Supabase credentials included
- ✅ Ollama URL configured
- ✅ Google OAuth configured

---

## 🧪 Quick Tests

### Test Server Health
```bash
curl http://localhost:5000/api/health
```

### Test Places API
```bash
curl http://localhost:5000/api/places/all
```

### Test Ollama Status
```bash
curl http://localhost:5000/api/ai-guide/status
```

---

## 📂 Important Files

| File | Purpose |
|------|---------|
| `server/src/index.js` | Main backend server |
| `client/src/App.jsx` | Frontend router |
| `server/src/db/schema.sql` | Database structure |
| `README_SETUP.md` | Detailed setup guide |
| `BUILD_SUMMARY.md` | Project overview |

---

## 🔑 Key URLs

| Service | URL |
|---------|-----|
| Frontend | http://localhost:5173 |
| Backend | http://localhost:5000 |
| Ollama | http://localhost:11434 |
| Supabase | Online (no local URL) |

---

## 👤 Test Account

You can create any account, but here's a test one:
- **Email**: test@example.com
- **Password**: Test@12345 (must follow rules)

---

## 🎨 Main Pages

1. **Login** (`/login`) - Monument-themed auth
2. **Signup** (`/signup`) - Create account
3. **Home** (`/home`) - Interactive map
4. **Route Finder** (`/route-finder`) - Transport options
5. **Hotels** (`/hotels`) - Hotels & cultural places
6. **AI Guide** (`/ai-guide`) - Ollama-powered guides

---

## 🔧 Common Issues & Fixes

### "Cannot find module"
```bash
npm run install:all
```

### "Ollama is offline"
```bash
# Ensure this is running in separate terminal
ollama serve
```

### "API connection failed"
- Check server: `npm run dev:server`
- Check URL in `.env`

### "Database error"
- Verify Supabase SQL ran successfully
- Check connection credentials

---

## 📊 API Endpoints Quick Reference

### Auth
```
POST /api/auth/register
POST /api/auth/login
POST /api/auth/google-login
```

### Places
```
GET  /api/places/all
GET  /api/places/:id
GET  /api/places/search?query=...
```

### Hotels
```
GET  /api/hotels/city/:city
GET  /api/hotels/near/:placeId
```

### Route Finder
```
POST /api/route-finder/find-route
```

### AI Guide
```
POST /api/ai-guide/generate
POST /api/ai-guide/travel-tips
```

---

## 🎯 Features to Try

1. **Sign Up** with monument-themed design
2. **Explore Map** - Click pins for details
3. **Search Places** - Try "Taj", "Delhi", etc.
4. **Find Route** - Select destination, see transport options
5. **Browse Hotels** - Select city, see hotels with ratings
6. **AI Guide** - Generate guides for any landmark

---

## 📱 Responsive Testing

- Mobile: Open DevTools (F12), toggle device toolbar
- Tablet: 768px width
- Desktop: Full width

---

## 🚀 Deployment (When Ready)

### Frontend to Vercel
```bash
npm run build
# Upload 'dist' folder
```

### Backend to Railway
```bash
# Push to GitHub
# Connect Railway
# Set environment variables
```

---

## 📞 File Locations

```
D:\projects\routefinder\
├── server/
│   ├── src/
│   │   ├── index.js (main server)
│   │   ├── routes/ (5 API modules)
│   │   └── db/ (SQL files)
│   └── .env (configured)
├── client/
│   ├── src/
│   │   ├── App.jsx (main app)
│   │   ├── pages/ (5 main pages)
│   │   └── components/
│   └── .env (configured)
└── Documentation/
    ├── README_SETUP.md
    ├── BUILD_SUMMARY.md
    └── DELIVERY_SUMMARY.md
```

---

## ✨ What's Inside

✅ Complete React frontend with animations
✅ Full Node.js backend with API routes
✅ PostgreSQL database with 8 tables
✅ AI integration with Ollama Mistral
✅ Authentication with rate limiting
✅ 10+ sample India landmarks
✅ Interactive map with Leaflet
✅ Monument-themed design
✅ Security hardening
✅ Full documentation

---

## 🎉 You're All Set!

**Everything is ready to go. Just:**
1. Run `npm run dev`
2. Open http://localhost:5173
3. Sign up and explore

**That's it! Enjoy the app! 🏛️✨**

---

## 📖 For More Details

- **Setup Guide**: `README_SETUP.md`
- **Project Overview**: `BUILD_SUMMARY.md`
- **Full Summary**: `DELIVERY_SUMMARY.md`
- **Database**: `server/src/db/schema.sql`

---

*Happy exploring India's magnificent landmarks!*
*Powered by React, Node.js, Supabase, and Ollama AI*
