# [Tên Tính Năng / Thay Đổi Kiến Trúc]

Mô tả ngắn gọn bối cảnh vấn đề và mục tiêu đạt được sau khi hoàn thành.

## 1. Yêu Cầu Cần Đáp Ứng
- **Yêu cầu chức năng**:
  - [ ] Chức năng A...
  - [ ] Chức năng B...
- **Yêu cầu kỹ thuật**:
  - Tuân thủ TypeScript strict mode
  - Không phá vỡ backwards compatibility

## 2. Các Điểm Cần Người Dùng Xác Nhận (User Review Required)
> [!IMPORTANT]
> Ghi chú những thay đổi quan trọng hoặc quyết định thiết kế cần user phản hồi.

## 3. Danh Sách Thay Đổi Đề Xuất

### Core Layer / Domain
- `[NEW]` `src/core/feature.ts` — Mô tả chức năng file mới
- `[MODIFY]` `src/core/index.ts` — Export thêm module mới

### Service Layer / API
- `[MODIFY]` `src/services/api-service.ts` — Thêm endpoint xử lý

### Testing
- `[NEW]` `tests/feature.test.ts` — Unit test cho chức năng mới

---

## 4. Kế Hoạch Thực Hiện Theo Thứ Tự (Execution Steps)
1. Tạo data types và models trong `src/types/`
2. Implement core logic trong `src/core/`
3. Tích hợp vào service/controller layer
4. Viết unit tests và integration tests
5. Cập nhật tài liệu API

---

## 5. Đánh Giá Rủi Ro & Giải Pháp Giảm Thiểu

| Rủi Ro | Mức Độ | Giải Pháp Giảm Thiểu |
| :--- | :---: | :--- |
| Breaking change API cũ | Vừa | Tạo version mới cho endpoint hoặc deprecation warning |
| Hiệu năng khi tải dữ liệu lớn | Thấp | Áp dụng pagination và caching |

---

## 6. Kế Hoạch Kiểm Thử (Verification Plan)
- **Unit Tests**: Chạy `npm test` kiểm tra 100% test cases pass.
- **Manual Verification**: Kiểm tra trực tiếp các luồng thành công và luồng lỗi.
