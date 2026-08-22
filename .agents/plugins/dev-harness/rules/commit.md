# Commit Conventions

## Format
Sử dụng chuẩn Conventional Commits (v1.0.0):

```text
<type>(<scope>): <short description>

[optional body]

[optional footer(s)]
```

## Commit Types
- `feat`: Thêm tính năng mới cho người dùng
- `fix`: Sửa lỗi (bug fix)
- `docs`: Thêm hoặc cập nhật documentation
- `style`: Thay đổi format, dấu chấm phẩy, white-space (không ảnh hưởng logic code)
- `refactor`: Tái cấu trúc code (không thêm feature mới, không fix bug)
- `perf`: Cải thiện hiệu năng (performance optimization)
- `test`: Thêm hoặc cập nhật test cases
- `chore`: Cập nhật build scripts, package dependencies, cấu hình công cụ

## Quy Tắc Chi Tiết
- Commit message viết bằng **tiếng Anh**.
- Dòng tiêu đề (header) không vượt quá 72 ký tự.
- Sử dụng thể mệnh lệnh ở hiện tại (imperative mood): ví dụ "add feature" thay vì "added feature" hoặc "adds feature".
- Không kết thúc dòng tiêu đề bằng dấu chấm.
- Mỗi commit chỉ nên thực hiện một mục đích logic duy nhất (atomic commit).
- Tuyệt đối không commit credentials, tokens, secrets, hoặc file `node_modules`.
