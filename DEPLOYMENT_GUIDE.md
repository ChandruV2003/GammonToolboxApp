# Deployment Guide - GTP API Gravity Calculator

## 🚀 Quick Start for Any Computer

### Prerequisites
- **Node.js** (v18+ recommended)
- **Git** (for cloning)
- **npm** (comes with Node.js)

### Option 1: Clone from Git Repository

```bash
# Clone the repository
git clone <repository-url>
cd GammonToolboxApp

# Install dependencies
npm install

# Start the app
npm start
```

### Option 2: Copy Project Files

```bash
# Copy the entire GammonToolboxApp folder to any computer
# Then run:
cd /path/to/GammonToolboxApp
npm install
npm start
```

## 📱 Running the App

### Web Browser (Easiest - Works Everywhere)
```bash
npm start
# Press 'w' when the menu appears
# Opens in web browser instantly
```

### iOS Simulator (macOS only)
```bash
npm run ios
# Requires Xcode installed
```

### Android Emulator (Windows/macOS/Linux)
```bash
npm run android
# Requires Android Studio installed
```

### Physical Device (Any OS)
```bash
npm start
# Scan QR code with Expo Go app
# Download from App Store/Play Store
```

## 🔧 Installation Requirements by Platform

### All Platforms
```bash
# Install Node.js from nodejs.org
# Verify installation:
node --version  # Should be v18+
npm --version   # Should be v8+
```

### macOS (for iOS development)
```bash
# Install Xcode from App Store (free)
# Install CocoaPods:
brew install cocoapods

# Or if no Homebrew:
sudo gem install cocoapods
```

### Windows/Linux (for Android development)
```bash
# Install Android Studio from developer.android.com
# Set up Android SDK and emulator
# Add ANDROID_HOME to environment variables
```

## 📦 Project Structure

```
GammonToolboxApp/
├── App.js                    # Main application (UI + Logic)
├── app.json                  # Expo configuration
├── package.json              # Dependencies
├── .gitignore               # Git ignore rules
├── README.md                # Project documentation
├── SETUP.md                 # Developer setup guide
├── DEPLOYMENT_GUIDE.md      # This file
├── APP_STORE_INFO.md        # App Store publishing info
├── PROJECT_SUMMARY.md       # Technical overview
├── assets/                  # Icons and images
│   ├── icon.png
│   ├── splash-icon.png
│   ├── adaptive-icon.png
│   └── favicon.png
└── node_modules/            # Installed packages (auto-generated)
```

## 🌐 Web Deployment

### Static Website Hosting
```bash
# Build for web
npx expo export:web

# Upload the 'dist' folder to any web host:
# - Netlify
# - Vercel
# - GitHub Pages
# - AWS S3
# - Any web server
```

### URLs for Testing
- **Local**: http://localhost:8081
- **Network**: http://[your-ip]:8081 (accessible from other devices on same WiFi)

## 📱 Mobile App Deployment

### Development Testing
```bash
# Install Expo Go on your phone
# Run: npm start
# Scan QR code with Expo Go
# App opens on your phone instantly
```

### Production Builds
```bash
# Install EAS CLI
npm install -g eas-cli

# Login to Expo account
eas login

# Build for iOS
eas build --platform ios

# Build for Android
eas build --platform android
```

## 🔄 Sharing the Project

### Method 1: Git Repository (Recommended)
```bash
# Create repository on GitHub/GitLab/Bitbucket
git remote add origin <repository-url>
git push -u origin main

# Others can clone with:
git clone <repository-url>
```

### Method 2: Zip File
```bash
# Create zip (exclude node_modules)
zip -r GammonToolboxApp.zip . -x "node_modules/*" "*.log" ".expo/*"
```

### Method 3: Cloud Storage
- Upload entire folder to Google Drive, Dropbox, etc.
- Others download and run `npm install`

## 🛠️ Troubleshooting

### "Command not found: npm"
- Install Node.js from nodejs.org
- Restart terminal after installation

### "Module not found" errors
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### "Port 8081 already in use"
```bash
# Kill process using port 8081
lsof -ti:8081 | xargs kill
npm start
```

### Metro bundler issues
```bash
# Clear Metro cache
npx expo start -c
```

### iOS build issues
```bash
# Reinstall CocoaPods
cd ios
pod install
cd ..
npm run ios
```

### Android build issues
```bash
# Clean and rebuild
cd android
./gradlew clean
cd ..
npm run android
```

## ✅ Verification Checklist

After setting up on a new computer:

- [ ] Node.js installed (`node --version`)
- [ ] npm installed (`npm --version`)
- [ ] Project cloned/copied
- [ ] Dependencies installed (`npm install`)
- [ ] Web version works (`npm start` → press 'w')
- [ ] No console errors in browser
- [ ] Calculator functions work (API correction, weight calculation)

## 📞 Support

**Technical Issues:**
- Check `README.md` for detailed setup
- Check `SETUP.md` for developer setup
- Check `APP_STORE_INFO.md` for publishing

**Business Contact:**
- Gammon Technical Products
- Phone: 732-223-4600
- Email: info@gammontech.com
- Web: www.gammontech.com

## 🎯 Success Criteria

The app is successfully deployed when:
- ✅ Runs in web browser without errors
- ✅ API gravity calculation works correctly
- ✅ Weight calculation works correctly
- ✅ UI displays properly with blue theme
- ✅ Contact buttons work (website/email)
- ✅ No console errors or warnings

**Status: READY FOR DEPLOYMENT** 🚀

