#!/bin/bash

# India Tour Guide - Quick Start Script
# This script automates the initial setup

echo "🏛️ India Tour Guide - Quick Start Setup"
echo "========================================"
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 16+ first."
    exit 1
fi

echo "✅ Node.js version: $(node --version)"
echo "✅ npm version: $(npm --version)"
echo ""

# Navigate to project directory
cd "$(dirname "$0")" || exit 1

echo "📦 Installing dependencies..."
npm run install:all

if [ $? -ne 0 ]; then
    echo "❌ Dependency installation failed!"
    exit 1
fi

echo "✅ Dependencies installed successfully!"
echo ""

# Check if .env files exist
if [ ! -f "server/.env" ]; then
    echo "⚠️  server/.env not found!"
    echo "Please create server/.env with your Supabase credentials"
    echo "Refer to README_SETUP.md for instructions"
fi

if [ ! -f "client/.env" ]; then
    echo "⚠️  client/.env not found!"
    echo "Please create client/.env with your API configuration"
    echo "Refer to README_SETUP.md for instructions"
fi

echo ""
echo "🚀 Setup Complete!"
echo ""
echo "Next steps:"
echo "1. Ensure Ollama is running: ollama serve"
echo "2. Run the development servers:"
echo "   npm run dev"
echo ""
echo "3. Open http://localhost:5173 in your browser"
echo ""
echo "For more details, see BUILD_SUMMARY.md and README_SETUP.md"
