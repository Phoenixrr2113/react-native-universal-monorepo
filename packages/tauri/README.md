# Tauri Desktop Application

Modern desktop application built with **Tauri 2.0** and **React 19**.

## About

This package replaces the previous Electron implementation with Tauri, providing:

- **Smaller bundle sizes** - Tauri uses the system's WebView instead of bundling Chromium
- **Better performance** - Rust backend for native performance
- **Enhanced security** - Strong sandboxing and permission model
- **Cross-platform** - Supports Windows, macOS, and Linux

## Prerequisites

- Rust 1.70+ and Cargo (installed)
- Node.js 22+ (via .nvmrc)
- Yarn 4.11.0
- Platform-specific dependencies:
  - **macOS**: Xcode Command Line Tools
  - **Windows**: Microsoft C++ Build Tools
  - **Linux**: webkit2gtk, development packages

## Development

```bash
# Start development server
yarn dev

# Build TypeScript
yarn build

# Type check
yarn typecheck

# Lint
yarn lint
yarn lint:fix
```

## Building

```bash
# Build for current platform
yarn build

# The built app will be in src-tauri/target/release/bundle/
```

## Project Structure

```
packages/tauri/
├── src/                    # React frontend source
│   ├── main.tsx           # App entry point (uses @my-app/app)
│   └── styles.css         # Global styles
├── src-tauri/             # Rust backend
│   ├── src/main.rs        # Tauri main process
│   ├── tauri.conf.json    # Tauri configuration
│   ├── Cargo.toml         # Rust dependencies
│   └── icons/             # App icons (generated)
├── index.html             # HTML entry point
├── vite.config.ts         # Vite bundler config
└── package.json
```

## Architecture

The Tauri app uses the shared **@my-app/app** package for the UI, ensuring consistency across all platforms (mobile, web, desktop). The Rust backend provides:

- Native window management
- System integration (file system, shell, etc.)
- IPC commands for frontend-backend communication
- Security and sandboxing

## Tauri Commands

Example of calling Rust from JavaScript:

```typescript
import { invoke } from '@tauri-apps/api/core';

// Call the 'greet' command defined in src-tauri/src/main.rs
const greeting = await invoke('greet', { name: 'User' });
```

## Configuration

Main configuration in `src-tauri/tauri.conf.json`:

- **Window settings**: Size, resizable, fullscreen, etc.
- **Bundle settings**: App name, identifier, icons
- **Security**: CSP, allowlist, permissions
- **Build**: Frontend dist path, dev server URL

## Icons

Icons are generated from `icon.png` using:

```bash
npx @tauri-apps/cli icon path/to/icon.png -o src-tauri/icons
```

Minimum recommended size: 1024x1024 PNG

## Learn More

- [Tauri Documentation](https://tauri.app/)
- [Tauri 2.0 Migration Guide](https://tauri.app/v2/guides/)
- [React 19 Documentation](https://react.dev/)
