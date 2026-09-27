# 🏛️ India Tour Guide - Windows Setup Guide

## ⚡ Quick Start (5 Minutes)

### Step 1: Open Command Prompt (Windows)
Press `Win + R`, type `cmd`, hit Enter

### Step 2: Navigate to Project
```cmd
cd D:\projects\routefinder
```

### Step 3: Run Quick Start Script
```cmd
START.bat
```

This will:
- ✅ Check Node.js
- ✅ Install all dependencies
- ✅ Show setup instructions

---

## 🔧 Manual Setup (If Script Doesn't Work)

### Step 1: Install Dependencies
```cmd
cd D:\projects\routefinder
npm run install:all
```

### Step 2: Setup Supabase (One-Time)
1. Go to https://app.supabase.com/projects
2. Click on your project
3. Go to **SQL Editor** (left sidebar)
4. Click **New Query**
5. Open: `D:\projects\routefinder\server\src\db\schema.sql`
6. Copy ALL the SQL code
7. Paste it in Supabase SQL Editor
8. Click **Run** (execute button)
9. Wait for success message ✅

10. Repeat steps 3-8 with `server/src/db/seed.sql`

### Step 3: Start Ollama (Keep Running)
Open a NEW Command Prompt window:
```cmd
ollama serve
```

Keep this window open while using the app.

### Step 4: Start Development Servers
Open ANOTHER new Command Prompt window:
```cmd
cd D:\projects\routefinder
npm run dev
```

Wait for:
```
[server] 🚀 Server running on http://localhost:5000
[client] VITE v5.x.x ready in X ms
```

### Step 5: Open Browser
Go to: **http://localhost:5173**

---

## ✅ Verify Everything is Running

### Check 1: Server Health
Open browser and go to:
```
http://localhost:5000/api/health
```

Should see:
```json
{
  "status": "Server is running",
  "timestamp": "2026-09-26T..."
}
```

### Check 2: Ollama Status
Open browser and go to:
```
http://localhost:5000/api/ai-guide/status
```

Should see something like:
```json
{
  "status": "online",
  "model": "mistral"
}
```

If it says "offline", make sure `ollama serve` is running.

---

## 🎯 First Time Using the App

1. **Sign Up**
   - Email: `test@example.com`
   - Password: `Test@12345` (must have uppercase, lowercase, number, special char)
   - Full Name: `Test User`

2. **Explore Map**
   - Click on landmarks
   - Search for "Taj", "Delhi", etc.

3. **Find Routes**
   - Select destination
   - See all transport options
   - Click "Book on IRCTC" etc.

4. **Browse Hotels**
   - Select city
   - See hotels with ratings

5. **Try AI Guide**
   - Select a landmark
   - Click "Generate Full Guide"
   - Wait for AI response

---

## 🐛 Troubleshooting

### Error: "npm: command not found"
- **Solution**: Node.js not installed
- Go to https://nodejs.org/ and install Node.js LTS
- Restart computer
- Try again

### Error: "Cannot find port 5173"
- **Solution**: Port already in use
- Close other applications using port 5173
- Or change the port in `client/vite.config.js`

### Error: "Ollama is offline"
- **Solution**: Ollama not running
- Open new Command Prompt
- Run: `ollama serve`
- Keep it running

### Error: "Cannot connect to Supabase"
- **Solution**: Environment variables not set
- Check `server/.env` exists
- Check it has valid SUPABASE_URL and SUPABASE_ANON_KEY
- Restart server

### Error: "Dependencies installation failed"
- **Solution**: Clean reinstall
```cmd
cd D:\projects\routefinder
rmdir /s /q node_modules
rmdir /s /q server\node_modules
rmdir /s /q client\node_modules
del package-lock.json
del server\package-lock.json
del client\package-lock.json
npm run install:all
```

### Error: "Cannot find module"
- **Solution**: Missing dependencies
```cmd
npm run install:all
```

---

## 📝 Commands Reference

| Command | What it does |
|---------|-------------|
| `npm run dev` | Start both server & client |
| `npm run dev:server` | Start only backend |
| `npm run dev:client` | Start only frontend |
| `npm run build` | Build for production |

---

## 🖥️ Multiple Windows Setup

For best experience, open 3 Command Prompt windows:

**Window 1: Ollama** (Keep running)
```cmd
ollama serve
```

**Window 2: Backend Server**
```cmd
cd D:\projects\routefinder
npm run dev:server
```

**Window 3: Frontend Client**
```cmd
cd D:\projects\routefinder
npm run dev:client
```

Then open: http://localhost:5173

---

## 🌐 URLs to Remember

| Service | URL |
|---------|-----|
| Frontend | http://localhost:5173 |
| Backend API | http://localhost:5000 |
| Ollama API | http://localhost:11434 |
| Supabase | https://app.supabase.com |

---

## 💾 Project Files Structure

```
D:\projects\routefinder\
├── server/                 (Backend)
│   ├── src/
│   │   ├── index.js       (Main server)
│   │   ├── routes/        (API endpoints)
│   │   └── db/            (SQL files)
│   └── .env               (Credentials)
│
├── client/                 (Frontend)
│   ├── src/
│   │   ├── App.jsx        (Main app)
│   │   ├── pages/         (Pages)
│   │   └── components/    (Components)
│   └── .env               (Config)
│
├── START.bat              (Quick start script)
├── QUICK_START.md         (This file)
├── README_SETUP.md        (Detailed setup)
└── BUILD_SUMMARY.md       (Project overview)
```

---

## 🚀 Next Steps After Getting It Running

1. **Explore All Features**
   - Map discovery
   - Route finder
   - Hotels browser
   - AI guide
   - Authentication

2. **Customize (Optional)**
   - Add more landmarks in Supabase
   - Change colors in Tailwind CSS
   - Add your logo/branding

3. **Deploy When Ready**
   - Frontend to Vercel
   - Backend to Railway
   - Domain setup

---

## 📞 Still Having Issues?

1. Check `README_SETUP.md` for detailed setup
2. Check `BUILD_SUMMARY.md` for project overview
3. Check `.env` files are configured correctly
4. Ensure Ollama is running: `ollama serve`
5. Ensure Supabase database is setup (run schema.sql + seed.sql)

---

## ✨ You're All Set!

Once everything is running:

1. Open http://localhost:5173
2. Sign up
3. Explore India's landmarks!

**Enjoy! 🏛️✨**
