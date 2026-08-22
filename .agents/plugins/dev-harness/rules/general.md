# Quy Tắc Chung — Dev Harness

## Ngôn ngữ giao tiếp
- Luôn trao đổi với người dùng bằng **tiếng Việt**.
- Viết tài liệu kế hoạch (implementation plan), walkthrough, và hướng dẫn bằng **tiếng Việt**.
- Code comments có thể viết bằng tiếng Anh hoặc tiếng Việt tùy theo quy ước hiện có của project.

## Nguyên tắc làm việc
- Luôn đọc và hiểu cấu trúc project hiện có trước khi thực hiện thay đổi.
- Không xóa comments hoặc documentation không liên quan đến thay đổi hiện tại.
- Tuân thủ các design patterns và conventions đã có trong codebase.
- Khi không chắc chắn về yêu cầu hoặc ý định thiết kế, hãy hỏi người dùng thay vì tự đưa ra giả định.
- Chia nhỏ các thay đổi thành các commit hoặc tasks có ý nghĩa rõ ràng.

## Khi sử dụng các Agent Skills
- Với task phức tạp hoặc tính năng mới lớn: sử dụng `plan-agent` trước → `code-agent` → `review-agent` → `test-agent`.
- Với bug fix đơn giản hoặc thay đổi nhỏ: có thể sử dụng trực tiếp `code-agent` → `test-agent`.
- Luôn cân nhắc gọi `security-agent` khi task liên quan đến authentication, authorization, input validation, hoặc xử lý dữ liệu nhạy cảm.
- Gọi `doc-agent` sau khi code đã ổn định để cập nhật JSDoc, README, và CHANGELOG.
