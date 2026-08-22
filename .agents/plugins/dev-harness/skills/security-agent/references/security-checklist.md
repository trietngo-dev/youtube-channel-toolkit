# OWASP Top 10 Security Checklist Guide

Tài liệu hướng dẫn rà soát an toàn thông tin chuyên sâu dành cho Security Agent.

---

## 1. Bảng Rà Soát OWASP Top 10

| Danh Mục OWASP | Điểm Cần Kiểm Tra | Mức Độ |
| :--- | :--- | :---: |
| **A01: Broken Access Control** | Kiểm tra quyền (Authorization) ở mức server, không tin tưởng client-side checks; chống IDOR (Insecure Direct Object Reference). | 🔴 Critical |
| **A02: Cryptographic Failures** | Băm mật khẩu bằng thuật toán an toàn (`bcrypt`, `argon2`), không lưu plain text; quản lý API keys qua biến môi trường (.env). | 🔴 Critical |
| **A03: Injection** | Sử dụng Parameterized Queries / ORM an toàn; validate & sanitize toàn bộ input để chống SQL/NoSQL/Command Injection; escape HTML chống XSS. | 🔴 Critical |
| **A04: Insecure Design** | Áp dụng Rate Limiting chống spam/brute-force; thiết kế luồng recovery/reset password an toàn. | 🟠 High |
| **A05: Security Misconfiguration** | Sử dụng `helmet` cho Express/Node.js; cấu hình CORS chặt chẽ (không dùng `Access-Control-Allow-Origin: *` cho sensitive APIs). | 🟠 High |
| **A06: Vulnerable Components** | Định kỳ quét `npm audit`; loại bỏ các packages không rõ nguồn gốc hoặc đã ngừng bảo trì. | 🟠 High |
| **A07: Identification & Auth Failures** | Thời gian sống (expiry) của JWT hợp lý; cơ chế refresh token an toàn; khóa tài khoản tạm thời khi nhập sai mật khẩu nhiều lần. | 🔴 Critical |
| **A08: Software Integrity Failures** | Tránh dùng `eval()` hoặc các hàm deserialize không an toàn từ dữ liệu người dùng. | 🟠 High |
| **A09: Logging & Monitoring Failures** | Không log dữ liệu nhạy cảm (mật khẩu, số thẻ, full token) vào log files. | 🟡 Medium |
| **A10: SSRF** | Kiểm tra và whitelist địa chỉ IP/domain đích trước khi server thực hiện HTTP request theo input người dùng. | 🟠 High |

---

## 2. Best Practices Code Mẫu Cho Node.js / TypeScript

### Phân Quyền Tránh IDOR (A01)
```typescript
// ❌ Nguy hiểm: Tin tưởng ID từ client gửi lên
app.get('/api/orders/:id', async (req, res) => {
  const order = await Order.findById(req.params.id);
  res.json(order);
});

// ✅ An toàn: Bắt buộc lọc theo user ID đã xác thực
app.get('/api/orders/:id', authenticate, async (req, res) => {
  const order = await Order.findOne({ _id: req.params.id, userId: req.user.id });
  if (!order) return res.status(404).json({ error: 'Không tìm thấy đơn hàng' });
  res.json(order);
});
```

### Chống SQL Injection (A03)
```typescript
// ❌ Nguy hiểm: Nối chuỗi trực tiếp
db.query(`SELECT * FROM users WHERE email = '${req.body.email}'`);

// ✅ An toàn: Sử dụng parameterized query
db.query('SELECT * FROM users WHERE email = $1', [req.body.email]);
```

### Header An Toàn Với Helmet (A05)
```typescript
import helmet from 'helmet';
import express from 'express';

const app = express();
app.use(helmet());
```
