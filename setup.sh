#!/bin/bash

# GTP API Gravity Calculator - Setup Script
# Run this script on any computer to set up the project

echo "🚀 Setting up GTP API Gravity Calculator..."
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed!"
    echo "Please install Node.js from https://nodejs.org/"
    echo "Recommended version: v18 or higher"
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed!"
    echo "Please install npm (usually comes with Node.js)"
    exit 1
fi

echo "✅ Node.js version: $(node --version)"
echo "✅ npm version: $(npm --version)"
echo ""

# Install dependencies
echo "📦 Installing dependencies..."
npm install

if [ $? -eq 0 ]; then
    echo "✅ Dependencies installed successfully!"
else
    echo "❌ Failed to install dependencies"
    exit 1
fi

echo ""
echo "🎉 Setup complete! You can now run:"
echo ""
echo "  npm start     - Start development server"
echo "  npm run web   - Open in web browser"
echo "  npm run ios   - Run on iOS simulator (macOS only)"
echo "  npm run android - Run on Android emulator"
echo ""
echo "📚 For more information, see:"
echo "  README.md - Project overview"
echo "  SETUP.md - Detailed setup guide"
echo "  DEPLOYMENT_GUIDE.md - Deployment instructions"
echo ""
echo "🌐 To start the app: npm start"

