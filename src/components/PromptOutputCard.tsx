import React, { useState } from "react";
import {
  Copy,
  Check,
  Star,
  Trash2,
  Image,
  Sparkles,
  Hash,
  Volume2,
  Film,
  Share2,
} from "lucide-react";
import { GeneratedShortsIdea } from "../types";

interface PromptOutputCardProps {
  idea: GeneratedShortsIdea;
  onToggleFavorite: (id: string) => void;
  onDelete?: (id: string) => void;
}

export const PromptOutputCard: React.FC<PromptOutputCardProps> = ({
  idea,
  onToggleFavorite,
  onDelete,
}) => {
  const [activeTab, setActiveTab] = useState<"start" | "end" | "video" | "seo">(
    "start",
  );
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const copyAllPrompts = () => {
    const combined = `=== GEMSTONE FRUIT SHORTS PACKAGE ===
CONCEPT: ${idea.conceptTitle}
FRUIT: ${idea.config?.fruit?.nameVi} (${idea.config?.fruit?.nameEn})
GEM: ${idea.config?.gemstone?.nameVi} (${idea.config?.gemstone?.nameEn})
FLUID: ${idea.config?.fluid?.nameVi} (${idea.config?.fluid?.nameEn})

[1. START FRAME PROMPT (ChatGPT / DALL-E 3)]
${idea.startImagePrompt?.chatgpt || idea.startImagePrompt?.midjourney}

[2. END FRAME PROMPT (ChatGPT / DALL-E 3)]
${idea.endImagePrompt?.chatgpt || idea.endImagePrompt?.midjourney}

[3. VIDEO MORPHING PROMPT (Google Gemini Video / Veo 2)]
${idea.videoMorphingPrompt?.geminiVeo || idea.videoMorphingPrompt?.klingAI}

[4. YOUTUBE SHORTS VIRAL TITLES (EN)]
${idea.seo?.viralTitlesVi?.map((t, i) => `${i + 1}. ${t}`).join("\n")}

[5. YOUTUBE DESCRIPTION]
${idea.seo?.descriptionTemplate}

[6. HASHTAGS]
${idea.seo?.hashtags?.join(" ")}
`;
    copyToClipboard(combined, "all");
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm transition-all hover:border-slate-300">
      {/* Card Header */}
      <div className="p-4 sm:p-5 bg-slate-50 border-b border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-2xl shrink-0 shadow-xs">
            {idea.config?.fruit?.emoji || "💎"}
          </div>
          <div>
            <h3 className="text-sm sm:text-base font-bold text-slate-900 flex items-center gap-2">
              <span>{idea.conceptTitle}</span>
              <span className="text-xs px-2 py-0.5 rounded bg-slate-200 text-slate-700 font-medium">
                {idea.config?.gemstone?.nameVi}
              </span>
            </h3>
            <p className="text-[11px] text-slate-500 flex items-center gap-2 mt-0.5">
              <span>
                {new Date(idea.timestamp).toLocaleTimeString("vi-VN")}
              </span>
              <span>•</span>
              <span className="text-slate-700 font-medium">
                {idea.config?.fluid?.nameVi}
              </span>
              <span>•</span>
              <span className="text-slate-700">
                {idea.config?.tool?.nameVi}
              </span>
            </p>
          </div>
        </div>

        {/* Header Action Buttons (Solid Monochrome) */}
        <div className="flex items-center gap-2 self-end sm:self-auto">
          <button
            onClick={copyAllPrompts}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold shadow-xs transition-colors"
          >
            {copiedKey === "all" ? (
              <Check className="w-3.5 h-3.5 text-emerald-400" />
            ) : (
              <Share2 className="w-3.5 h-3.5 text-white" />
            )}
            <span>
              {copiedKey === "all" ? "Đã Copy Toàn Bộ" : "Copy All Package"}
            </span>
          </button>

          <button
            onClick={() => onToggleFavorite(idea.id)}
            title={idea.isFavorite ? "Bỏ lưu yêu thích" : "Lưu yêu thích"}
            className={`p-2 rounded-lg border transition-colors ${
              idea.isFavorite
                ? "bg-amber-50 border-amber-300 text-amber-600"
                : "bg-white border-slate-200 text-slate-400 hover:text-slate-700 hover:bg-slate-50"
            }`}
          >
            <Star
              className={`w-4 h-4 ${idea.isFavorite ? "fill-amber-500 text-amber-500" : ""}`}
            />
          </button>

          {onDelete && (
            <button
              onClick={() => onDelete(idea.id)}
              title="Xóa ý tưởng này"
              className="p-2 rounded-lg bg-white hover:bg-rose-50 text-slate-400 hover:text-rose-600 border border-slate-200 hover:border-rose-200 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Tabs Navigation (Minimalist Monochrome) */}
      <div className="flex items-center border-b border-slate-200 bg-white px-3 pt-2 gap-1 overflow-x-auto custom-scrollbar">
        <button
          onClick={() => setActiveTab("start")}
          className={`flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-t-lg transition-colors border-b-2 ${
            activeTab === "start"
              ? "border-slate-900 text-slate-900 bg-slate-50"
              : "border-transparent text-slate-500 hover:text-slate-800"
          }`}
        >
          <Image className="w-3.5 h-3.5" />
          <span>1. Ảnh Start (ChatGPT)</span>
        </button>

        <button
          onClick={() => setActiveTab("end")}
          className={`flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-t-lg transition-colors border-b-2 ${
            activeTab === "end"
              ? "border-slate-900 text-slate-900 bg-slate-50"
              : "border-transparent text-slate-500 hover:text-slate-800"
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>2. Ảnh End (ChatGPT Lát Cắt)</span>
        </button>

        <button
          onClick={() => setActiveTab("video")}
          className={`flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-t-lg transition-colors border-b-2 ${
            activeTab === "video"
              ? "border-slate-900 text-slate-900 bg-slate-50"
              : "border-transparent text-slate-500 hover:text-slate-800"
          }`}
        >
          <Film className="w-3.5 h-3.5" />
          <span>3. Video Morphing (Gemini / Veo 2)</span>
        </button>

        <button
          onClick={() => setActiveTab("seo")}
          className={`flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-t-lg transition-colors border-b-2 ${
            activeTab === "seo"
              ? "border-slate-900 text-slate-900 bg-slate-50"
              : "border-transparent text-slate-500 hover:text-slate-800"
          }`}
        >
          <Hash className="w-3.5 h-3.5" />
          <span>4. YouTube SEO (English)</span>
        </button>
      </div>

      {/* Tab Content Panels */}
      <div className="p-4 sm:p-5">
        {/* TAB 1: START IMAGE PROMPT */}
        {activeTab === "start" && (
          <div className="space-y-4">
            {/* Primary ChatGPT / DALL-E 3 Prompt Box */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                  <Image className="w-4 h-4 text-slate-700" />
                  <span className="px-2 py-0.5 rounded bg-slate-200 text-[10px] uppercase font-bold tracking-wide">
                    ChatGPT / DALL-E 3
                  </span>
                  Prompt Ảnh Start (Quả Nguyên Vẹn)
                </span>
                <button
                  onClick={() =>
                    copyToClipboard(
                      idea.startImagePrompt?.chatgpt ||
                        idea.startImagePrompt?.midjourney ||
                        "",
                      "gpt-start",
                    )
                  }
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold shadow-xs transition-colors"
                >
                  {copiedKey === "gpt-start" ? (
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                  <span>
                    {copiedKey === "gpt-start" ? "Đã Copy" : "Copy Cho ChatGPT"}
                  </span>
                </button>
              </div>
              <p className="text-xs text-slate-800 font-mono leading-relaxed select-all bg-white p-3 rounded-lg border border-slate-200">
                {idea.startImagePrompt?.chatgpt ||
                  idea.startImagePrompt?.midjourney}
              </p>
              <p className="text-[11px] text-slate-500">
                💡{" "}
                <em>
                  Dán vào ChatGPT để tạo bức ảnh đầu tiên (tỷ lệ dọc 9:16).
                </em>
              </p>
            </div>

            {/* Midjourney v6.1 Start Frame Alternative */}
            <div className="p-3.5 rounded-xl bg-white border border-slate-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-600">
                  Midjourney v6.1 / Flux.1 Prompt
                </span>
                <button
                  onClick={() =>
                    copyToClipboard(
                      idea.startImagePrompt?.midjourney || "",
                      "mj-start",
                    )
                  }
                  className="text-xs text-slate-500 hover:text-slate-900 flex items-center gap-1"
                >
                  {copiedKey === "mj-start" ? (
                    <Check className="w-3 h-3 text-emerald-600" />
                  ) : (
                    <Copy className="w-3 h-3" />
                  )}
                  <span>Copy</span>
                </button>
              </div>
              <p className="text-xs text-slate-700 font-mono leading-relaxed select-all">
                {idea.startImagePrompt?.midjourney}
              </p>
            </div>
          </div>
        )}

        {/* TAB 2: END IMAGE PROMPT */}
        {activeTab === "end" && (
          <div className="space-y-4">
            {/* Primary ChatGPT End Frame Prompt Box */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-slate-700" />
                  <span className="px-2 py-0.5 rounded bg-slate-200 text-[10px] uppercase font-bold tracking-wide">
                    ChatGPT / DALL-E 3
                  </span>
                  Prompt Ảnh End (Lát Cắt & Mật Chảy)
                </span>
                <button
                  onClick={() =>
                    copyToClipboard(
                      idea.endImagePrompt?.chatgpt ||
                        idea.endImagePrompt?.midjourney ||
                        "",
                      "gpt-end",
                    )
                  }
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold shadow-xs transition-colors"
                >
                  {copiedKey === "gpt-end" ? (
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                  <span>
                    {copiedKey === "gpt-end" ? "Đã Copy" : "Copy Cho ChatGPT"}
                  </span>
                </button>
              </div>
              <p className="text-xs text-slate-800 font-mono leading-relaxed select-all bg-white p-3 rounded-lg border border-slate-200">
                {idea.endImagePrompt?.chatgpt ||
                  idea.endImagePrompt?.midjourney}
              </p>
              <p className="text-[11px] text-slate-500">
                💡{" "}
                <em>
                  Dán tiếp vào cùng cuộc trò chuyện với ChatGPT để giữ nguyên
                  phong cách và màu sắc đá quý.
                </em>
              </p>
            </div>

            {/* Midjourney v6.1 End Frame */}
            <div className="p-3.5 rounded-xl bg-white border border-slate-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-600">
                  Midjourney v6.1 / Flux.1 End Frame Prompt
                </span>
                <button
                  onClick={() =>
                    copyToClipboard(
                      idea.endImagePrompt?.midjourney || "",
                      "mj-end",
                    )
                  }
                  className="text-xs text-slate-500 hover:text-slate-900 flex items-center gap-1"
                >
                  {copiedKey === "mj-end" ? (
                    <Check className="w-3 h-3 text-emerald-600" />
                  ) : (
                    <Copy className="w-3 h-3" />
                  )}
                  <span>Copy</span>
                </button>
              </div>
              <p className="text-xs text-slate-700 font-mono leading-relaxed select-all">
                {idea.endImagePrompt?.midjourney}
              </p>
            </div>
          </div>
        )}

        {/* TAB 3: VIDEO MORPHING */}
        {activeTab === "video" && (
          <div className="space-y-4">
            {/* Google Gemini Video / Veo 2 Primary Prompt */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                  <Film className="w-4 h-4 text-slate-700" />
                  <span className="px-2 py-0.5 rounded bg-slate-200 text-[10px] uppercase font-bold tracking-wide">
                    Google Gemini / Veo 2
                  </span>
                  Prompt Tạo Video Morphing Từ 2 Ảnh
                </span>
                <button
                  onClick={() =>
                    copyToClipboard(
                      idea.videoMorphingPrompt?.geminiVeo ||
                        idea.videoMorphingPrompt?.klingAI ||
                        "",
                      "gemini-video",
                    )
                  }
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold shadow-xs transition-colors"
                >
                  {copiedKey === "gemini-video" ? (
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                  <span>
                    {copiedKey === "gemini-video"
                      ? "Đã Copy Cho Gemini"
                      : "Copy Cho Gemini Video"}
                  </span>
                </button>
              </div>
              <p className="text-xs text-slate-900 font-mono leading-relaxed select-all bg-white p-3 rounded-lg border border-slate-200">
                {idea.videoMorphingPrompt?.geminiVeo ||
                  idea.videoMorphingPrompt?.klingAI}
              </p>
              <p className="text-[11px] text-slate-500">
                💡{" "}
                <em>
                  Tải ảnh Start (Ảnh 1) và ảnh End (Ảnh 2) vào Gemini / VideoFX
                  rồi dán prompt này để AI tạo chuyển động cắt và dòng chảy.
                </em>
              </p>
            </div>

            {/* Runway & Settings Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="p-3 rounded-xl bg-white border border-slate-200 space-y-1">
                <span className="text-[11px] font-semibold text-slate-600">
                  Runway Gen-3 Alpha Turbo:
                </span>
                <p className="text-xs text-slate-800 font-mono select-all">
                  {idea.videoMorphingPrompt?.runwayGen3}
                </p>
              </div>

              <div className="p-3 rounded-xl bg-white border border-slate-200 space-y-1.5 text-xs text-slate-700">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Chuyển động Camera:</span>
                  <span className="font-semibold text-slate-900">
                    {idea.videoMorphingPrompt?.cameraMotion}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Cường độ Motion:</span>
                  <span className="font-semibold text-slate-900">
                    {idea.videoMorphingPrompt?.motionIntensity}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">
                    Thời lượng khuyên dùng:
                  </span>
                  <span className="font-semibold text-slate-900">
                    {idea.videoMorphingPrompt?.durationRecommendation}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: YOUTUBE SEO & AUDIO */}
        {activeTab === "seo" && (
          <div className="space-y-4">
            {/* Viral Titles (English) */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-900">
                🔥 Tiêu Đề YouTube Shorts Viral (English Titles):
              </span>
              <div className="space-y-1.5">
                {idea.seo?.viralTitlesVi?.map((title, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-between text-xs text-slate-900"
                  >
                    <span className="font-medium">{title}</span>
                    <button
                      onClick={() => copyToClipboard(title, `title-${idx}`)}
                      className="text-slate-500 hover:text-slate-900 shrink-0 ml-2 px-2 py-1 bg-white border border-slate-200 rounded text-[11px] font-medium"
                    >
                      {copiedKey === `title-${idx}` ? "Đã Copy" : "Copy"}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* YouTube Description Box */}
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900">
                  📝 Nội Dung Mô Tả YouTube Shorts (Description):
                </span>
                <button
                  onClick={() =>
                    copyToClipboard(idea.seo?.descriptionTemplate || "", "desc")
                  }
                  className="flex items-center gap-1 text-xs px-2.5 py-1 rounded bg-slate-900 text-white font-semibold"
                >
                  {copiedKey === "desc" ? (
                    <Check className="w-3 h-3" />
                  ) : (
                    <Copy className="w-3 h-3" />
                  )}
                  <span>
                    {copiedKey === "desc" ? "Đã Copy" : "Copy Description"}
                  </span>
                </button>
              </div>
              <pre className="text-xs text-slate-800 font-sans whitespace-pre-wrap bg-white p-3 rounded-lg border border-slate-200 select-all">
                {idea.seo?.descriptionTemplate}
              </pre>
            </div>

            {/* 3s Hook & Audio Cues */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="p-3.5 rounded-xl bg-white border border-slate-200 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900">
                    ⚡ Chữ Hook 3 Giây Đầu (Overlay Text):
                  </span>
                  <button
                    onClick={() =>
                      copyToClipboard(idea.seo?.hookText3s || "", "hook-text")
                    }
                    className="text-slate-500 hover:text-slate-900"
                  >
                    {copiedKey === "hook-text" ? (
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
                <p className="text-xs text-slate-800 font-medium bg-slate-50 p-2 rounded-lg border border-slate-200">
                  "{idea.seo?.hookText3s}"
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-white border border-slate-200 space-y-1.5">
                <span className="text-xs font-bold text-slate-900 flex items-center gap-1">
                  <Volume2 className="w-3.5 h-3.5 text-slate-700" />
                  Gợi Ý Âm Thanh ASMR & Nhạc Nền:
                </span>
                <ul className="text-[11px] text-slate-600 space-y-1 list-disc list-inside">
                  {idea.seo?.audioSoundDesign?.soundEffects?.map((sfx, i) => (
                    <li key={i}>{sfx}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Hashtags */}
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-700">
                  Bộ Hashtags Chuẩn Thuật Toán Shorts:
                </span>
                <button
                  onClick={() =>
                    copyToClipboard(idea.seo?.hashtags?.join(" ") || "", "tags")
                  }
                  className="flex items-center gap-1 text-xs text-slate-900 font-bold hover:underline"
                >
                  {copiedKey === "tags" ? (
                    <Check className="w-3 h-3 text-emerald-600" />
                  ) : (
                    <Copy className="w-3 h-3" />
                  )}
                  <span>
                    {copiedKey === "tags" ? "Đã copy" : "Copy tất cả tags"}
                  </span>
                </button>
              </div>
              <p className="text-xs text-slate-800 font-mono select-all bg-white p-2.5 rounded border border-slate-200">
                {idea.seo?.hashtags?.join(" ")}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
