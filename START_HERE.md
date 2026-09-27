# 🏛️ START HERE - India Tour Guide

## 🎯 Get Running in 3 Steps

### Step 1: Open Command Prompt
Press `Win + R` → Type `cmd` → Press Enter

### Step 2: Go to Project
```cmd
cd D:\projects\routefinder
```

### Step 3: Run This Command
```cmd
npm run dev
```

**That's it!** The app will open at http://localhost:5173

---

## ⚠️ IMPORTANT - Do This FIRST

Before running the app, make sure:

### 1️⃣ Ollama is Running
Open a **separate** Command Prompt and run:
```cmd
ollama serve
```
Keep this window open the entire time.

### 2️⃣ Supabase Database is Setup
1. Go to: https://app.supabase.com/projects
2. Open your project
3. Go to **SQL Editor** → **New Query**
4. Open file: `D:\projects\routefinder\server\src\db\schema.sql`
5. Copy ALL the code
6. Paste in Supabase
7. Click **Run**
8. Wait for ✅ success

9. Repeat with: `D:\projects\routefinder\server\src\db\seed.sql`

---

## 🚀 Quick Test

After running `npm run dev`, check:

**In Browser 1:**
```
http://localhost:5173
```
You should see the login page with monuments.

**In Browser 2:**
```
http://localhost:5000/api/health
```
Should show:
```json
{"status": "Server is running"}
```

---

## 📝 First Time Signup

- **Email**: any email (e.g., test@example.com)
- **Password**: Must have uppercase, lowercase, number, special char
  - Example: `Test@12345`
- **Name**: Your name

---

## 🎯 What to Try First

1. **Sign Up** - Create account
2. **Explore Map** - Click on landmarks
3. **Search** - Try "Taj", "Delhi", "Temple"
4. **Find Route** - Select a destination
5. **Browse Hotels** - Pick a city
6. **AI Guide** - Select landmark, click "Generate Full Guide"

---

## ❌ If It Doesn't Work

### Error: "Cannot find module"
```cmd
npm run install:all
```

### Error: "Ollama offline"
Make sure `ollama serve` is running in separate Command Prompt

### Error: "Port 5173 already in use"
Close other apps or restart computer

### Error: "Database error"
Did you run the SQL scripts in Supabase? Check that.

---

## 📂 Important Files

| File | Purpose |
|------|---------|
| `WINDOWS_SETUP.md` | Detailed Windows setup guide |
| `README_SETUP.md` | Complete documentation |
| `BUILD_SUMMARY.md` | What's been built |
| `QUICK_START.md` | Quick reference |
| `server/src/db/schema.sql` | Database setup |
| `server/src/db/seed.sql` | Sample data |

---

## 🔑 Key URLs

| URL | Purpose |
|-----|---------|
| http://localhost:5173 | **Frontend - Open this!** |
| http://localhost:5000 | Backend API |
| http://localhost:11434 | Ollama AI |

---

## 🎉 You're Ready!

Just run:
```cmd
npm run dev
```

Open: http://localhost:5173

**Enjoy exploring India! 🏛️✨**

---

**Need detailed help?** Read `WINDOWS_SETUP.md` or `README_SETUP.md`
