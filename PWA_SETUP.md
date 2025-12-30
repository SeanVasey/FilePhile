# FilePhile PWA Setup

## Overview
FilePhile is now configured as a fully functional Progressive Web App (PWA) with iOS installation support.

## What Was Done

### 1. Created PWA Manifest (`manifest.json`)
- Proper app metadata (name, description, theme colors)
- Icon references at multiple sizes (180x180, 192x192, 512x512)
- Standalone display mode for app-like experience
- Flexible orientation (adapts to device)

### 2. Generated PWA Icons
Created optimized PNG icons from the FilePhile logo SVG:
- `apple-touch-icon.png` (180x180) - For iOS home screen
- `icon-192.png` (192x192) - For Android and general PWA use
- `icon-512.png` (512x512) - For high-resolution displays and splash screens

### 3. Implemented Service Worker (`sw.js`)
- Caches essential app files for offline access
- Provides cache-first strategy with network fallback
- Enables app installation and offline functionality
- Auto-updates when new versions are deployed

### 4. Updated HTML
- Replaced inline data URI icons with proper file references
- Added service worker registration
- Maintained all iOS-specific meta tags:
  - `apple-mobile-web-app-capable`
  - `apple-mobile-web-app-status-bar-style`
  - `apple-mobile-web-app-title`

## iOS Installation Instructions

### For iPhone/iPad Users:

1. **Open in Safari** (required for iOS PWA installation)
   - Navigate to your FilePhile URL

2. **Tap the Share button** (square with arrow pointing up)
   - Located at the bottom of Safari (iPhone) or top (iPad)

3. **Scroll down and tap "Add to Home Screen"**
   - You'll see the FilePhile icon and name

4. **Tap "Add" in the top right**
   - The app will be added to your home screen

5. **Launch from Home Screen**
   - Tap the FilePhile icon
   - App opens in standalone mode (no browser UI)
   - Works offline after first load

## Features

### ✅ Installable
- Add to iOS home screen
- Add to Android home screen
- Install on desktop browsers (Chrome, Edge, etc.)

### ✅ Offline Support
- Works without internet after first load
- All core functionality available offline
- Files can be created and downloaded offline

### ✅ App-Like Experience
- No browser UI when launched from home screen
- Custom splash screen with app icon
- Matches system theme (dark/light)

## Technical Details

### PWA Requirements Met:
- ✅ Web app manifest
- ✅ Service worker registered
- ✅ HTTPS (required for production)
- ✅ Multiple icon sizes
- ✅ Responsive design
- ✅ iOS-specific meta tags
- ✅ Viewport meta tag with viewport-fit=cover

### Icon Specifications:
All icons follow PWA and iOS best practices:
- 180x180: iOS home screen (required)
- 192x192: Android, Chrome, general PWA
- 512x512: High-res displays, splash screens

### Service Worker Strategy:
- **Cache-first** for all requests with network fallback
- Serves cached content immediately when available
- Falls back to network if not in cache, then caches the response
- Automatic cache cleanup on version updates

## Development

### Regenerating Icons
If you need to update the icons:

```bash
# Update icon.svg with your new design
# Then run:
npm install sharp
node generate-icons.js
```

### Testing PWA Locally
1. Serve over HTTPS (required for service workers)
2. Open browser DevTools > Application tab
3. Check "Manifest" and "Service Workers" sections
4. Use Lighthouse to audit PWA score

### Browser Support
- **iOS Safari**: iOS 11.3+ (full support)
- **Chrome/Edge**: Full support
- **Firefox**: Full support
- **Samsung Internet**: Full support

## Troubleshooting

### Icon not showing on iOS
- Ensure `apple-touch-icon.png` is accessible
- Check file is exactly 180x180 pixels
- Clear Safari cache and re-add to home screen

### Service Worker not registering
- Must be served over HTTPS (or localhost)
- Check browser console for errors
- Verify `sw.js` is in root directory

### App not installing
- Check all PWA requirements are met using Lighthouse
- Verify manifest.json is valid JSON
- Ensure icons are accessible and correct sizes

## Production Checklist

Before deploying to production:

- [ ] Serve site over HTTPS
- [ ] Test installation on iOS Safari
- [ ] Test installation on Chrome/Android
- [ ] Verify offline functionality
- [ ] Test icon display on home screen
- [ ] Run Lighthouse PWA audit (aim for 100%)
- [ ] Test on multiple devices and browsers

## Resources

- [Web.dev PWA Guide](https://web.dev/progressive-web-apps/)
- [iOS PWA Guide](https://developer.apple.com/library/archive/documentation/AppleApplications/Reference/SafariWebContent/ConfiguringWebApplications/ConfiguringWebApplications.html)
- [MDN Service Worker API](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API)

---

**FilePhile v1.0** - Now available as a Progressive Web App! 📱
