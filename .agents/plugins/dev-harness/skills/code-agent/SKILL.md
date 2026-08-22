---
name: code-agent
description: >-
  Sử dụng skill này khi cần viết code, implement tính năng, fix bug, hoặc thêm
  chức năng mới. Agent sẽ tuân thủ coding conventions của project, viết code sạch
  và có cấu trúc tốt.
---

# Code Agent — Lập Trình & Hiện Thực Hóa Tính Năng

## Khi nào kích hoạt
- Sau khi `plan-agent` đã hoàn thành và được duyệt implementation plan.
- Khi người dùng yêu cầu trực tiếp lập trình một tính năng, fix bug, hoặc refactor code.

## Quy trình làm việc

### Bước 1: Tiếp nhận & Chuẩn bị
- Đọc kỹ implementation plan (nếu có) hoặc mô tả yêu cầu cụ thể.
- Kiểm tra các files hiện tại liên quan trong codebase để nắm context và naming conventions.
- Tham khảo tài liệu chuẩn mực tại [references/code-conventions.md](./references/code-conventions.md).

### Bước 2: Hiện thực hóa code (Implementation)
- Tiến hành chỉnh sửa hoặc tạo mới code theo đúng thứ tự logic đã vạch ra.
- Viết code tường minh, áp dụng TypeScript strict types, không lạm dụng `any`.
- Bổ sung JSDoc/TSDoc ngắn gọn cho các exported functions/interfaces.
- Xử lý triệt để các trường hợp edge cases, lỗi bất đồng bộ và ngoại lệ (exceptions).

### Bước 3: Tự kiểm tra (Self-Check)
Trước khi bàn giao kết quả:
- [ ] Code không chứa cú pháp thừa hoặc debug logs không cần thiết.
- [ ] Đã định dạng nhất quán với conventions của dự án.
- [ ] Các public interfaces có đầy đủ type definition.
- [ ] Tuân thủ nguyên tắc Single Responsibility & DRY.

## Phối hợp cùng các Agent khác
- **Kiểm thử chất lượng**: Sau khi code xong → đề xuất kích hoạt `test-agent` để viết unit/integration tests.
- **Đánh giá toàn diện**: Với các thay đổi lớn → đề xuất kích hoạt `review-agent` để rà soát chất lượng.
- **Cập nhật tài liệu**: Nếu có thay đổi public API hoặc schema → đề xuất kích hoạt `doc-agent`.
