# TypeScript / JavaScript Conventions

## Naming Conventions
- Biến, hàm, phương thức: `camelCase` (ví dụ: `getUserById`, `isLoading`)
- Class, Interface, Type alias, Enum: `PascalCase` (ví dụ: `UserProfile`, `PaymentStatus`)
- Constants, Enum values: `UPPER_SNAKE_CASE` (ví dụ: `MAX_RETRY_COUNT`, `API_BASE_URL`)
- File names: `kebab-case.ts` hoặc `camelCase.ts` (tuân theo convention hiện có của project)
- Boolean variables: prefix `is`, `has`, `should`, `can` (ví dụ: `isValid`, `hasPermission`)

## Code Style & Best Practices
- Ưu tiên `const` > `let`, tuyệt đối không dùng `var`.
- Dùng arrow functions cho callbacks và anonymous functions.
- Ưu tiên `interface` thay vì `type` khi khai báo object shapes (mở rộng tốt hơn).
- Sử dụng optional chaining (`?.`) và nullish coalescing (`??`) thay vì kiểm tra falsy.
- Destructuring khi truy cập nhiều properties từ cùng một object.
- Tránh `any` — sử dụng `unknown` nếu cần và thu hẹp type bằng type guards.
- Giữ độ dài function ngắn gọn (lý tưởng dưới 30-40 dòng), mỗi function chỉ làm một việc duy nhất (Single Responsibility).

## Module & Imports
- Thứ tự imports:
  1. Node.js built-in modules (ví dụ: `path`, `fs`)
  2. External dependencies / npm packages (ví dụ: `express`, `lodash`)
  3. Internal aliased modules (ví dụ: `@/services`, `@/models`)
  4. Relative local imports (ví dụ: `./utils`, `../types`)
- Mỗi nhóm cách nhau một dòng trống.
- Ưu tiên named exports thay vì default exports.

## Error Handling
- Luôn xử lý errors qua try/catch hoặc error handling middleware.
- Log error với đầy đủ ngữ cảnh (tên hàm, tham số đầu vào, stack trace).
- Tạo custom Error classes cho domain errors nếu cần thiết.

## TypeScript Strict Mode
- Đảm bảo code pass `strict: true` trong `tsconfig.json`.
- Khai báo rõ ràng return type cho các public functions và methods.
- Hạn chế sử dụng non-null assertion operator (`!`).
