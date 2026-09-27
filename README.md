# Incredible India - Travel Exploration Platform

![Incredible India](https://img.shields.io/badge/Status-Active%20Development-blue)
![License](https://img.shields.io/badge/License-MIT-green)
![Node](https://img.shields.io/badge/Node-18%2B-brightgreen)

A full-stack MERN (MongoDB/Supabase, Express, React, Node.js) application for exploring India's tourist destinations, planning routes, discovering hotels, and generating AI-powered travel guides.

## 🚀 Features

- **User Authentication** - JWT-based login with Google OAuth integration
- **Map Discovery** - Interactive map with searchable landmarks and destinations
- **Route Finder** - Multi-transport route planning (Train, Bus, Flight, Car, Auto)
- **Hotels & Places** - Browse accommodations and free cultural attractions
- **AI Travel Guide** - Ollama-powered AI guide for destinations
- **Trip Management** - Save and manage travel routes
- **Real-time Validation** - Live health checks and monitoring dashboard
- **Responsive Design** - Mobile-first with Tailwind CSS
- **Custom Cursor** - Branded cursor animations using Framer Motion

## 📋 Tech Stack

### Frontend
- **React 18** with Vite bundler
- **Framer Motion** - Advanced animations
- **Tailwind CSS** - Utility-first styling
- **React Router** - Client-side routing
- **Lucide React** - Icon library

### Backend
- **Node.js + Express** - REST API server
- **Supabase/PostgreSQL** - Database with Row-Level Security
- **JWT Authentication** - Secure session management
- **Ollama** - Local LLM for AI guides

### DevOps & Tools
- **Git** - Version control
- **Vite** - Build tool and dev server
- **Tailwind CSS** - CSS framework

## 🛠️ Installation

### Prerequisites
- Node.js 18+
- npm or pnpm
- Supabase account
- Ollama (for AI features)

### Setup

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/incredible-india.git
cd incredible-india
```

2. **Install dependencies**
```bash
# Client
cd client
npm install

# Server (if separate)
cd ../server
npm install
```

3. **Configure environment variables**
```bash
cp .env.example .env.local
# Edit .env.local with your credentials
```

4. **Start development server**
```bash
# Client (from client directory)
npm run dev

# Server (from server directory, if separate)
npm start
```

5. **Access the application**
```
http://localhost:5173
```

## 📦 Project Structure

```
incredible-india/
├── client/                 # React frontend
│   ├── src/
│   │   ├── pages/         # Page components
│   │   ├── components/    # Reusable components
│   │   ├── utils/         # Utility functions
│   │   ├── services/      # API services
│   │   ├── contexts/      # React contexts
│   │   └── App.jsx
│   ├── public/            # Static assets
│   └── package.json
├── server/                # Express backend
│   ├── routes/            # API routes
│   ├── middleware/        # Express middleware
│   ├── models/            # Database models
│   └── package.json
├── .gitignore
├── README.md              # This file
├── ARCHITECTURE.md        # System design
├── PACKAGE.md             # Module documentation
└── SECURITY.md            # Security guidelines
```

## 🔐 Security

This project follows security best practices:

- **No secrets in version control** - See `.gitignore` and `SECURITY.md`
- **Environment variables** - Sensitive data via `.env.local`
- **Row-Level Security** - PostgreSQL RLS policies in Supabase
- **Input validation** - Zod schemas at API boundaries
- **HTTPS only** - Secure communication
- **CORS restricted** - Configuration in `SECURITY.md`

**⚠️ IMPORTANT**: See `SECURITY.md` before committing code with sensitive data.

## 📖 Documentation

- **[ARCHITECTURE.md](./ARCHITECTURE.md)** - System design and data flow
- **[PACKAGE.md](./PACKAGE.md)** - Module and package descriptions
- **[SECURITY.md](./SECURITY.md)** - Security guidelines and best practices

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests with coverage
npm test -- --coverage

# Run tests in watch mode
npm test -- --watch
```

## 📝 Environment Variables

Create `.env.local` in both `client/` and `server/` directories:

```bash
# .env.local
VITE_API_URL=http://localhost:3000/api
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_anon_key
OLLAMA_API_URL=http://localhost:11434
GOOGLE_CLIENT_ID=your_google_client_id
JWT_SECRET=your_jwt_secret_key
```

## 🚀 Deployment

1. **Build for production**
```bash
npm run build
```

2. **Start production server**
```bash
npm start
```

3. **Environment setup** - Configure production `.env` variables on your host

## 🤝 Contributing

1. Create a feature branch: `git checkout -b feature/my-feature`
2. Commit changes: `git commit -m "feat: add my feature"`
3. Push to remote: `git push origin feature/my-feature`
4. Open a pull request

See [SECURITY.md](./SECURITY.md) before submitting code.

## 📄 License

MIT License - See LICENSE file for details

## 👨‍💻 Author

Your Name / Your Organization

## 📞 Support

For issues and feature requests, open an issue on GitHub.

## 🙏 Acknowledgments

- Supabase for PostgreSQL hosting
- Ollama for local LLM inference
- Framer Motion for animations
- Tailwind CSS for styling
