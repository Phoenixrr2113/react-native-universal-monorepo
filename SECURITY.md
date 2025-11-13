# Security Policy

## Supported Versions

We release patches for security vulnerabilities. Currently supported versions:

| Version | Supported          |
| ------- | ------------------ |
| Latest  | :white_check_mark: |
| < 1.0   | :x:                |

## Reporting a Vulnerability

**Please do not report security vulnerabilities through public GitHub issues.**

Instead, please report them via GitHub's Security Advisory feature:

1. Go to the [Security tab](https://github.com/Phoenixrr2113/react-native-universal-monorepo/security)
2. Click "Report a vulnerability"
3. Fill out the form with details about the vulnerability

Alternatively, you can email security concerns to the project maintainers.

### What to Include

When reporting a vulnerability, please include:

- Type of vulnerability (XSS, SQL injection, etc.)
- Full paths of affected source files
- Location of the affected code (tag/branch/commit or direct URL)
- Step-by-step instructions to reproduce the issue
- Proof-of-concept or exploit code (if possible)
- Impact of the issue, including how an attacker might exploit it

### Response Timeline

- **Initial Response**: Within 48 hours
- **Status Update**: Within 7 days
- **Fix Timeline**: Varies by severity, typically:
  - Critical: 1-7 days
  - High: 7-30 days
  - Medium: 30-90 days
  - Low: Best effort

## Security Best Practices

### For Contributors

1. **Never commit secrets**
   - No API keys, passwords, or tokens in code
   - Use environment variables for sensitive data
   - Check `.gitignore` before committing

2. **Validate user input**
   - Sanitize all user-provided data
   - Use parameterized queries
   - Validate on both client and server

3. **Keep dependencies updated**
   - Regularly update packages
   - Review Dependabot PRs
   - Check for known vulnerabilities

4. **Follow secure coding practices**
   - Avoid `eval()` and similar functions
   - Use HTTPS for all network requests
   - Implement proper authentication/authorization
   - Use Content Security Policy (CSP) for web

### For Users

1. **Keep your installation updated**
   - Use the latest stable version
   - Apply security patches promptly

2. **Review dependencies**
   - Check `yarn.lock` for known vulnerabilities
   - Run `yarn audit` regularly
   - Consider using automated scanning tools

3. **Configure secrets properly**
   - Use GitHub Secrets for CI/CD
   - Never expose API keys in client-side code
   - Rotate credentials regularly

## Known Security Considerations

### React Native

- JavaScript code in React Native apps can be extracted and read
- Store sensitive data using platform-specific secure storage
- Use SSL pinning for critical API connections
- Implement proper authentication mechanisms

### Web Applications

- Use HTTPS in production
- Implement Content Security Policy
- Protect against XSS and CSRF attacks
- Sanitize user input

### Tauri Desktop Apps

- Review Tauri's security documentation
- Configure appropriate permissions in `tauri.conf.json`
- Use IPC securely
- Validate all data passed between frontend and backend

### Dependencies

- Regularly audit dependencies with `yarn audit`
- Keep React Native and other frameworks updated
- Monitor security advisories for used packages
- Consider using tools like Snyk or Dependabot

## Security Updates

Security updates will be:
- Released as patch versions
- Documented in CHANGELOG
- Announced in GitHub releases
- Tagged with `security` label

## Bug Bounty Program

We do not currently have a bug bounty program. However, we greatly appreciate
security researchers who responsibly disclose vulnerabilities.

## Disclosure Policy

- Security fixes will be released as soon as possible
- Credit will be given to security researchers (if desired)
- CVE numbers will be requested for significant vulnerabilities
- Details will be disclosed after a fix is available

## Additional Resources

- [React Native Security](https://reactnative.dev/docs/security)
- [Tauri Security](https://tauri.app/v1/guides/security/)
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [OWASP Mobile Top 10](https://owasp.org/www-project-mobile-top-10/)

## Contact

For security-related questions or concerns:
- Use GitHub Security Advisories (preferred)
- Open a discussion (for non-sensitive questions)
- Email project maintainers (for sensitive issues)

---

Thank you for helping keep this project secure! 🔒
