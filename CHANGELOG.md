# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Comprehensive CI/CD pipeline with GitHub Actions
  - Automated testing, linting, and type checking on every PR
  - Cross-platform Tauri desktop builds (Linux, macOS, Windows)
  - Dependabot auto-merge for dependency updates
- Community health files
  - Pull request template
  - Bug report and feature request templates
  - Contributing guide
  - Code of Conduct
  - Security policy
- ESLint v9 with flat config format
- Workflow validation
- Documentation for CI/CD workflows

### Changed
- Upgraded ESLint from v7 to v9
- Upgraded TypeScript ESLint from v4 to v8
- Migrated to ESLint flat config format (`eslint.config.mjs`)
- Replaced Electron with Tauri 2.0 for desktop applications
- Updated all platform packages to React Native 0.78
- Updated to React 19
- Updated README with CI/CD information

### Removed
- Electron package and all related files
- Legacy `.eslintrc` configuration files (12 files)
- Outdated configuration patterns

### Fixed
- ESLint configuration now properly handles Jest globals
- React Native globals (`__DEV__`, `__SUBPLATFORM__`) properly defined
- Browser globals for web packages

### Security
- Implemented security policy and vulnerability reporting process
- Added Dependabot for automated security updates
- Configured minimal permissions for GitHub Actions

## [Previous Phases] - Merged Earlier

### Phase 5: Platform Packages Updated
- Updated Windows, macOS, and TV packages to React Native 0.78
- Modern toolchain (Babel 7, Jest 29, TypeScript 5.9)

### Phase 4: Tauri 2.0 Desktop Application
- Added Tauri 2.0 as modern desktop framework
- Cross-platform support (Linux, macOS, Windows)
- Smaller binaries and better performance vs Electron

### Phase 3: Gluestack UI v2 + NativeWind
- Integrated Gluestack UI v2 for component library
- Added NativeWind for Tailwind CSS support
- Modern styling solution

### Phase 2: React 19 + RN 0.78
- Upgraded to React 19
- Upgraded to React Native 0.78
- Comprehensive test infrastructure with Jest 29

### Phase 1: Modern Build Tools
- Upgraded to Yarn 4
- Integrated Turborepo for monorepo management
- Upgraded to TypeScript 5.9

## How to Use This Changelog

### For Contributors
When adding changes, place them under `[Unreleased]` in the appropriate category:
- **Added** for new features
- **Changed** for changes in existing functionality
- **Deprecated** for soon-to-be removed features
- **Removed** for now removed features
- **Fixed** for bug fixes
- **Security** for security-related changes

### For Releases
When creating a new release:
1. Replace `[Unreleased]` with `[X.Y.Z] - YYYY-MM-DD`
2. Add a new `[Unreleased]` section at the top
3. Update comparison links at the bottom
4. Create a git tag matching the version

### Version Numbering
- **Major** (X.0.0): Breaking changes
- **Minor** (0.X.0): New features, backward compatible
- **Patch** (0.0.X): Bug fixes, backward compatible

---

[Unreleased]: https://github.com/Phoenixrr2113/react-native-universal-monorepo/compare/v0.0.1...HEAD
