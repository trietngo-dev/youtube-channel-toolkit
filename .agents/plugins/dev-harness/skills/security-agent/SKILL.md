---
name: security-agent
description: >-
  Sử dụng skill này khi cần kiểm tra bảo mật code: scan vulnerabilities,
  kiểm tra OWASP Top 10, audit authentication/authorization, và đề xuất
  security best practices. Kích hoạt khi code liên quan đến auth, user input,
  API endpoints, hoặc data nhạy cảm.
---

# Security Agent — Kiểm Định & Tăng Cường Bảo Mật (OWASP Top 10)

## Khi nào kích hoạt
- Khi code có tương tác với Authentication / Authorization (JWT, OAuth, Session, RBAC).
- Khi xử lý dữ liệu đầu vào của người dùng (Form submit, API params, Query strings, File uploads).
- Khi tạo mới hoặc cập nhật API endpoints công khai (Public APIs).
- Khi xử lý hoặc lưu trữ thông tin nhạy cảm (Passwords, Tokens, PII, API Keys).
- Khi `review-agent` hoặc người dùng yêu cầu rà soát bảo mật toàn diện.

## Quy trình làm việc

### Bước 1: Khảo sát bề mặt tấn công (Attack Surface)
- Xác định tất cả các điểm tiếp nhận dữ liệu từ bên ngoài (Entry points).
- Lần theo luồng dữ liệu (Data Flow): Client Input → Server Validation → Business Logic → Database / External APIs.
- Kiểm tra các dependencies xem có dính CVE thông qua `npm audit` nếu cần.

### Bước 2: Rà soát theo chuẩn OWASP Top 10
Sử dụng checklist chi tiết tại [references/security-checklist.md](./references/security-checklist.md) bao gồm:
1. **A01: Broken Access Control**: Kiểm tra quyền truy cập ở mọi endpoint và tài nguyên.
2. **A02: Cryptographic Failures**: Mã hóa dữ liệu nhạy cảm (dùng `bcrypt`/`argon2`, HTTPS, bảo mật secrets).
3. **A03: Injection**: Phòng chống SQL Injection, NoSQL Injection, Command Injection, XSS.
4. **A04: Insecure Design**: Thiết kế an toàn, giới hạn tần suất gọi (Rate Limiting).
5. **A05: Security Misconfiguration**: Cấu hình HTTP Security Headers (`helmet`), CORS an toàn.
6. **A06: Vulnerable and Outdated Components**: Kiểm soát phiên bản thư viện an toàn.
7. **A07: Identification & Auth Failures**: Phòng chống Brute-force, Session Hijacking, Token Expiration.
8. **A08: Software and Data Integrity Failures**: Đảm bảo toàn vẹn dữ liệu và an toàn khi deserialize.
9. **A09: Security Logging & Monitoring Failures**: Ghi log an toàn (không lộ passwords, tokens).
10. **A10: Server-Side Request Forgery (SSRF)**: Kiểm tra và whitelist URLs khi server gọi ra ngoài.

### Bước 3: Lập Báo Cáo An Toàn Thông Tin (Security Audit Report)
- Phân loại mức độ nghiêm trọng: 🔴 Critical | 🟠 High | 🟡 Medium | 🟢 Low / Info.
- Cung cấp:
  - **Lỗ hổng & Nguy cơ (Vulnerability & Impact)**.
  - **Đoạn code bị ảnh hưởng (Vulnerable Snippet)**.
  - **Giải pháp khắc phục cụ thể (Remediation & Secure Snippet)**.

## Phối hợp cùng các Agent khác
- Phối hợp với `code-agent` để apply các bản vá bảo mật (Security patches).
- Phối hợp với `test-agent` để viết Security Regression Tests (chặn các payload tấn công).
