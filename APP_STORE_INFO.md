# App Store & Developer Account Information

## ⚠️ Important: Who Pays the Developer Fee?

### Short Answer
**NO, you don't have to pay anything!** The **original app owner** (Gammon Technical Products or whoever owns the existing iOS/Android apps) pays the developer fees, not you as the developer.

## How App Store Publishing Works

### Apple App Store (iOS)

**Developer Account Requirement:**
- **Cost**: $99/year USD
- **Who Pays**: The company/person who **owns** the app (Gammon Technical Products)
- **Who Needs It**: Whoever will **publish** the app to the App Store

**Your Situation:**
1. ✅ Gammon Technical already has an iOS app on the store
2. ✅ They already have an Apple Developer Account ($99/year)
3. ✅ They're already paying this fee
4. ✅ **You just build the app and give it to them** - they publish it using their account

**How It Works:**
```
You (Developer)          Gammon Technical (Owner)
      │                            │
      │  1. Build the app         │
      │─────────────────────────→ │
      │                            │
      │                            │  2. Publish with their
      │                            │     Apple Developer Account
      │                            │     (they pay $99/year)
      │                            │─────────────────────→ App Store
```

### Google Play Store (Android)

**Developer Account Requirement:**
- **Cost**: $25 USD (one-time, not yearly!)
- **Who Pays**: The company/person who **owns** the app
- **Who Needs It**: Whoever will **publish** the app to Google Play

**Your Situation:**
1. ✅ Gammon Technical already has an Android app on Google Play
2. ✅ They already paid the $25 one-time fee
3. ✅ **You just build the app and give it to them** - they publish it

## What You Actually Do

### As the Developer (You)
1. ✅ Build the React Native app (DONE!)
2. ✅ Test it on simulators/devices
3. ✅ Build the production `.ipa` file (iOS) or `.aab` file (Android)
4. ✅ Give the files to Gammon Technical
5. ✅ **That's it!** You don't pay anything.

### What Gammon Technical Does (Owner)
1. They log into their Apple Developer Account (they pay $99/year)
2. They upload your `.ipa` file to App Store Connect
3. They submit for review
4. Apple approves and publishes
5. Same process for Android with their Google Play account

## Building the App for Gammon Technical

### Option 1: Use Their Expo Account (Recommended)

**Setup:**
```bash
# Install Expo Application Services CLI
npm install -g eas-cli

# Gammon Technical creates an Expo account at expo.dev (FREE)
# They add you as a collaborator

# You build for them
eas build --platform ios     # Creates .ipa for iOS
eas build --platform android # Creates .aab for Android
```

**Advantages:**
- ✅ Free to use
- ✅ Builds in the cloud
- ✅ They own the builds
- ✅ You don't need a Mac or Android Studio
- ✅ Automated signing

### Option 2: Manual Build (Traditional Way)

**For iOS:**
```bash
# They give you their signing certificates
# You build locally with Xcode
# Creates .ipa file
# You send them the .ipa file
```

**For Android:**
```bash
# You build locally with Android Studio
# Creates .aab file
# You send them the .aab file
```

## Updating the Existing App

Since Gammon Technical already has the app published, this is an **UPDATE**, not a new app:

### Same Bundle Identifier
We used the same bundle IDs:
- **iOS**: `com.gtpgammoncalc.app`
- **Android**: `com.gtpgammoncalc.app`

This means:
✅ It replaces the existing app
✅ Existing users get an update
✅ Reviews and ratings are preserved
✅ No new App Store fees
✅ Same download URL

## Cost Summary

| Item | Who Pays | How Much | When |
|------|----------|----------|------|
| React Native Development | Free | $0 | N/A |
| Expo (build service) | Free | $0 | N/A |
| Apple Developer Account | Gammon Technical | $99/year | They already have this |
| Google Play Account | Gammon Technical | $25 one-time | They already have this |
| **Your Cost** | **You** | **$0** | **Never** |

## What Gammon Technical Needs to Know

### For iOS Update
1. They log into https://developer.apple.com with their account
2. Download the `.ipa` file you provide
3. Upload to App Store Connect
4. Fill in update notes (what's new)
5. Submit for review (~1-7 days)
6. Apple approves → users get update

### For Android Update
1. They log into https://play.google.com/console with their account
2. Upload the `.aab` file you provide
3. Fill in update notes
4. Submit for review (~few hours to 1-2 days)
5. Google approves → users get update

## Free vs Paid Expo Plans

### Expo Free Tier (What You Have)
✅ Unlimited builds
✅ Cloud builds
✅ Over-the-air updates
✅ Everything you need

### Expo Paid Tiers
Only needed for:
- Large teams with many collaborators
- Priority support
- Advanced CI/CD features

**For this app: FREE TIER IS PERFECT** ✅

## Summary

### Questions & Answers

**Q: Do I have to pay Apple's $99/year fee?**
**A:** NO! Gammon Technical pays this. They already have an Apple Developer Account.

**Q: Do I have to pay Google's $25 fee?**
**A:** NO! Gammon Technical pays this. They already have a Google Play account.

**Q: Can I still build the app without paying?**
**A:** YES! You build it, they publish it with their accounts.

**Q: Will this cost me anything?**
**A:** NO! React Native, Expo, Node.js, and all the tools are FREE.

**Q: Is this a new app or an update?**
**A:** It's an UPDATE to their existing app (same bundle IDs).

**Q: Who owns the app?**
**A:** Gammon Technical Products owns it (they publish it, they pay the fees).

**Q: What's my role?**
**A:** You're the developer. You build it and hand it to them. They publish it.

## Next Steps

1. ✅ Finish testing the app (we'll do this now!)
2. ✅ Get approval from Gammon Technical
3. ✅ They create a free Expo account at expo.dev
4. ✅ They add you as a collaborator
5. ✅ You run `eas build --platform ios` and `eas build --platform android`
6. ✅ Expo emails them the build files
7. ✅ They upload to App Store / Play Store with their accounts
8. ✅ Done! Users get the update.

**You pay: $0** 🎉

