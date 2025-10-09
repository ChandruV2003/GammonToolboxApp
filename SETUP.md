# Setup Guide for GTP API Gravity Calculator

## What's Installed

The following tools have been installed on your system for React Native development:

### Core Tools
- ✅ **Node.js v24.9.0** - JavaScript runtime
- ✅ **npm v11.6.0** - Package manager
- ✅ **npx** - Package runner
- ✅ **CocoaPods v1.16.2** - iOS dependency manager
- ✅ **Homebrew** - macOS package manager

### React Native Dependencies
- ✅ **Expo ~54.0.12** - React Native framework
- ✅ **React 19.1.0** - UI library
- ✅ **React Native 0.81.4** - Mobile framework
- ✅ **@react-native-picker/picker** - Dropdown component

## Quick Start

1. **Start the development server:**
   ```bash
   cd /Users/admin/Developer/GammonToolboxApp
   npm start
   ```

2. **Run on iOS (requires Xcode):**
   ```bash
   npm run ios
   ```

3. **Run on Android (requires Android Studio):**
   ```bash
   npm run android
   ```

4. **Run in web browser:**
   ```bash
   npm run web
   ```

## Testing on Physical Devices

### Option 1: Expo Go App (Easiest)

1. Install **Expo Go** from App Store (iOS) or Play Store (Android)
2. Run `npm start` in your project
3. Scan the QR code with:
   - **iOS**: Camera app
   - **Android**: Expo Go app

### Option 2: Build Native Apps

For production builds or testing without Expo Go:

```bash
# Install Expo Application Services CLI
npm install -g eas-cli

# Login to Expo account (create one at expo.dev if needed)
eas login

# Configure the project
eas build:configure

# Build for iOS
eas build --platform ios

# Build for Android
eas build --platform android
```

## Development Tools

### Recommended

- **Visual Studio Code** - Code editor with React Native extensions
- **Xcode** (macOS only) - For iOS development
- **Android Studio** - For Android development

### Optional

- **React Native Debugger** - Advanced debugging
- **Reactotron** - React Native inspector

## Troubleshooting

### iOS Build Issues

If you see `pod install` errors:
```bash
cd ios
pod install
cd ..
```

### Metro Bundler Cache Issues

If you see stale code or weird errors:
```bash
npm start -- --reset-cache
```

### Port Already in Use

If port 8081 is busy:
```bash
lsof -ti:8081 | xargs kill
npm start
```

### Android Emulator Not Found

1. Open Android Studio
2. Tools → Device Manager
3. Create a new Virtual Device
4. Start the emulator before running `npm run android`

## Next Steps

1. **Customize the app** - Edit `App.js` to modify functionality
2. **Update assets** - Replace icons in `assets/` folder
3. **Test calculations** - Verify API gravity and weight calculations
4. **Build for production** - Use EAS Build for distribution
5. **Publish updates** - Use `expo publish` for over-the-air updates

## Project Structure

```
GammonToolboxApp/
├── App.js              # Main application code (all UI and logic here)
├── app.json            # Expo/React Native configuration
├── package.json        # npm dependencies and scripts
├── assets/             # Icons, splash screens, images
├── node_modules/       # Installed packages (don't edit)
└── README.md           # Project documentation
```

## Support

For Expo/React Native help:
- Expo Docs: https://docs.expo.dev
- React Native Docs: https://reactnavigation.org

For Gammon Technical support:
- Email: info@gammontech.com
- Phone: 732-223-4600
- Web: www.gammontech.com

