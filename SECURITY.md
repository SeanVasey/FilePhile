# Security Policy

## Supported Versions

| Version | Supported |
|---------|-----------|
| 1.1 | Yes |

## Reporting a Vulnerability

If you discover a security vulnerability in FilePhile, please report it responsibly.

### How to Report

1. **Do not** open a public GitHub issue for security vulnerabilities.
2. Email the maintainer or use [GitHub's private vulnerability reporting](https://docs.github.com/en/code-security/security-advisories/guidance-on-reporting-and-writing-information-about-vulnerabilities/privately-reporting-a-security-vulnerability) on this repository.
3. Include:
   - Description of the vulnerability
   - Steps to reproduce
   - Potential impact
   - Suggested fix (if any)

### Response Timeline

- **Acknowledgment:** Within 48 hours
- **Assessment:** Within 7 days
- **Fix (if confirmed):** As soon as practical, typically within 14 days

### Scope

The following are in scope:
- XSS vulnerabilities in the editor or preview
- CSP bypasses
- File handling issues (path traversal, unsafe extensions)
- LocalStorage data exposure
- Service Worker security issues

The following are out of scope:
- Issues requiring physical access to the user's device
- Browser-specific bugs not caused by FilePhile code
- Social engineering attacks

## Security Architecture

FilePhile's security posture is documented in:
- [Full Security Review](docs/SECURITY_REVIEW.md)
- [Security Enhancements Summary](docs/SECURITY_ENHANCEMENTS_SUMMARY.md)
