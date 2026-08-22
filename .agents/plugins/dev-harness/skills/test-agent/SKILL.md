---
name: test-agent
description: >-
  Sử dụng skill này khi cần viết unit tests, integration tests, chạy test suite,
  hoặc phân tích test coverage. Agent hỗ trợ Jest (mặc định), Vitest, và Mocha.
  Tự động detect test runner từ project config.
---

# Test Agent — Kiểm Thử Tự Động & Độ Phủ Mã Nguồn

## Khi nào kích hoạt
- Sau khi `code-agent` hoàn thành tính năng hoặc sửa lỗi cần viết tests đi kèm.
- Khi người dùng yêu cầu viết tests hoặc bổ sung coverage cho module cụ thể.
- Khi cần chạy toàn bộ bộ kiểm thử để xác minh tính toàn vẹn của ứng dụng.

## Quy trình làm việc

### Bước 1: Xác định Test Runner & Cấu hình
- Đọc cấu hình từ `harness.config.json` (mục `tools.testRunner`).
- Nếu config là `auto`, tự động nhận diện từ project (ưu tiên Jest → Vitest → Mocha).
- Xem xét cách tổ chức tests hiện tại của dự án (`__tests__/` hoặc `*.test.ts` / `*.spec.ts`).

### Bước 2: Thiết kế Test Cases
- Tham khảo các mẫu thiết kế test tại [references/test-patterns.md](./references/test-patterns.md).
- Áp dụng mẫu **AAA (Arrange — Act — Assert)**.
- Liệt kê các luồng cần kiểm thử:
  1. **Happy Path**: Dữ liệu chuẩn xác, luồng hoạt động lý tưởng.
  2. **Edge Cases**: Dữ liệu biên, null/undefined, chuỗi đặc biệt.
  3. **Error Paths**: Dữ liệu sai, ném ngoại lệ đúng loại và đúng thông báo lỗi.

### Bước 3: Hiện thực hóa Tests
- Tạo file kiểm thử mới hoặc cập nhật file test hiện có.
- Mocking các dependencies bên ngoài (Network calls, Database, File system) để đảm bảo tests chạy nhanh và cô lập (isolated).

### Bước 4: Chạy kiểm thử & Phân tích
- Chạy lệnh kiểm thử tương ứng:
  - **Jest**: `npx jest [path-to-test] --verbose`
  - **Vitest**: `npx vitest run [path-to-test]`
  - **Mocha**: `npx mocha [path-to-test]`
- Xác nhận tất cả test cases đều xanh (Pass).
- Nếu có test fail, phân tích nguyên nhân và sửa chữa ngay.

## Phối hợp cùng các Agent khác
- **Sửa lỗi phát hiện qua test**: Nếu phát hiện bug trong code chính → phối hợp cùng `code-agent` để fix.
- **Tài liệu hóa**: Khi hoàn thành bộ test → bàn giao sang `doc-agent` để cập nhật hướng dẫn chạy test nếu cần.
