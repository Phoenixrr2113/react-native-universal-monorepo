# Contributing to React Native Universal Monorepo

Thank you for your interest in contributing! This document provides guidelines and instructions for contributing to this project.

## 🚀 Quick Start

1. **Fork the repository**
2. **Clone your fork**:
   ```bash
   git clone https://github.com/YOUR_USERNAME/react-native-universal-monorepo.git
   cd react-native-universal-monorepo
   ```
3. **Install dependencies**:
   ```bash
   corepack enable
   yarn install
   ```
4. **Create a branch**:
   ```bash
   git checkout -b feature/your-feature-name
   ```

## 📋 Before You Start

- Check existing issues and PRs to avoid duplicates
- For major changes, open an issue first to discuss
- Read the [Code of Conduct](CODE_OF_CONDUCT.md)

## 🔧 Development Workflow

### Running Tests

```bash
# Run all tests
yarn test

# Run tests for specific package
yarn workspace @my-app/app test

# Run tests in watch mode
yarn workspace @my-app/app test:watch
```

### Linting and Type Checking

```bash
# Lint all packages
yarn lint

# Fix linting issues
yarn lint:fix

# Type check all packages
yarn typecheck
```

### Building

```bash
# Build all packages
yarn build

# Build specific package
yarn workspace @my-app/app build
```

## 🏗️ Project Structure

```
react-native-universal-monorepo/
├── packages/
│   ├── app/              # Shared app logic
│   ├── mobile/           # iOS & Android
│   ├── web/              # React Native Web
│   ├── tauri/            # Desktop (Tauri)
│   ├── windows/          # React Native Windows
│   ├── macos/            # React Native macOS
│   ├── tv/               # tvOS & Android TV
│   ├── browser-ext/      # Browser extension
│   └── next/             # Next.js app
├── .github/              # CI/CD workflows & templates
└── turbo.json            # Turborepo configuration
```

## 📝 Commit Message Guidelines

We follow [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `perf`: Performance improvements
- `test`: Adding or updating tests
- `chore`: Maintenance tasks
- `ci`: CI/CD changes

### Examples

```
feat(mobile): add dark mode support

Implements dark mode for iOS and Android apps using the new theme system.

Closes #123
```

```
fix(web): resolve hydration mismatch in SSR

Fixes server-side rendering issue where initial state didn't match client.

Fixes #456
```

## 🧪 Testing Guidelines

### Unit Tests

- Write tests for all new features
- Maintain or improve test coverage
- Use descriptive test names
- Follow the Arrange-Act-Assert pattern

### Example

```typescript
describe('useCounter', () => {
  it('should increment counter when increment is called', () => {
    // Arrange
    const { result } = renderHook(() => useCounter());

    // Act
    act(() => {
      result.current.increment();
    });

    // Assert
    expect(result.current.count).toBe(1);
  });
});
```

## 📦 Adding Dependencies

### Package Dependencies

```bash
# Add to specific package
yarn workspace @my-app/mobile add react-native-svg

# Add dev dependency
yarn workspace @my-app/mobile add -D @types/react-native-svg
```

### Root Dependencies

```bash
# Add root dev dependency
yarn add -D eslint-plugin-custom
```

### Important Notes

- Avoid adding dependencies to the root unless necessary
- Check if the dependency already exists in another package
- Consider bundle size impact for web packages
- Update `nohoist` in `package.json` if needed for React Native packages

## 🎨 Code Style

### TypeScript

- Use TypeScript for all new code
- Avoid `any` type (use `unknown` or proper types)
- Export types alongside implementation
- Use meaningful variable names

### React

- Use functional components with hooks
- Avoid inline styles (use stylesheet or styled components)
- Keep components small and focused
- Write prop types with TypeScript interfaces

### Example

```typescript
interface ButtonProps {
  onPress: () => void;
  title: string;
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  onPress,
  title,
  disabled = false
}) => {
  return (
    <Pressable onPress={onPress} disabled={disabled}>
      <Text>{title}</Text>
    </Pressable>
  );
};
```

## 🔍 Pull Request Process

### Before Submitting

1. **Update your branch**:
   ```bash
   git fetch origin
   git rebase origin/master
   ```

2. **Run checks locally**:
   ```bash
   yarn lint
   yarn typecheck
   yarn test
   ```

3. **Update documentation** if needed

4. **Add changeset** (if applicable):
   ```bash
   yarn changeset
   ```

### PR Template

Use the provided PR template and fill out all sections:
- Description of changes
- Type of change
- Affected packages
- Testing performed
- Screenshots (if UI changes)

### Review Process

- Address review feedback promptly
- Keep discussions focused and professional
- Request re-review after making changes
- Be patient - reviews may take time

### CI/CD Checks

All PRs must pass:
- ✅ Linting
- ✅ Type checking
- ✅ Tests
- ✅ Build

## 🐛 Reporting Bugs

Use the [Bug Report template](.github/ISSUE_TEMPLATE/bug_report.yml):

1. **Search existing issues** first
2. **Provide reproduction steps**
3. **Include error messages** and logs
4. **Specify platform** and versions
5. **Add screenshots** if helpful

## ✨ Requesting Features

Use the [Feature Request template](.github/ISSUE_TEMPLATE/feature_request.yml):

1. **Describe the problem** you're solving
2. **Propose a solution**
3. **Consider alternatives**
4. **Provide examples** or mockups
5. **Indicate willingness to contribute**

## 📚 Documentation

- Update README.md for major features
- Add JSDoc comments for public APIs
- Include examples in documentation
- Update relevant guides in `.github/`

## 🎯 Areas for Contribution

Good first issues:
- Documentation improvements
- Test coverage improvements
- Bug fixes
- Performance optimizations

Advanced contributions:
- New platform support
- Major feature additions
- Architecture improvements

## 🤝 Community

- Be respectful and inclusive
- Help others in discussions
- Share knowledge and experiences
- Follow the [Code of Conduct](CODE_OF_CONDUCT.md)

## ❓ Questions?

- Check the [README](README.md)
- Search [existing issues](https://github.com/Phoenixrr2113/react-native-universal-monorepo/issues)
- Ask in [Discussions](https://github.com/Phoenixrr2113/react-native-universal-monorepo/discussions)

## 📜 License

By contributing, you agree that your contributions will be licensed under the same license as the project.

---

Thank you for contributing! 🎉
