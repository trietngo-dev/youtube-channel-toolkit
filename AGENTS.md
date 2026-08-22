# AGENTS.md

> Project Multi-Agent Workspace Guide & Conventions (Compatible with Google Antigravity, DeepSeek Harness, Claude Code, and Cursor).

---

## 🎯 Workspace Overview

- **Harness**: `dev-harness` (Preset: `full-stack`)
- **Primary Communication Language**: Vietnamese (`vi`)
- **Package Manager**: `npm`
- **Config File**: `harness.config.json`

---

## 🤖 Active Agent Personas

| Agent | Status | Description |
| :--- | :--- | :--- |
| 🗺️ **Plan Agent** | ✅ Enabled | Analyzes requirements, creates implementation plans, breaks down tasks |
| 💻 **Code Agent** | ✅ Enabled | Implements features, fixes bugs, follows project conventions |
| 🔍 **Review Agent** | ✅ Enabled | Reviews code for logic correctness, error handling, performance |
| 🧪 **Test Agent** | ✅ Enabled | Generates unit/integration tests and validates coverage |
| 📝 **Doc Agent** | ✅ Enabled | Maintains JSDoc/TSDoc, README, and API documentation |
| 🔒 **Security Agent** | ✅ Enabled | OWASP audits, secrets check, validates secure input handling |

---

## 🛠️ Development & Validation Commands

- **Run Tests**: `npm test`
- **Run Linter**: `npx eslint .`
- **Format Code**: `npx prettier --write .`
- **Type Check**: `npx tsc --noEmit`

---

## 🛡️ Security Guardrails & Trust Boundaries

The following operations are monitored and protected by **dev-harness Security Guard**:
1. **Destructive Operations**: `rm -rf /`, `rm -rf ~`, low-level formatting, and disk block wiping.
2. **Protected Branches**: Force pushing (`git push --force`) to `main`, `master`, or `production`.
3. **Sensitive Files**: Direct tampering with `.env`, `.env.*`, `*.pem`, `id_rsa`, `credentials.json`, or `.npmrc` is blocked.
4. **Untrusted Shell Execution**: Piping remote scripts (`curl | bash`) is prohibited.

---

## 📋 General Guidelines

1. **Code Standards**:
   - Write clean, modular, and maintainable TypeScript/JavaScript.
   - Maintain test coverage for all new public features and bug fixes.
2. **Git Workflow**:
   - Follow Conventional Commits format (`feat:`, `fix:`, `refactor:`, `test:`, `docs:`, `chore:`).
3. **Language**:
   - Communicate and document in **Tiếng Việt** as specified in `harness.config.json`.
