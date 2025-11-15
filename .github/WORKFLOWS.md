# GitHub Actions Workflows

This document describes the CI/CD workflows configured for this monorepo.

## Overview

Our CI/CD pipeline is built with GitHub Actions and uses Turborepo for efficient caching and parallel execution.

## Workflows

### 🔍 CI (`ci.yml`)

**Triggers:** Push to `master`/`main`, Pull Requests

**Jobs:**
- **Lint**: Runs ESLint v9 across all packages
- **Type Check**: Runs TypeScript type checking
- **Test**: Runs Jest tests across all packages
- **Build**: Builds all packages (depends on lint, typecheck, test passing)

**Caching:**
- Yarn dependencies (from `.yarn/cache`)
- Turborepo build cache (from `.turbo`)

**Duration:** ~5-8 minutes (with cache)

---

### 🖥️ Tauri Build (`tauri-build.yml`)

**Triggers:**
- Git tags matching `v*` (e.g., `v1.0.0`)
- Manual workflow dispatch

**Matrix Strategy:**
Builds for multiple platforms in parallel:
- Linux (x86_64)
- macOS (x86_64 Intel)
- macOS (aarch64 Apple Silicon)
- Windows (x86_64)

**Jobs:**
- **build-tauri**: Builds Tauri desktop app for each platform
- **release**: Creates GitHub release with all platform binaries

**Required Secrets:**
- `TAURI_PRIVATE_KEY`: For code signing (optional)
- `TAURI_KEY_PASSWORD`: Password for signing key (optional)

**Artifacts:**
- `.dmg` (macOS)
- `.exe` / `.msi` (Windows)
- `.AppImage` / `.deb` (Linux)

**Duration:** ~15-25 minutes per platform

---

### 🤖 Dependabot Auto-Merge (`dependabot-auto-merge.yml`)

**Triggers:** Dependabot pull requests

**Behavior:**
- ✅ **Auto-merge**: Patch and minor updates
- 🚨 **Manual review**: Major updates (adds comment)

**Configuration:** See `.github/dependabot.yml`

---

## Dependabot Configuration

Configured in `.github/dependabot.yml`:

- **GitHub Actions**: Weekly updates
- **npm/Yarn**: Weekly updates with grouped dependencies
- **Cargo/Rust**: Weekly updates for Tauri dependencies

**Ignored:**
- Major React/React Native updates (require manual testing)

---

## Caching Strategy

### Yarn Dependencies
```yaml
uses: actions/cache@v4
with:
  path: .yarn/cache
  key: ${{ runner.os }}-yarn-${{ hashFiles('**/yarn.lock') }}
```

### Turborepo
```yaml
uses: actions/cache@v4
with:
  path: .turbo
  key: ${{ runner.os }}-turbo-${{ github.sha }}
```

### Rust (Tauri)
```yaml
uses: Swatinem/rust-cache@v2
with:
  workspaces: packages/tauri/src-tauri
```

---

## Performance Optimizations

1. **Parallel Jobs**: Lint, typecheck, and test run in parallel
2. **Turborepo Caching**: Reuses build artifacts when possible
3. **Yarn Cache**: Speeds up dependency installation
4. **Rust Cache**: Caches compiled Rust dependencies
5. **Matrix Builds**: Platform-specific builds run in parallel

---

## Local Testing

You can test workflows locally using [act](https://github.com/nektos/act):

```bash
# Install act
brew install act  # macOS
# or
curl https://raw.githubusercontent.com/nektos/act/master/install.sh | sudo bash

# Run CI workflow
act -j lint
act -j test
act -j build

# Run all jobs
act push
```

---

## Release Process

### Creating a Release

1. **Update version** in relevant package.json files
2. **Create and push a tag:**
   ```bash
   git tag v1.0.0
   git push origin v1.0.0
   ```
3. **GitHub Actions** automatically:
   - Builds Tauri apps for all platforms
   - Creates a draft release
   - Uploads all platform binaries

4. **Review and publish** the draft release on GitHub

### Manual Tauri Build

You can also trigger builds manually:
1. Go to **Actions** → **Tauri Build**
2. Click **Run workflow**
3. Select the branch
4. Click **Run workflow**

---

## Troubleshooting

### Build Failures

**Clear caches:**
```bash
# Remove all GitHub Actions caches for this repo
gh cache list
gh cache delete <cache-id>
```

**Locally:**
```bash
# Clear yarn cache
yarn cache clean

# Clear Turbo cache
rm -rf .turbo

# Clear node_modules
rm -rf node_modules packages/*/node_modules
yarn install
```

### Dependabot Issues

If Dependabot PRs fail:
1. Check the CI logs
2. Update manually if needed:
   ```bash
   yarn upgrade-interactive
   ```

---

## Security

- **Secrets** are stored in GitHub repository settings
- **Dependabot** runs in a restricted environment
- **GITHUB_TOKEN** has minimal required permissions
- Tauri code signing is optional but recommended for production

---

## Future Improvements

Potential additions:
- [ ] E2E tests with Playwright
- [ ] Visual regression tests
- [ ] Bundle size tracking
- [ ] Performance benchmarks
- [ ] Automatic changelog generation
- [ ] Slack/Discord notifications
- [ ] Preview deployments for web packages
