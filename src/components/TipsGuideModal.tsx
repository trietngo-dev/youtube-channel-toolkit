import React from "react";
import { Sparkles } from "lucide-react";

interface TipsGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TipsGuideModal: React.FC<TipsGuideModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white border border-slate-200 rounded-xl w-full max-w-3xl max-h-[85vh] overflow-y-auto p-6 shadow-2xl space-y-6">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-slate-100 text-slate-800">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Quy Trình Tạo Video YouTube Shorts Triệu View
              </h3>
              <p className="text-xs text-slate-500">
                Chủ đề: Cắt gọt trái cây đá quý phát sáng & chất lỏng ASMR
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 text-xl font-bold px-2"
          >
            &times;
          </button>
        </div>

        <div className="space-y-4 text-xs text-slate-700">
          {/* Step 1 */}
          <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 space-y-2">
            <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
              <span className="w-5 h-5 rounded bg-slate-900 text-white flex items-center justify-center text-xs">
                1
              </span>
              <span>Bước 1: Sinh Concept & Prompts Trên Ứng Dụng</span>
            </div>
            <p className="leading-relaxed text-slate-600">
              Sử dụng tính năng <strong>Tạo Đơn Lẻ</strong> hoặc{" "}
              <strong>Hàng Đợi Batch</strong>. Chọn phối hợp các quả độc lạ (Dưa
              hấu Ruby, Thanh long Amethyst, Bơ Emerald...) kết hợp cùng các
              loại mật trào ra và dao bếp inox sắc bén để tạo kích thích thị
              giác tối đa.
            </p>
          </div>

          {/* Step 2 */}
          <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 space-y-2">
            <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
              <span className="w-5 h-5 rounded bg-slate-900 text-white flex items-center justify-center text-xs">
                2
              </span>
              <span>
                Bước 2: Tạo Ảnh Start & End Bằng ChatGPT (DALL-E 3 / GPT-4o)
              </span>
            </div>
            <ul className="space-y-1.5 list-disc list-inside leading-relaxed text-slate-600">
              <li>
                Mở <strong className="text-slate-900">ChatGPT</strong> và dán{" "}
                <strong>Prompt Ảnh Start (Ảnh Bắt Đầu)</strong> để tạo quả đá
                quý nguyên vẹn theo tỷ lệ dọc 9:16.
              </li>
              <li>
                Sau đó trong cùng đoạn chat, dán tiếp{" "}
                <strong>Prompt Ảnh End (Ảnh Kết Thúc)</strong> để ChatGPT sinh
                ảnh lát cắt tách đôi cùng dòng chất lỏng phát sáng trào ra với
                sự đồng nhất màu sắc tuyệt đối.
              </li>
              <li>Tải 2 bức ảnh Start & End vừa tạo về máy tính.</li>
            </ul>
          </div>

          {/* Step 3 */}
          <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 space-y-2">
            <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
              <span className="w-5 h-5 rounded bg-slate-900 text-white flex items-center justify-center text-xs">
                3
              </span>
              <span>
                Bước 3: Tạo Chuyển Động Video Morphing Bằng Google Gemini Video
                / Veo 2
              </span>
            </div>
            <ul className="space-y-1.5 list-disc list-inside leading-relaxed text-slate-600">
              <li>
                Vào{" "}
                <strong className="text-slate-900">
                  Google Gemini Video (VideoFX / Veo 2)
                </strong>{" "}
                hoặc Kling AI ➔ Chọn tính năng sinh video từ ảnh.
              </li>
              <li>
                Tải <strong>Ảnh Start</strong> vào khung Ảnh 1 (First Frame) và{" "}
                <strong>Ảnh End</strong> vào khung Ảnh 2 (Last Frame).
              </li>
              <li>
                Dán đoạn <strong>Prompt Video Morphing Cho Gemini</strong> từ
                ứng dụng này vào ô mô tả chuyển động.
              </li>
              <li>
                Gemini / Veo sẽ tự động tạo chuyển động nhát dao cắt đôi mượt mà
                và dòng chất lỏng phun trào cực kỳ chân thực ở 60fps!
              </li>
            </ul>
          </div>

          {/* Step 4 */}
          <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 space-y-2">
            <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
              <span className="w-5 h-5 rounded bg-slate-900 text-white flex items-center justify-center text-xs">
                4
              </span>
              <span>
                Bước 4: Ghép Âm Thanh ASMR & Hook Text (CapCut / Premiere)
              </span>
            </div>
            <ul className="space-y-1.5 list-disc list-inside leading-relaxed text-slate-600">
              <li>
                Chèn chữ <strong>Hook Text 3 Giây Đầu</strong> (ví dụ:{" "}
                <em>"Would you eat this $1,000,000 Ruby Fruit?"</em>) nổi bật
                giữa màn hình.
              </li>
              <li>
                Lồng tiếng hiệu ứng âm thanh: Tiếng dao chạm đá, tiếng đá nứt
                giòn tan, tiếng mật rỉ và tiếng bass trầm ngay khoảnh khắc nhát
                dao bổ đôi.
              </li>
            </ul>
          </div>

          {/* Step 5 */}
          <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 space-y-2">
            <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
              <span className="w-5 h-5 rounded bg-slate-900 text-white flex items-center justify-center text-xs">
                5
              </span>
              <span>Bước 5: Tối Ưu Tiêu Đề & Đăng Lên YouTube Shorts</span>
            </div>
            <p className="leading-relaxed text-slate-600">
              Copy <strong>Tiêu Đề Viral</strong>,{" "}
              <strong>Nội Dung Mô Tả (Description)</strong> và{" "}
              <strong>Bộ Hashtags</strong> trong tab SEO của ứng dụng để gắn vào
              YouTube Shorts giúp video được phân phối mạnh vào luồng Shorts
              Feed quốc tế.
            </p>
          </div>
        </div>

        <div className="pt-2 text-center border-t border-slate-100">
          <button
            onClick={onClose}
            className="px-6 py-2.5 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-lg shadow-sm transition-colors"
          >
            Đã Hiểu - Bắt Đầu Sáng Tạo Ngay!
          </button>
        </div>
      </div>
    </div>
  );
};
