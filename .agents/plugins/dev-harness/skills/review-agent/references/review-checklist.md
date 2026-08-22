# Code Review Checklist Guide

Tài liệu checklist tiêu chuẩn dành cho Review Agent.

---

## 1. Tính Chính Xác & Logic (Logic & Correctness)
- [ ] Luồng nghiệp vụ chính chạy đúng yêu cầu bài toán.
- [ ] Xử lý đầy đủ các trường hợp ngoại lệ: `null`, `undefined`, chuỗi rỗng `""`, mảng rỗng `[]`.
- [ ] Các điều kiện biên (Boundary conditions: `<` vs `<=`, off-by-one errors) được kiểm tra kỹ.
- [ ] Xử lý Promise / Async logic chính xác, không thiếu `await`.

---

## 2. Chất Lượng Mã & Độ An Toàn Kiểu (Code Quality & Types)
- [ ] Không sử dụng `any` trừ trường hợp bất khả kháng (phải có comment giải thích).
- [ ] Các interfaces/types có định nghĩa chặt chẽ.
- [ ] Tránh lặp code (tuân thủ DRY), các hàm dùng chung được tách hợp lý.
- [ ] Tên hàm, biến, type mang ý nghĩa rõ ràng, đúng ngữ cảnh.
- [ ] Không để lại code thừa, `console.log` debug hay `TODO` chưa xử lý.

---

## 3. Hiệu Năng (Performance)
- [ ] Không thực hiện vòng lặp lồng nhau phức tạp không cần thiết (O(n²)).
- [ ] Tránh gọi API hoặc query cơ sở dữ liệu trong vòng lặp (N+1 query problem).
- [ ] Các tác vụ tốn tài nguyên được cache hoặc debounce/throttle phù hợp.
- [ ] Clean up event listeners, timers, subscriptions để tránh rò rỉ bộ nhớ.

---

## 4. Xử Lý Lỗi (Error Handling)
- [ ] Bắt lỗi đúng cấp độ, không "nuốt lỗi" (silent catch).
- [ ] Thông báo lỗi trả về cho client không để lộ stack trace nội bộ hay thông tin nhạy cảm.
- [ ] Rollback trạng thái khi xảy ra lỗi giữa chừng (trong transactions).

---

## 5. Mẫu Báo Cáo Code Review Mẫu
```markdown
### 📝 Báo Cáo Đánh Giá Mã Nguồn
**Kết quả chung:** ⚠️ Cần chỉnh sửa (1 Major, 1 Minor)

#### 🟠 [Major] Thiếu xử lý lỗi khi tải dữ liệu người dùng
- **Vị trí**: `src/services/user-service.ts:L45`
- **Vấn đề**: `await fetchUser()` không có try/catch dẫn đến unhandled promise rejection khi API sập.
- **Giải pháp đề xuất**: Bọc trong khối try/catch và trả về kết quả dự phòng hoặc ném `UserServiceError`.

#### 🟡 [Minor] Sử dụng biến tạm không cần thiết
- **Vị trí**: `src/utils/format.ts:L12`
- **Vấn đề**: Tạo biến `const temp = ...` rồi return ngay sau đó.
- **Giải pháp**: Return trực tiếp biểu thức để code gọn gàng hơn.
```
