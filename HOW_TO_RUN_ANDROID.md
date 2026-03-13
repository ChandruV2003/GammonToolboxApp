# How to Run the App on Android

Complete guide for running the Gammon Toolbox App on Android emulator or device.

## Method 1: Expo Go App (EASIEST - No Emulator Needed!)

**Best for quick testing on your phone:**

1. **Download Expo Go**:
   - Android: [Google Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent)
   - Or search "Expo Go" in Play Store

2. **Start Development Server**:
   ```bash
   cd /Users/chandruv/Developer/GammonToolboxApp
   npm start
   ```

3. **Scan QR Code**:
   - Open Expo Go app on your Android phone
   - Tap "Scan QR code"
   - Point camera at the QR code in terminal
   - App loads instantly!

**Note**: Make sure your phone and computer are on the same WiFi network.

## Method 2: Android Emulator (Better for Development)

### Step 1: Install Android Studio

1. Download from: https://developer.android.com/studio
2. Install Android Studio
3. Open Android Studio
4. Go to **Tools → SDK Manager**
5. Install:
   - Android SDK Platform (latest)
   - Android SDK Build-Tools
   - Android Emulator

### Step 2: Create Android Virtual Device (AVD)

1. Open Android Studio
2. Go to **Tools → Device Manager** (or **AVD Manager**)
3. Click **Create Device**
4. Choose a device (e.g., Pixel 6, Pixel 7)
5. Select a system image (e.g., Android 13, Android 14)
6. Click **Finish**

### Step 3: Start the Emulator

**Option A: From Android Studio**
- Open Android Studio
- Go to **Tools → Device Manager**
- Click the ▶️ play button next to your AVD

**Option B: From Command Line**
```bash
# List available emulators
emulator -list-avds

# Start an emulator (replace with your AVD name)
emulator -avd Pixel_6_API_33 &
```

### Step 4: Run the App

```bash
cd /Users/chandruv/Developer/GammonToolboxApp
npm run android
```

This will:
1. Build the Android app
2. Install it on the emulator
3. Launch the app automatically

## Method 3: Physical Android Device

### Step 1: Enable Developer Options

1. Go to **Settings → About Phone**
2. Tap **Build Number** 7 times
3. Go back to **Settings**
4. You'll see **Developer Options** appear

### Step 2: Enable USB Debugging

1. Go to **Settings → Developer Options**
2. Enable **USB Debugging**
3. Connect phone to computer via USB
4. Accept the "Allow USB debugging" prompt on phone

### Step 3: Verify Device Connection

```bash
cd /Users/chandruv/Developer/GammonToolboxApp
$HOME/Developer/android-sdk/platform-tools/adb devices
```

You should see your device listed.

### Step 4: Run the App

```bash
npm run android
```

## Method 4: Development Server (Flexible)

Start the Expo development server and choose Android:

```bash
cd /Users/chandruv/Developer/GammonToolboxApp
npm start
```

Then:
- Press `a` for Android emulator
- Scan QR code with Expo Go app on phone
- Press `w` for web browser

## Troubleshooting

### "No Android connected device found"

**Solution 1: Check ADB**
```bash
# Check if devices are connected
$HOME/Developer/android-sdk/platform-tools/adb devices

# If empty, restart ADB server
$HOME/Developer/android-sdk/platform-tools/adb kill-server
$HOME/Developer/android-sdk/platform-tools/adb start-server
```

**Solution 2: Start Emulator First**
- Open Android Studio
- Start an emulator from Device Manager
- Wait for it to fully boot
- Then run `npm run android`

**Solution 3: Use Expo Go Instead**
- Skip emulator entirely
- Use `npm start` and scan QR code with Expo Go app

### "Command 'emulator' not found"

Add Android SDK to your PATH:

```bash
# Add to ~/.zshrc or ~/.bash_profile
export ANDROID_HOME=$HOME/Developer/android-sdk
export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/platform-tools
export PATH=$PATH:$ANDROID_HOME/tools
export PATH=$PATH:$ANDROID_HOME/tools/bin

# Then reload
source ~/.zshrc  # or source ~/.bash_profile
```

### Build Errors

**Clean and Rebuild:**
```bash
cd android
./gradlew clean
cd ..
npm run android
```

**Clear Expo Cache:**
```bash
npx expo start -c
```

### Emulator is Slow

1. **Enable Hardware Acceleration**:
   - In AVD Manager, click Edit (pencil icon)
   - Show Advanced Settings
   - Graphics: Hardware - GLES 2.0

2. **Allocate More RAM**:
   - In AVD settings, increase RAM allocation
   - Recommended: 2-4GB

3. **Use x86/x86_64 Images**:
   - Create AVD with x86_64 system image (faster than ARM)

### Port Already in Use

```bash
# Kill process on port 8081
lsof -ti:8081 | xargs kill

# Or kill all node processes
killall node

# Restart
npm start
```

## What You Should See

When it works:

1. **Terminal shows**:
   - "Building Android app..."
   - "Installing app on device..."
   - "Launching app..."

2. **Emulator/Device shows**:
   - GT logo splash screen (blue background)
   - App loads with "API Gravity Calculator" header
   - Step 1: API Gravity Correction form
   - Step 2: Weight from Volume (disabled until Step 1 done)

3. **Features to Test**:
   - Select fuel type (Gasoline, Diesel, Jet A/Kerosene)
   - Enter temperature and API gravity
   - Click "Calculate API" → Button turns green ✓
   - Enter volume → Click "Calculate Weight" → Button turns green ✓
   - Change any input → Button resets to blue

## Quick Reference

```bash
# Start development server
npm start
# Then press 'a' for Android

# Build and run on Android
npm run android

# Check connected devices
$HOME/Developer/android-sdk/platform-tools/adb devices

# List available emulators
emulator -list-avds

# Start specific emulator
emulator -avd <AVD_NAME> &

# Clear cache
npx expo start -c

# Clean Android build
cd android && ./gradlew clean && cd ..
```

## Android Configuration

The app is configured with:
- **Package Name**: `com.gtpgammoncalc.app`
- **Version Code**: 2
- **Min SDK**: 21 (Android 5.0)
- **Target SDK**: Latest
- **Icon**: Modern GT logo on blue background
- **Splash Screen**: GT logo with app title

## Current Status

✅ Android SDK installed at `/Users/chandruv/Developer/android-sdk`
✅ Android build configuration ready
✅ App icon and splash screen configured
✅ All dependencies installed

**Next Steps:**
1. Create an Android emulator in Android Studio, OR
2. Connect a physical Android device, OR
3. Use Expo Go app on your phone (easiest!)

## Support

If you encounter issues:
1. Check that Android SDK is properly installed
2. Verify emulator/device is connected: `adb devices`
3. Try using Expo Go app instead of native build
4. Check Android Studio logs for detailed errors

---

**Pro Tip**: For fastest testing, use Expo Go app on your phone - no emulator setup needed!


