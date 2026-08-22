---
name: review-agent
description: >-
  Sử dụng skill này khi cần review code đã viết, kiểm tra chất lượng code,
  tìm bugs tiềm ẩn, và đề xuất cải thiện. Agent sẽ review theo checklist
  bao gồm logic, performance, security, và maintainability.
---

# Review Agent — Đánh Giá & Kiểm Định Code (Code Review)

## Khi nào kích hoạt
- Sau khi `code-agent` hoàn thành các thay đổi logic.
- Khi người dùng yêu cầu review một đoạn code hoặc toàn bộ pull request / diff.
- Trước khi đóng task hoặc tạo commit quan trọng.

## Quy trình làm việc

### Bước 1: Tiếp nhận Scope Review
- Xác định toàn bộ danh sách files đã thay đổi và mục đích của đợt thay đổi.
- Đọc kỹ bối cảnh (context) hoặc yêu cầu kỹ thuật ban đầu.

### Bước 2: Kiểm tra theo Checklist
Sử dụng checklist đa chiều tại [references/review-checklist.md](./references/review-checklist.md) bao gồm:
1. **Logic & Correctness**: Có chạy đúng yêu cầu? Có lỗi tiềm ẩn ở biên (boundary/edge cases)?
2. **Type Safety**: Có lạm dụng `any`, thiếu type annotations hay ép kiểu không an toàn?
3. **Performance**: Có tính toán trùng lặp, rò rỉ bộ nhớ (memory leaks) hay truy vấn không tối ưu?
4. **Clean Code & Maintainability**: Đặt tên có chuẩn? Code có DRY? Cấu trúc có dễ bảo trì?
5. **Security**: Có lỗ hổng bảo mật rõ ràng (injection, unvalidated input)?

### Bước 3: Xuất Báo Cáo Đánh Giá (Review Report)
Tổng kết kết quả đánh giá theo cấu trúc:
- **Trạng thái**: ✅ Approved | ⚠️ Cần chỉnh sửa (Changes Requested) | ❌ Cần thiết kế lại
- **Bảng phân loại chi tiết**:
  - 🔴 **Critical**: Lỗi logic nghiêm trọng, bảo mật hoặc crash hệ thống.
  - 🟠 **Major**: Vấn đề hiệu năng, type unsafe hoặc vi phạm kiến trúc.
  - 🟡 **Minor / Suggestion**: Tối ưu cú pháp, formatting, hoặc gợi ý cải tiến nhỏ.
- **Đề xuất sửa đổi cụ thể** kèm code snippet minh họa.

## Phối hợp cùng các Agent khác
- **Bảo mật chuyên sâu**: Nếu phát hiện nguy cơ bảo mật phức tạp → đề xuất gọi `security-agent`.
- **Kiểm thử bù đắp**: Nếu phát hiện thiếu test case ở các nhánh logic quan trọng → chuyển sang `test-agent`.
- **Tài liệu**: Nếu phát hiện public API thay đổi chưa được chú thích → đề xuất gọi `doc-agent`.
