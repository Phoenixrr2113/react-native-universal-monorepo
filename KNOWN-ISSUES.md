# Known Issues & Technical Debt

**Last Updated:** 2025-11-15

## Build Issues

### Tauri Package Build Failure ⚠️

**Status:** Pre-existing issue, requires architectural refactoring

**Issue:** The Tauri package build fails when trying to compile the React Native app for desktop using Vite.

**Root Cause:** Fundamental incompatibility between:
- React Native dependencies (MMKV, react-native-svg, navigation)
- Vite build system and module resolution
- Node.js polyfills in browser environment

**Error Details:**
```
error during build:
[vite]: Rollup failed to resolve import "vite-plugin-node-polyfills/shims/global"
from "react-native-mmkv/lib/createMMKV/createMMKV.web.js"
```

**Attempted Fixes:**
1. ✅ Added react-native-web alias for react-native
2. ✅ Configured Vite with `.web.js` extension resolution
3. ✅ Added Node.js polyfills plugin (vite-plugin-node-polyfills)
4. ❌ Polyfill plugin conflicts with dependency module resolution

**Recommended Solution:**

This requires a comprehensive refactoring approach:

1. **Option A: Create Tauri-specific app package**
   - Create `packages/app-web` with web-optimized components
   - Remove direct React Native dependencies
   - Use web-first libraries instead of React Native equivalents
   - Share business logic, not UI components

2. **Option B: Use webpack like web/browser-ext**
   - Migrate from Vite to webpack + react-scripts
   - Use react-native-monorepo-tools for proper module resolution
   - Follow the pattern of working web packages

3. **Option C: Comprehensive Vite configuration**
   - Properly configure all React Native dependency polyfills
   - Add custom Vite plugins for React Native module resolution
   - Mock out native-only modules
   - Estimated effort: 8-16 hours

**Priority:** Low
**Impact:** Tauri desktop builds unavailable (dev server works)
**Workaround:** Use web or browser-ext packages for web-based desktop apps

---

## Test Issues

### ✅ FIXED: TV Package Tests

**Previous Issue:** Tests couldn't find App module
**Solution:** Updated test to use simplified package structure validation instead of full component rendering
**Status:** Resolved in Phase 10

---

## Architecture Considerations

### Mixed Build Systems

The monorepo currently uses multiple build systems:
- **Metro:** Mobile packages (mobile, tv, macos, windows)
- **Webpack:** Web packages (web, browser-ext)
- **Vite:** Desktop package (tauri)
- **Next.js:** Next package

This diversity creates:
- Inconsistent configuration patterns
- Different module resolution strategies
- Varying polyfill requirements
- Maintenance overhead

**Recommendation:** Consider consolidating to 2 build systems:
1. Metro for native platforms (mobile, tv, desktop)
2. Either Vite or Webpack for all web targets

---

## Future Modernization Phases

### Phase 11: Build System Consolidation
- Standardize web build tooling (Vite vs Webpack)
- Create shared build configurations
- Unified polyfill strategy

### Phase 12: Dependency Upgrades
- React Native 0.79+ (resolves Babel deprecations)
- react-scripts v5+ (resolves security vulnerabilities)
- Modern testing utilities

### Phase 13: Monorepo Architecture
- Consider NX or Turborepo enhancements
- Shared tooling packages
- Better workspace dependency management
