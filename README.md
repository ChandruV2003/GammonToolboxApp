# GTP API Gravity Calculator

A cross-platform mobile application for calculating API gravity corrections and fuel weight conversions, built with React Native and Expo.

## Features

- **API Gravity Correction**: Calculate corrected API gravity based on temperature and fuel type
- **Weight Calculator**: Convert fuel volume to weight (supports Gallons/Litres and lbs/kgs)
- **Cross-Platform**: Works on iOS, Android, and Web
- **Modern UI**: Clean, professional interface matching the original Android design

## Supported Fuel Types

- Gasoline
- Diesel
- Jet A / Kerosene

## Installation

### Prerequisites

- Node.js (v24.9.0 or later)
- npm (v11.6.0 or later)
- For iOS development: Xcode (macOS only)
- For Android development: Android Studio

### Install Dependencies

```bash
cd GammonToolboxApp
npm install
```

## Running the App

### iOS Simulator (macOS only)

```bash
npm run ios
```

### Android Emulator

```bash
npm run android
```

### Web Browser

```bash
npm run web
```

### Development Server

```bash
npm start
```

Then:
- Press `i` for iOS simulator
- Press `a` for Android emulator
- Press `w` for web browser
- Scan QR code with Expo Go app on your physical device

## Building for Production

### iOS

```bash
npx eas build --platform ios
```

### Android

```bash
npx eas build --platform android
```

### Web

```bash
npx expo export:web
```

## Project Structure

```
GammonToolboxApp/
├── App.js              # Main application component
├── app.json            # Expo configuration
├── package.json        # Dependencies
├── assets/             # Images and icons
└── README.md          # This file
```

## Calculation Logic

### API Gravity Correction

The app uses the ASTM D1250 petroleum measurement tables algorithm:

1. Converts input temperature to Fahrenheit delta from 60°F
2. Calculates initial density (Rho_Initial) from API gravity
3. Iteratively calculates volume correction factor (VCF) using fuel-specific constants
4. Converges to corrected API gravity (tolerance < 0.05)

### Weight from Volume

Converts volume to weight using the calculated density:

- **Gallons to Pounds**: Uses US gallon (264.172 gallons/m³) and lb conversion
- **Litres to Kilograms**: Direct metric conversion

## Version History

- **v2.0.0** - React Native rewrite with cross-platform support
- **v1.0** - Original iOS/Android native apps

## Contact

**Gammon Technical Products**  
2300 Highway 34  
Manasquan, NJ 08736  

Phone: 732-223-4600  
Email: info@gammontech.com  
Web: www.gammontech.com

## License

Copyright © 2025 Gammon Technical Products. All rights reserved.


