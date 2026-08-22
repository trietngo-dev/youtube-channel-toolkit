# Automated Testing Patterns & Templates

Tài liệu mẫu cấu trúc kiểm thử chuẩn dành cho Test Agent (Jest / Vitest).

---

## 1. Cấu Trúc Kiểm Thử Chuẩn (Arrange - Act - Assert)

```typescript
import { calculateDiscount } from '../src/discount';

describe('calculateDiscount', () => {
  it('should apply 10% discount for orders above $100', () => {
    // Arrange (Chuẩn bị dữ liệu)
    const orderTotal = 150;
    const isVip = false;

    // Act (Thực thi hành động)
    const finalPrice = calculateDiscount(orderTotal, isVip);

    // Assert (Xác minh kết quả)
    expect(finalPrice).toBe(135);
  });

  it('should throw an error when order total is negative', () => {
    // Arrange
    const invalidTotal = -10;

    // Act & Assert
    expect(() => calculateDiscount(invalidTotal, false)).toThrow('Invalid order total');
  });
});
```

---

## 2. Kiểm Thử Hàm Bất Đồng Bộ (Async Testing)

```typescript
import { fetchUserData } from '../src/user-service';

describe('fetchUserData', () => {
  it('should return user profile when API responds successfully', async () => {
    const userId = 'user-123';
    const result = await fetchUserData(userId);

    expect(result).toBeDefined();
    expect(result.id).toBe(userId);
  });
});
```

---

## 3. Mocking Dependencies

```typescript
import { sendNotification } from '../src/notifier';
import { emailClient } from '../src/email-client';

jest.mock('../src/email-client');

describe('sendNotification', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should call emailClient with proper parameters', async () => {
    const mockSend = jest.spyOn(emailClient, 'send').mockResolvedValue(true);

    await sendNotification('admin@example.com', 'System Alert');

    expect(mockSend).toHaveBeenCalledTimes(1);
    expect(mockSend).toHaveBeenCalledWith('admin@example.com', 'System Alert');
  });
});
```

---

## 4. Nguyên Tắc Viết Tests Tốt
- **FIRST Principle**: Fast (Nhanh), Independent (Độc lập), Repeatable (Lặp lại được), Self-validating (Tự kiểm chứng), Timely (Kịp thời).
- Mỗi test case chỉ nên kiểm tra một hành vi duy nhất.
- Đặt tên mô tả rõ ràng: `it('should [kết quả mong đợi] when [điều kiện kích hoạt]')`.
