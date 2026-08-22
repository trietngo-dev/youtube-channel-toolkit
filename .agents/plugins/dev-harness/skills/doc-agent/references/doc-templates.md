# Documentation Templates Guide

Tài liệu mẫu chuẩn hóa cho Doc Agent.

---

## 1. JSDoc Function Template

```typescript
/**
 * Tính toán tổng chi phí đơn hàng bao gồm thuế và chiết khấu.
 *
 * @param items - Danh sách các sản phẩm trong giỏ hàng.
 * @param taxRate - Tỷ lệ thuế áp dụng (ví dụ: 0.1 cho 10%).
 * @param discountCode - Mã giảm giá nếu có.
 * @returns Tổng số tiền cuối cùng sau khi tính toán.
 * @throws {InvalidInputError} Khi danh sách items rỗng hoặc taxRate âm.
 *
 * @example
 * ```typescript
 * const total = calculateOrderTotal(cartItems, 0.08, 'SUMMER2026');
 * console.log(`Total: $${total}`);
 * ```
 */
export function calculateOrderTotal(
  items: CartItem[],
  taxRate: number,
  discountCode?: string
): number {
  // Implementation...
}
```

---

## 2. JSDoc Interface Template

```typescript
/**
 * Đại diện cho thông tin tài khoản người dùng trong hệ thống.
 */
export interface UserProfile {
  /** Định danh duy nhất dạng UUID v4 */
  id: string;
  /** Địa chỉ email đã qua xác thực */
  email: string;
  /** Tên hiển thị công khai của người dùng */
  displayName: string;
  /** Thời điểm tài khoản được kích hoạt lần đầu */
  createdAt: Date;
}
```

---

## 3. CHANGELOG Entry Template

```markdown
## [Unreleased]

### Added
- Thêm tính năng xác thực 2 bước (2FA) qua mã TOTP.
- Bổ sung endpoint `GET /api/v1/auth/mfa/status`.

### Changed
- Nâng cấp thư viện `jsonwebtoken` lên phiên bản mới nhất để vá lỗi bảo mật.

### Fixed
- Sửa lỗi hiển thị sai định dạng ngày tháng trên giao diện Safari.
```
