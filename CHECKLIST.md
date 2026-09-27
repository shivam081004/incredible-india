# ✅ India Tour Guide - Pre-Launch Checklist

## 🚀 Before You Run the App

- [ ] **Ollama Installed?**
  - Download from https://ollama.ai
  - Install and test: `ollama --version`

- [ ] **Node.js Installed?**
  - Version 16+
  - Test: `node --version`

- [ ] **Project Folder Exists?**
  - `D:\projects\routefinder`
  - Contains `server`, `client`, `package.json`

- [ ] **Environment Files Exist?**
  - `server/.env` ✅ (already configured)
  - `client/.env` ✅ (already configured)

---

## 🗄️ Setup Supabase (One-Time - 5 Minutes)

### Execute These Steps:

1. [ ] Go to https://app.supabase.com/projects
2. [ ] Open your project (sbealbklknqsmwwkwcmx)
3. [ ] Click **SQL Editor** (left sidebar)
4. [ ] Click **New Query**
5. [ ] Open: `D:\projects\routefinder\server\src\db\schema.sql`
6. [ ] Copy ALL code (Ctrl+A → Ctrl+C)
7. [ ] Paste in Supabase SQL Editor
8. [ ] Click **Run** button
9. [ ] Wait for ✅ **Success message**
10. [ ] Repeat steps 3-9 with `server/src/db/seed.sql`

**✅ Database is ready!**

---

## 🚀 Start the App (Every Time)

### Terminal 1: Ollama (Keep Running)
```cmd
ollama serve
```
✅ See: "Listening on"

### Terminal 2: Dev Servers
```cmd
cd D:\projects\routefinder
npm run dev
```

✅ See:
- `[server] 🚀 Server running on http://localhost:5000`
- `[client] VITE v5.x.x ready in X ms`

### Terminal 3: Open Browser
```
http://localhost:5173
```

✅ You should see login page with monuments

---

## 🧪 Verify Everything Works

### Test 1: Server Health
```
http://localhost:5000/api/health
```
Should show: `"status": "Server is running"`

### Test 2: Places API
```
http://localhost:5000/api/places/all
```
Should show list of landmarks

### Test 3: Ollama Status
```
http://localhost:5000/api/ai-guide/status
```
Should show: `"status": "online"`

### Test 4: Frontend Loads
```
http://localhost:5173
```
Should show login page with animated monuments

---

## ✍️ Create Test Account

- **Email**: test@example.com (or any email)
- **Password**: Test@12345 (uppercase, lowercase, number, special char)
- **Full Name**: Test User

---

## 🎯 Test All Features

- [ ] **Map** - Click landmarks, search
- [ ] **Route Finder** - Select destination, see transport options
- [ ] **Hotels** - Browse by city
- [ ] **Cultural Places** - See free museums/temples
- [ ] **AI Guide** - Generate guide for a landmark

---

## 📊 Expected Results

| Feature | Expected | Status |
|---------|----------|--------|
| Login page loads | Yes | ✅ |
| Signup works | Yes | ✅ |
| Map displays | Yes | ✅ |
| Places load | Yes | ✅ |
| Search works | Yes | ✅ |
| Route finder works | Yes | ✅ |
| Hotels load | Yes | ✅ |
| AI guide works | Yes (if Ollama running) | ✅ |

---

## 🆘 Troubleshooting Quick Fix

| Problem | Solution |
|---------|----------|
| "Cannot find module" | `npm run install:all` |
| "Ollama offline" | Run `ollama serve` in new terminal |
| "Port already in use" | Restart computer or close other apps |
| "Cannot connect DB" | Check Supabase SQL ran successfully |
| "API returns 500" | Check server console for errors |

---

## 🎉 Success Indicators

You'll know it's working when:

✅ Login page loads with monument animations
✅ Can create account
✅ Can view map with landmarks
✅ Can search places
✅ Can see route options
✅ Can browse hotels
✅ Can generate AI guides (if Ollama running)

---

## 📞 Files to Reference

| File | When to Use |
|------|------------|
| `START_HERE.md` | Quick start (this is your main file!) |
| `WINDOWS_SETUP.md` | Detailed Windows instructions |
| `README_SETUP.md` | Complete setup guide |
| `BUILD_SUMMARY.md` | What's been built |
| `QUICK_START.md` | Quick reference |

---

## ⚡ Commands Cheat Sheet

```cmd
# Install dependencies (one-time)
npm run install:all

# Start dev servers (main command)
npm run dev

# Start only backend
npm run dev:server

# Start only frontend
npm run dev:client

# Build for production
npm run build
```

---

## 🚀 You're Ready!

**Run this:**
```cmd
cd D:\projects\routefinder
npm run dev
```

**Open this:**
```
http://localhost:5173
```

**Sign up and explore!**

---

## 📋 Final Checklist

- [ ] Ollama running? (`ollama serve` in terminal)
- [ ] Supabase SQL executed? (schema.sql + seed.sql)
- [ ] Dependencies installed? (`npm run install:all`)
- [ ] Dev servers running? (`npm run dev`)
- [ ] Frontend loads? (http://localhost:5173)
- [ ] Backend responds? (http://localhost:5000/api/health)

**All checked? You're good to go! 🎉**

---

**Enjoy exploring India's magnificent landmarks! 🏛️✨**

*If you get stuck, see WINDOWS_SETUP.md or README_SETUP.md*
