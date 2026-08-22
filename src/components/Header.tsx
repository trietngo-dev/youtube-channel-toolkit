import React, { useState, useEffect } from "react";
import {
  Sparkles,
  Key,
  CheckCircle,
  AlertCircle,
  ExternalLink,
  HelpCircle,
  Layers,
  History,
  RefreshCw,
  Video,
  BarChart3,
} from "lucide-react";
import { GEMINI_MODELS } from "../data/gemstoneMatrix";
import { GeminiService } from "../services/geminiService";

interface HeaderProps {
  activeTab: "single" | "batch" | "history" | "youtube" | "analytics";
  setActiveTab: (
    tab: "single" | "batch" | "history" | "youtube" | "analytics",
  ) => void;
  onOpenDirectLinks: () => void;
  onOpenGuide: () => void;
  historyCount: number;
  batchCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  onOpenDirectLinks,
  onOpenGuide,
  historyCount,
  batchCount,
}) => {
  const [apiKey, setApiKey] = useState("");
  const [selectedModel, setSelectedModel] = useState("gemini-2.5-flash");
  const [customModelInput, setCustomModelInput] = useState("");
  const [showKeyModal, setShowKeyModal] = useState(false);
  const [testingConnection, setTestingConnection] = useState(false);
  const [testResult, setTestResult] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  useEffect(() => {
    const savedKey = GeminiService.getStoredApiKey();
    const savedModel = GeminiService.getStoredModel();
    if (savedKey) setApiKey(savedKey);
    if (savedModel) {
      const isPredefined = GEMINI_MODELS.some((m) => m.id === savedModel);
      if (isPredefined) {
        setSelectedModel(savedModel);
      } else {
        setSelectedModel("custom");
        setCustomModelInput(savedModel);
      }
    }
  }, []);

  const handleSaveApiKey = async () => {
    const finalModel =
      selectedModel === "custom"
        ? customModelInput.trim() || "gemini-2.5-flash"
        : selectedModel;
    GeminiService.setStoredApiKey(apiKey);
    GeminiService.setStoredModel(finalModel);

    if (apiKey) {
      setTestingConnection(true);
      setTestResult(null);
      const res = await GeminiService.testConnection(apiKey, finalModel);
      setTestResult(res);
      setTestingConnection(false);
      if (res.success) {
        setTimeout(() => setShowKeyModal(false), 1200);
      }
    } else {
      setShowKeyModal(false);
    }
  };

  const currentEffectiveModel =
    selectedModel === "custom"
      ? customModelInput || "Custom Model"
      : selectedModel;

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 h-16 flex items-center justify-between gap-4">
          {/* Logo & Brand (Left) */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="w-9 h-9 rounded-xl bg-slate-900 flex items-center justify-center text-white shadow-xs">
              <Sparkles className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-sm font-extrabold text-slate-900 tracking-tight">
                  Gemstone Fruit Studio
                </h1>
                <span className="px-1.5 py-0.5 text-[9px] uppercase font-bold bg-slate-100 text-slate-700 border border-slate-300/80 rounded tracking-wider">
                  SHORTS
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium">
                ChatGPT & Gemini Video Studio
              </p>
            </div>
          </div>

          {/* Navigation Tabs (Center - Single Line, Balanced & Sleek) */}
          <nav className="flex items-center bg-slate-100/90 p-1 rounded-xl border border-slate-200/80 gap-1 shrink-0">
            <button
              onClick={() => setActiveTab("single")}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap ${
                activeTab === "single"
                  ? "bg-white text-slate-900 shadow-xs border border-slate-200/80"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/50"
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Tạo Đơn Lẻ</span>
            </button>

            <button
              onClick={() => setActiveTab("batch")}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap ${
                activeTab === "batch"
                  ? "bg-white text-slate-900 shadow-xs border border-slate-200/80"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/50"
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Hàng Đợi Batch</span>
              {batchCount > 0 && (
                <span className="ml-0.5 px-1.5 py-0.2 text-[10px] font-bold bg-slate-900 text-white rounded-full">
                  {batchCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab("history")}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap ${
                activeTab === "history"
                  ? "bg-white text-slate-900 shadow-xs border border-slate-200/80"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/50"
              }`}
            >
              <History className="w-3.5 h-3.5" />
              <span>Kho Kịch Bản</span>
              {historyCount > 0 && (
                <span className="ml-0.5 px-1.5 py-0.2 text-[10px] font-bold bg-slate-200 text-slate-800 rounded-full">
                  {historyCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab("youtube")}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap ${
                activeTab === "youtube"
                  ? "bg-white text-slate-900 shadow-xs border border-slate-200/80"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/50"
              }`}
            >
              <Video className="w-3.5 h-3.5 text-red-600" />
              <span>Auto Đăng YouTube</span>
            </button>

            <button
              onClick={() => setActiveTab("analytics")}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap ${
                activeTab === "analytics"
                  ? "bg-white text-slate-900 shadow-xs border border-slate-200/80"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/50"
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5 text-indigo-600" />
              <span>Quota & Analytics</span>
            </button>
          </nav>

          {/* Action Buttons: API Key, Links, Guide (Right) */}
          <div className="flex items-center gap-2 shrink-0">
            {/* API Key config button */}
            <button
              onClick={() => setShowKeyModal(true)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-semibold transition-all shadow-2xs ${
                apiKey
                  ? "bg-emerald-50/80 border-emerald-300 text-emerald-900 hover:bg-emerald-100"
                  : "bg-amber-50/80 border-amber-300 text-amber-900 hover:bg-amber-100"
              }`}
            >
              <Key className="w-3.5 h-3.5" />
              <span className="max-w-[120px] truncate font-mono text-[11px]">
                {apiKey
                  ? currentEffectiveModel.replace("gemini-", "")
                  : "Nhập API Key"}
              </span>
              <span
                className={`w-2 h-2 rounded-full ${apiKey ? "bg-emerald-500" : "bg-amber-500"}`}
              />
            </button>

            {/* Direct Tool Links */}
            <button
              onClick={onOpenDirectLinks}
              title="Phím tắt mở nhanh ChatGPT, Google VideoFX, Midjourney..."
              className="p-2 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-600 hover:text-slate-900 border border-slate-200 transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
            </button>

            {/* Creation Guide */}
            <button
              onClick={onOpenGuide}
              title="Xem hướng dẫn quy trình tạo Shorts triệu view"
              className="p-2 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-600 hover:text-slate-900 border border-slate-200 transition-colors"
            >
              <HelpCircle className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* API Key & Model Settings Modal */}
      {showKeyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white border border-slate-200 rounded-xl w-full max-w-lg p-6 shadow-xl space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-slate-100 text-slate-800">
                  <Key className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-slate-900">
                    Cài Đặt Google Gemini API
                  </h2>
                  <p className="text-xs text-slate-500">
                    Lưu an toàn cục bộ trên máy tính của bạn
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowKeyModal(false)}
                className="text-slate-400 hover:text-slate-700 text-xl font-bold px-2"
              >
                &times;
              </button>
            </div>

            <div className="space-y-4">
              {/* API Key Input */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Google Gemini API Key
                </label>
                <input
                  type="password"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="AIzaSy..."
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 focus:border-slate-900 rounded-lg text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none transition-colors"
                />
                <p className="text-[11px] text-slate-500 mt-1.5 flex items-center justify-between">
                  <span>Chưa có Key?</span>
                  <a
                    href="https://aistudio.google.com/app/apikey"
                    target="_blank"
                    rel="noreferrer"
                    className="text-slate-900 underline font-medium hover:text-slate-700 flex items-center gap-1"
                  >
                    Lấy miễn phí tại Google AI Studio{" "}
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </p>
              </div>

              {/* Model Selector */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Chọn Mô Hình Gemini AI
                </label>
                <select
                  value={selectedModel}
                  onChange={(e) => setSelectedModel(e.target.value)}
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 focus:border-slate-900 rounded-lg text-sm text-slate-900 focus:outline-none transition-colors cursor-pointer"
                >
                  {GEMINI_MODELS.map((model) => (
                    <option key={model.id} value={model.id}>
                      {model.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Custom Model Input */}
              {selectedModel === "custom" && (
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg space-y-2">
                  <label className="block text-xs font-semibold text-slate-800">
                    Nhập mã Model Gemini tùy chỉnh:
                  </label>
                  <input
                    type="text"
                    value={customModelInput}
                    onChange={(e) => setCustomModelInput(e.target.value)}
                    placeholder="Ví dụ: gemini-3.7-flash, gemini-3.6, gemini-exp-1206..."
                    className="w-full px-3 py-1.5 bg-white border border-slate-300 focus:border-slate-900 rounded-md text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none"
                  />
                  <p className="text-[11px] text-slate-500">
                    Hỗ trợ các model mới nhất 3.7 / 3.6 hoặc model thử nghiệm
                    của Google.
                  </p>
                </div>
              )}

              {/* Test Result Message */}
              {testResult && (
                <div
                  className={`p-3 rounded-lg text-xs flex items-start gap-2 ${
                    testResult.success
                      ? "bg-emerald-50 border border-emerald-300 text-emerald-800"
                      : "bg-rose-50 border border-rose-300 text-rose-800"
                  }`}
                >
                  {testResult.success ? (
                    <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  ) : (
                    <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                  )}
                  <span>{testResult.message}</span>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
              <button
                onClick={() => setShowKeyModal(false)}
                className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition-colors"
              >
                Đóng
              </button>
              <button
                onClick={handleSaveApiKey}
                disabled={testingConnection}
                className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg shadow-sm transition-colors disabled:opacity-50"
              >
                {testingConnection ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    Đang kiểm tra kết nối...
                  </>
                ) : (
                  "Lưu & Kiểm Tra"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
