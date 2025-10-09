# How to Run the App on iOS Simulator

The Expo development server is already running in the background!

## Method 1: Simple Web Browser (EASIEST!)

Open a new Terminal window and run:

```bash
cd /Users/admin/Developer/GammonToolboxApp
npx expo start --web
```

This will open the app in your web browser instantly - no simulator needed!

## Method 2: iOS Simulator (Better for testing)

The Metro bundler is already running. Now you need to:

### Option A: Use the Expo CLI directly

In a **NEW** Terminal window, run:

```bash
cd /Users/admin/Developer/GammonToolboxApp
npx expo start
```

Then press `i` to open iOS Simulator.

### Option B: Kill existing processes and restart fresh

If you're having connection issues:

```bash
# Kill all Expo/Metro processes
killall node
pkill -f expo
pkill -f metro

# Start fresh
cd /Users/admin/Developer/GammonToolboxApp
npm start
```

Then press `i` for iOS Simulator.

## Method 3: Direct iOS Launch

```bash
cd /Users/admin/Developer/GammonToolboxApp
npx expo run:ios
```

This compiles a native build (slower first time, but more reliable).

## Troubleshooting

### "Could not connect to server"

This happens when the Expo Go app tries to connect to an old server. 

**Fix:**
1. Close the simulator (Cmd+Q on the Simulator app)
2. Kill all node processes: `killall node`
3. Restart: `npm start`
4. Press `i` for iOS

### Port Already in Use

```bash
lsof -ti:8081 | xargs kill
npm start
```

### Clear Cache

```bash
npx expo start -c
```

## What You Should See

When it works, you'll see:

1. Terminal shows QR code and menu
2. Press `i` → iOS Simulator opens
3. App loads with blue header "API Gravity Calculator"
4. Form fields for fuel type, temperature, API gravity, etc.

## Current Status

✅ Metro bundler is running on port 8081
✅ iPhone 17 Pro simulator is booted
✅ App is installed on simulator

**Next:** Open a fresh Terminal and run `cd /Users/admin/Developer/GammonToolboxApp && npm start`, then press `i`

