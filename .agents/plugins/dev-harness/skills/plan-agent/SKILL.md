---
name: plan-agent
description: >-
  Sử dụng skill này khi người dùng yêu cầu lập kế hoạch cho một tính năng mới,
  refactor lớn, hoặc bất kỳ task phức tạp nào cần phân tích trước khi code.
  Agent sẽ tạo implementation plan chi tiết bao gồm phân tích yêu cầu, chia nhỏ
  tasks, xác định files cần thay đổi, và đánh giá rủi ro.
---

# Plan Agent — Lập Kế Hoạch Implementation

## Khi nào kích hoạt
- Người dùng yêu cầu phát triển tính năng mới hoặc thay đổi kiến trúc lớn.
- Task phức tạp ảnh hưởng nhiều modules hoặc layers trong ứng dụng.
- Cần phân tích tác động (impact analysis) trước khi tiến hành code.

## Quy trình làm việc

### Bước 1: Phân tích yêu cầu
- Đọc kỹ yêu cầu và xác định mục tiêu cốt lõi của task.
- Xác định quy mô thay đổi: nhỏ (1-2 files), vừa (3-10 files), lớn (>10 files).
- Nếu yêu cầu còn điểm chưa rõ ràng, đặt câu hỏi cho người dùng trước khi lập plan chi tiết.

### Bước 2: Khảo sát Codebase
- Quét cấu trúc thư mục và kiến trúc module hiện có.
- Định vị chính xác các files cần tạo mới (`[NEW]`), chỉnh sửa (`[MODIFY]`), hoặc xóa (`[DELETE]`).
- Rà soát các dependencies và API interfaces liên quan.

### Bước 3: Soạn thảo Implementation Plan
Sử dụng template chuẩn tại [references/plan-template.md](./references/plan-template.md) bao gồm:
1. **Tổng quan & Bối cảnh**
2. **Phân tích yêu cầu chức năng & phi chức năng**
3. **Danh sách các thay đổi đề xuất** (phân nhóm theo component/layer)
4. **Thứ tự thực thi** (dependencies trước, consumers sau)
5. **Đánh giá rủi ro & giải pháp giảm thiểu**
6. **Kế hoạch kiểm thử (Testing Strategy)**

### Bước 4: Trình bày & Phê duyệt
- Trình bày plan rõ ràng bằng tiếng Việt cho người dùng.
- Chờ xác nhận hoặc tiếp thu phản hồi điều chỉnh trước khi code.

## Phối hợp cùng các Agent khác
- **Security Review**: Nếu thay đổi liên quan authentication, quyền hạn (RBAC), hoặc dữ liệu nhạy cảm → đề xuất kích hoạt `security-agent`.
- **Thực thi Code**: Sau khi plan được phê duyệt → chuyển sang `code-agent` để implement.
