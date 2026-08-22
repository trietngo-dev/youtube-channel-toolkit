# TypeScript / JavaScript Code Conventions Guide

Tài liệu hướng dẫn chi tiết về các chuẩn mực lập trình cho Code Agent.

---

## 1. Cấu Trúc File & Module
- Mỗi file nên tập trung vào một trách nhiệm duy nhất (Single Responsibility).
- Thứ tự các phần trong file:
  1. Imports (Node core → External libs → Internal aliases → Relative)
  2. Type definitions / Interfaces
  3. Constants nội bộ
  4. Core logic / Class / Functions
  5. Exports

---

## 2. Naming Best Practices
- **Biến & Hàm**: Đặt tên có ý nghĩa, phản ánh đúng hành vi (ví dụ: `fetchActiveUsers()` thay vì `get()`).
- **Booleans**: Dùng tiền tố dạng câu hỏi xác nhận (`isReady`, `hasErrors`, `canSubmit`).
- **Interfaces**: Đặt tên trực diện không cần tiền tố `I` (`UserProfile`, `DatabaseConfig`).

---

## 3. Quản Lý Hàm & Độ Phức Tạp
- **Độ dài hàm**: Cố gắng giữ dưới 30-40 dòng. Nếu hàm quá dài, hãy tách thành các hàm trợ giúp (helper functions).
- **Mức độ lồng nhau (Nesting Depth)**: Tối đa 2-3 cấp. Sử dụng kỹ thuật Early Return / Guard Clauses để giảm lồng `if/else`.

```typescript
// ✅ Chuẩn: Guard clause
function processOrder(order?: Order): void {
  if (!order) return;
  if (!order.isValid) return;

  saveOrder(order);
}
```

---

## 4. Error Handling Chuẩn Mực
- Không bao giờ để `catch` block rỗng (silent failure).
- Luôn truyền kèm error gốc hoặc thông tin context hữu ích.

```typescript
try {
  await database.connect();
} catch (error) {
  throw new AppError('Không thể kết nối cơ sở dữ liệu', { cause: error });
}
```

---

## 5. Async / Await Guidelines
- Luôn ưu tiên cú pháp `async/await` thay vì lồng chuỗi `.then().catch()`.
- Chú ý xử lý đa luồng bất đồng bộ bằng `Promise.all()` hoặc `Promise.allSettled()` khi các tác vụ độc lập nhau.
