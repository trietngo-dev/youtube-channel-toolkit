import React from "react";
import { ExternalLink, Video, Image, PlaySquare } from "lucide-react";

interface DirectLinksModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DirectLinksModal: React.FC<DirectLinksModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  const links = [
    {
      category: "Công Cụ Tạo Video AI (Image-to-Video)",
      icon: Video,
      items: [
        {
          name: "Google Gemini Video / VideoFX (Veo 2)",
          url: "https://aitestkitchen.withgoogle.com/tools/video-fx",
          desc: "Nền tảng Video AI DeepMind & Gemini (Tạo chuyển động mượt từ 2 ảnh)",
        },
        {
          name: "Google AI Studio (Gemini)",
          url: "https://aistudio.google.com",
          desc: "Thử nghiệm các model Gemini mới nhất của Google",
        },
        {
          name: "Kling AI (First/Last Frame)",
          url: "https://klingai.com",
          desc: "Hỗ trợ tải 2 ảnh Start & End morphing mượt mà",
        },
        {
          name: "RunwayML Gen-3 Alpha",
          url: "https://runwayml.com",
          desc: "Chất lượng chuyển động vật lý cao cấp",
        },
      ],
    },
    {
      category: "Công Cụ Tạo Ảnh AI (Image Generation)",
      icon: Image,
      items: [
        {
          name: "ChatGPT (OpenAI / DALL-E 3)",
          url: "https://chatgpt.com",
          desc: "Khuyên dùng để tạo ảnh Start & End theo phong cách đá quý 9:16",
        },
        {
          name: "Midjourney (Discord / Web)",
          url: "https://midjourney.com",
          desc: "Chất lượng chi tiết quang học đá quý số 1",
        },
        {
          name: "Leonardo AI",
          url: "https://leonardo.ai",
          desc: "Tạo ảnh nhanh, hỗ trợ Flux.1 và canvas",
        },
      ],
    },
    {
      category: "Kênh & Công Cụ Hỗ Trợ",
      icon: PlaySquare,
      items: [
        {
          name: "YouTube Studio Upload",
          url: "https://studio.youtube.com",
          desc: "Đăng tải video Shorts và cài đặt SEO",
        },
        {
          name: "Google AI Studio (Lấy API Key)",
          url: "https://aistudio.google.com/app/apikey",
          desc: "Quản lý và cấp mới API Key",
        },
      ],
    },
  ];

  const handleOpenUrl = (url: string) => {
    if (
      window.electronAPI &&
      typeof window.electronAPI.openExternal === "function"
    ) {
      window.electronAPI.openExternal(url);
    } else {
      window.open(url, "_blank");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white border border-slate-200 rounded-xl w-full max-w-2xl max-h-[85vh] overflow-y-auto p-6 shadow-2xl space-y-6">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-slate-100 text-slate-800">
              <ExternalLink className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Phím Tắt Mở Nhanh Các Nền Tảng AI
              </h3>
              <p className="text-xs text-slate-500">
                Truy cập trực tiếp các công cụ sinh ảnh và video
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

        <div className="space-y-5">
          {links.map((group, idx) => {
            const Icon = group.icon;
            return (
              <div key={idx} className="space-y-2.5">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-2">
                  <Icon className="w-4 h-4 text-slate-700" />
                  <span>{group.category}</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {group.items.map((item, i) => (
                    <button
                      key={i}
                      onClick={() => handleOpenUrl(item.url)}
                      className="p-3 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200 hover:border-slate-400 text-left transition-colors group flex flex-col justify-between"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-bold text-slate-900 group-hover:text-slate-900">
                          {item.name}
                        </span>
                        <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-900 transition-transform" />
                      </div>
                      <p className="text-[11px] text-slate-500 line-clamp-1">
                        {item.desc}
                      </p>
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <div className="pt-2 text-center border-t border-slate-100">
          <button
            onClick={onClose}
            className="px-5 py-2 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};
