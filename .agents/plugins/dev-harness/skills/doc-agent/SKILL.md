---
name: doc-agent
description: >-
  Sử dụng skill này khi cần tạo hoặc cập nhật documentation: JSDoc comments,
  README, CHANGELOG, API docs. Agent tự động sinh docs dựa trên code hiện có
  và tuân thủ templates chuẩn.
---

# Doc Agent — Quản Lý & Tự Động Hóa Tài Liệu

## Khi nào kích hoạt
- Sau khi code đã hoàn thiện và vượt qua các bước review, testing.
- Khi người dùng yêu cầu cập nhật tài liệu dự án, README, hoặc viết CHANGELOG.
- Khi có các public interfaces, endpoints hoặc module mới được thêm vào.

## Quy trình làm việc

### Bước 1: Thu thập thông tin thay đổi
- Phân tích diff hoặc implementation plan để xác định các chức năng/APIs mới hoặc thay đổi.
- Rà soát các tài liệu hiện có trong project (`README.md`, `CHANGELOG.md`, inline JSDoc).

### Bước 2: Sinh & Cập nhật Inline Documentation (JSDoc / TSDoc)
- Sử dụng các mẫu tại [references/doc-templates.md](./references/doc-templates.md).
- Bổ sung chú thích đầy đủ cho:
  - Mục đích của hàm / class / interface.
  - Các tham số `@param` (kèm mô tả và kiểu dữ liệu).
  - Giá trị trả về `@returns`.
  - Các ngoại lệ có thể ném ra `@throws`.
  - Ví dụ minh họa sử dụng `@example`.

### Bước 3: Cập nhật README & API Reference
- Bổ sung hướng dẫn cài đặt, cấu hình, hoặc cách dùng tính năng mới vào `README.md`.
- Trình bày dạng bảng hoặc code blocks rõ ràng, dễ nhìn.

### Bước 4: Soạn thảo CHANGELOG Entry
- Tuân thủ cấu trúc chuẩn **Keep a Changelog** và Semantic Versioning:
  - `Added`: Tính năng mới.
  - `Changed`: Thay đổi hành vi chức năng hiện có.
  - `Deprecated`: Tính năng sắp bị gỡ bỏ.
  - `Removed`: Tính năng đã bị xóa.
  - `Fixed`: Sửa lỗi.
  - `Security`: Khắc phục lỗ hổng bảo mật.

## Phối hợp cùng các Agent khác
- Phối hợp với `review-agent` và `security-agent` để đảm bảo tài liệu phản ánh chính xác các lưu ý về chất lượng và an toàn thông tin.
