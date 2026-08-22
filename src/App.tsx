import { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import { Header } from "./components/Header";
import { MatrixSelector } from "./components/MatrixSelector";
import { PromptOutputCard } from "./components/PromptOutputCard";
import { BatchQueueManager } from "./components/BatchQueueManager";
import { HistoryView } from "./components/HistoryView";
import { YouTubeUploaderView } from "./components/YouTubeUploaderView";
import { AnalyticsDashboardView } from "./components/AnalyticsDashboardView";
import { DirectLinksModal } from "./components/DirectLinksModal";
import { TipsGuideModal } from "./components/TipsGuideModal";
import { GeminiService } from "./services/geminiService";
import { QueueService } from "./services/queueService";
import { YouTubeService } from "./services/youtubeService";
import { GenerationConfig, GeneratedShortsIdea } from "./types";
import { AlertCircle, Sparkles } from "lucide-react";

export function App() {
  const [activeTab, setActiveTab] = useState<
    "single" | "batch" | "history" | "youtube" | "analytics"
  >("single");
  const [currentIdea, setCurrentIdea] = useState<GeneratedShortsIdea | null>(
    null,
  );
  const [history, setHistory] = useState<GeneratedShortsIdea[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isDirectLinksOpen, setIsDirectLinksOpen] = useState(false);
  const [isGuideOpen, setIsGuideOpen] = useState(false);

  // Load history from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem("gemstone_fruit_history");
      if (saved) {
        const parsed = JSON.parse(saved);
        setHistory(parsed);
        if (parsed.length > 0) {
          setCurrentIdea(parsed[0]);
        }
      }
    } catch (e) {
      console.error("Failed to load history:", e);
    }
  }, []);

  // Save history to localStorage
  const saveHistory = (updated: GeneratedShortsIdea[]) => {
    setHistory(updated);
    try {
      localStorage.setItem("gemstone_fruit_history", JSON.stringify(updated));
    } catch (e) {
      console.error("Failed to save history to storage:", e);
    }
  };

  // Register Queue callback for completed batch items
  useEffect(() => {
    const queue = QueueService.getInstance();
    queue.setOnItemCompleted((newIdea) => {
      setHistory((prev) => {
        const updated = [newIdea, ...prev.filter((i) => i.id !== newIdea.id)];
        try {
          localStorage.setItem(
            "gemstone_fruit_history",
            JSON.stringify(updated),
          );
        } catch {
          // ignore
        }
        return updated;
      });
    });
  }, []);

  const handleGenerate = async (config: GenerationConfig) => {
    setIsGenerating(true);
    setError(null);

    try {
      const newIdea = await GeminiService.generateShortsIdea(config);
      setCurrentIdea(newIdea);
      const updated = [newIdea, ...history.filter((i) => i.id !== newIdea.id)];
      saveHistory(updated);

      // Trigger victory confetti
      confetti({
        particleCount: 70,
        spread: 80,
        origin: { y: 0.6 },
        colors: [
          config.gemstone.colorHex,
          config.fluid.colorHex,
          "#ff2a6d",
          "#05d9e8",
        ],
      });
    } catch (err: unknown) {
      const msg =
        err instanceof Error ? err.message : "Đã có lỗi xảy ra khi tạo prompt.";
      setError(msg);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleToggleFavorite = (id: string) => {
    const updated = history.map((item) =>
      item.id === id ? { ...item, isFavorite: !item.isFavorite } : item,
    );
    saveHistory(updated);
    if (currentIdea && currentIdea.id === id) {
      setCurrentIdea({ ...currentIdea, isFavorite: !currentIdea.isFavorite });
    }
  };

  const handleDeleteIdea = (id: string) => {
    const updated = history.filter((item) => item.id !== id);
    saveHistory(updated);
    if (currentIdea && currentIdea.id === id) {
      setCurrentIdea(updated[0] || null);
    }
  };

  const handleClearAllHistory = () => {
    saveHistory([]);
    setCurrentIdea(null);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 flex flex-col font-sans">
      {/* Header Navigation */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenDirectLinks={() => setIsDirectLinksOpen(true)}
        onOpenGuide={() => setIsGuideOpen(true)}
        historyCount={history.length}
        batchCount={0}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        {/* Error Alert */}
        {error && (
          <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-start gap-3 shadow-xs">
            <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="font-bold">Lỗi khi gọi Gemini API:</p>
              <p className="mt-0.5 leading-relaxed">{error}</p>
            </div>
            <button
              onClick={() => setError(null)}
              className="text-rose-500 hover:text-rose-800 font-bold text-base px-1"
            >
              &times;
            </button>
          </div>
        )}

        {/* TAB 1: SINGLE STUDIO */}
        {activeTab === "single" && (
          <div className="space-y-6">
            <MatrixSelector
              onGenerate={handleGenerate}
              isLoading={isGenerating}
            />

            {/* Generated Output Card */}
            {currentIdea && (
              <div className="space-y-3 animate-fadeIn">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wide flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-slate-700" />
                    <span>Bộ Kịch Bản & Prompts Đã Tạo:</span>
                  </h3>
                  <span className="text-[11px] text-slate-500">
                    Tương thích ChatGPT • Google Gemini Video / Veo 2 •
                    Midjourney • Kling AI
                  </span>
                </div>
                <PromptOutputCard
                  idea={currentIdea}
                  onToggleFavorite={handleToggleFavorite}
                  onDelete={handleDeleteIdea}
                />
              </div>
            )}
          </div>
        )}

        {/* TAB 2: BATCH QUEUE */}
        {activeTab === "batch" && (
          <BatchQueueManager onToggleFavorite={handleToggleFavorite} />
        )}

        {/* TAB 3: HISTORY & FAVORITES */}
        {activeTab === "history" && (
          <HistoryView
            ideas={history}
            onToggleFavorite={handleToggleFavorite}
            onDeleteIdea={handleDeleteIdea}
            onClearAll={handleClearAllHistory}
          />
        )}

        {/* TAB 4: YOUTUBE AUTO-UPLOADER & FOLDER SCANNER */}
        {activeTab === "youtube" && (
          <YouTubeUploaderView
            historyIdeas={history}
            onNavigateToAnalytics={() => setActiveTab("analytics")}
          />
        )}

        {/* TAB 5: DASHBOARD ANALYTICS & QUOTA */}
        {activeTab === "analytics" && (
          <AnalyticsDashboardView
            videoQueue={[]}
            scheduleConfig={YouTubeService.getScheduleConfig()}
            onNavigateToUploader={() => setActiveTab("youtube")}
          />
        )}
      </main>

      {/* Modals */}
      <DirectLinksModal
        isOpen={isDirectLinksOpen}
        onClose={() => setIsDirectLinksOpen(false)}
      />

      <TipsGuideModal
        isOpen={isGuideOpen}
        onClose={() => setIsGuideOpen(false)}
      />

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-4 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>
            Gemstone Fruit AI Studio © 2026 — Công cụ hỗ trợ sản xuất YouTube
            Shorts chuyên sâu
          </span>
          <span className="text-[11px] text-slate-400">
            Tối ưu cho Google Gemini Video, ChatGPT và thuật toán YouTube Shorts
            quốc tế
          </span>
        </div>
      </footer>
    </div>
  );
}
export default App;
