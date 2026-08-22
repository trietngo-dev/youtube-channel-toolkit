import React, { useState, useEffect } from "react";
import {
  Play,
  Pause,
  Square,
  RotateCcw,
  Trash2,
  Download,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Layers,
  Sparkles,
  Sliders,
} from "lucide-react";
import { QueueService, QueueState } from "../services/queueService";
import {
  BatchTaskItem,
  GenerationConfig,
  GeneratedShortsIdea,
  ItemCategory,
} from "../types";
import {
  CATEGORIES,
  FRUITS,
  MATERIALS_BY_CATEGORY,
  FILLINGS_BY_CATEGORY,
  TOOLS,
  AESTHETICS,
} from "../data/gemstoneMatrix";
import { ExportService } from "../services/exportService";
import { PromptOutputCard } from "./PromptOutputCard";

interface BatchQueueManagerProps {
  onToggleFavorite: (id: string) => void;
}

export const BatchQueueManager: React.FC<BatchQueueManagerProps> = ({
  onToggleFavorite,
}) => {
  const queue = QueueService.getInstance();
  const [tasks, setTasks] = useState<BatchTaskItem[]>([]);
  const [queueState, setQueueState] = useState<QueueState>("idle");
  const [stats, setStats] = useState({
    total: 0,
    completed: 0,
    failed: 0,
    currentTaskIndex: -1,
  });
  const [batchCategory, setBatchCategory] = useState<"all" | ItemCategory>(
    "all",
  );
  const [batchCount, setBatchCount] = useState<number>(5);
  const [delaySeconds, setDelaySeconds] = useState<number>(3.5);
  const [selectedResult, setSelectedResult] =
    useState<GeneratedShortsIdea | null>(null);

  useEffect(() => {
    const unsubscribe = queue.subscribe((updatedTasks, state, updatedStats) => {
      setTasks(updatedTasks);
      setQueueState(state);
      setStats(updatedStats);
    });

    return () => unsubscribe();
  }, []);

  const handleDelayChange = (val: number) => {
    setDelaySeconds(val);
    queue.setDelayMs(val * 1000);
  };

  // Generate random combinations for batch
  const handleAddRandomBatch = () => {
    const pool =
      batchCategory === "all"
        ? FRUITS
        : FRUITS.filter((f) => f.category === batchCategory);

    const activePool = pool.length > 0 ? pool : FRUITS;
    const configs: GenerationConfig[] = [];

    for (let i = 0; i < batchCount; i++) {
      const fruit = activePool[Math.floor(Math.random() * activePool.length)];
      const cat = fruit.category || "fruit";
      const catMaterials =
        MATERIALS_BY_CATEGORY[cat] || MATERIALS_BY_CATEGORY.fruit;
      const catFillings =
        FILLINGS_BY_CATEGORY[cat] || FILLINGS_BY_CATEGORY.fruit;

      const gemstone =
        catMaterials[Math.floor(Math.random() * catMaterials.length)];
      const fluid = catFillings[Math.floor(Math.random() * catFillings.length)];
      const tool = TOOLS[Math.floor(Math.random() * TOOLS.length)];
      const style = AESTHETICS[Math.floor(Math.random() * AESTHETICS.length)];

      configs.push({
        category: cat,
        fruit,
        gemstone,
        fluid,
        tool,
        style,
        videoPlatform: "gemini_veo",
        aspectRatio: "9:16",
        language: "both",
      });
    }

    queue.addTasks(configs);
  };

  const handleStartQueue = () => {
    queue.start();
  };

  const handlePauseQueue = () => {
    queue.pause();
  };

  const handleResumeQueue = () => {
    queue.resume();
  };

  const handleStopQueue = () => {
    queue.stop();
  };

  const handleClearQueue = () => {
    if (
      window.confirm("Bạn có chắc chắn muốn xóa toàn bộ hàng đợi này không?")
    ) {
      queue.clear();
      setSelectedResult(null);
    }
  };

  const handleExportBatchCSV = () => {
    const completedIdeas = tasks
      .filter((t) => t.status === "success" && t.result)
      .map((t) => t.result as GeneratedShortsIdea);

    if (completedIdeas.length === 0) {
      alert("Chưa có task nào hoàn thành để xuất file.");
      return;
    }

    ExportService.exportToCSV(
      completedIdeas,
      `gemstone_batch_${Date.now()}.csv`,
    );
  };

  const progressPercentage =
    stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0;

  return (
    <div className="space-y-6">
      {/* Top Config & Queue Dispatcher */}
      <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
          <div>
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Layers className="w-5 h-5 text-slate-800" />
              <span>Hàng Đợi Sinh Hàng Loạt (Smart Quota Batch Queue)</span>
            </h2>
            <p className="text-xs text-slate-500">
              Tự động điều tiết tốc độ (Throttle) và xử lý Exponential Backoff
              chống lỗi 429 Quota Exceeded
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-600 font-medium">
              Độ trễ mỗi request:
            </span>
            <div className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200">
              <Sliders className="w-3.5 h-3.5 text-slate-600" />
              <input
                type="range"
                min="1.5"
                max="8.0"
                step="0.5"
                value={delaySeconds}
                onChange={(e) => handleDelayChange(parseFloat(e.target.value))}
                className="w-20 accent-slate-900 cursor-pointer"
              />
              <span className="text-xs font-bold text-slate-900 w-8">
                {delaySeconds}s
              </span>
            </div>
          </div>
        </div>

        {/* Category Filter for Batch */}
        <div className="space-y-1.5 pt-1">
          <span className="text-xs font-semibold text-slate-700 block">
            Chọn chủ đề sinh hàng loạt:
          </span>
          <div className="flex flex-wrap gap-1.5">
            <button
              onClick={() => setBatchCategory("all")}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-colors ${
                batchCategory === "all"
                  ? "bg-slate-900 text-white border-slate-900 shadow-xs"
                  : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
              }`}
            >
              ✨ Tất cả 6 chủ đề
            </button>
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setBatchCategory(cat.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-colors flex items-center gap-1 ${
                  batchCategory === cat.id
                    ? "bg-slate-900 text-white border-slate-900 shadow-xs"
                    : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                }`}
              >
                <span>{cat.emoji}</span>
                <span>{cat.nameVi}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Batch Creation Controls */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-slate-100">
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold text-slate-700">
              Số lượng concept:
            </span>
            <div className="flex gap-1.5">
              {[5, 10, 15, 20, 30].map((count) => (
                <button
                  key={count}
                  onClick={() => setBatchCount(count)}
                  className={`px-3 py-1.5 rounded-md text-xs font-bold border transition-colors ${
                    batchCount === count
                      ? "bg-slate-900 text-white border-slate-900 shadow-xs"
                      : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                  }`}
                >
                  +{count}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleAddRandomBatch}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold shadow-xs transition-colors"
          >
            <Sparkles className="w-4 h-4 text-white" />
            <span>Thêm {batchCount} Concept Ngẫu Nhiên Vào Hàng Đợi</span>
          </button>
        </div>
      </div>

      {/* Queue Dashboard & Progress Banner */}
      <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          {/* Status Metrics */}
          <div className="grid grid-cols-4 gap-3 w-full sm:w-auto">
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-center">
              <span className="text-[10px] uppercase font-bold text-slate-500">
                Tổng Số
              </span>
              <p className="text-lg font-bold text-slate-900">{stats.total}</p>
            </div>
            <div className="p-3 bg-emerald-50 rounded-lg border border-emerald-200 text-center">
              <span className="text-[10px] uppercase font-bold text-emerald-800">
                Thành Công
              </span>
              <p className="text-lg font-bold text-emerald-800">
                {stats.completed}
              </p>
            </div>
            <div className="p-3 bg-rose-50 rounded-lg border border-rose-200 text-center">
              <span className="text-[10px] uppercase font-bold text-rose-800">
                Lỗi / Thử Lại
              </span>
              <p className="text-lg font-bold text-rose-800">{stats.failed}</p>
            </div>
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-center">
              <span className="text-[10px] uppercase font-bold text-slate-600">
                Trạng Thái
              </span>
              <p className="text-xs font-bold text-slate-900 mt-1 capitalize">
                {queueState === "running" && "Đang chạy ⚡"}
                {queueState === "paused" && "Tạm dừng ⏸️"}
                {queueState === "stopped" && "Đã dừng ⏹️"}
                {queueState === "idle" && "Sẵn sàng ✅"}
              </p>
            </div>
          </div>

          {/* Queue Operation Buttons (Solid Colors) */}
          <div className="flex flex-wrap items-center gap-2 self-end sm:self-auto">
            {queueState === "idle" || queueState === "stopped" ? (
              <button
                onClick={handleStartQueue}
                disabled={tasks.length === 0 || stats.completed === stats.total}
                className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs disabled:opacity-40 transition-colors"
              >
                <Play className="w-4 h-4 fill-white" />
                <span>Bắt Đầu Xử Lý</span>
              </button>
            ) : queueState === "running" ? (
              <button
                onClick={handlePauseQueue}
                className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold shadow-xs transition-colors"
              >
                <Pause className="w-4 h-4 fill-white" />
                <span>Tạm Dừng</span>
              </button>
            ) : (
              <button
                onClick={handleResumeQueue}
                className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs transition-colors"
              >
                <Play className="w-4 h-4 fill-white" />
                <span>Tiếp Tục</span>
              </button>
            )}

            {queueState === "running" && (
              <button
                onClick={handleStopQueue}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold border border-slate-200 transition-colors"
              >
                <Square className="w-3.5 h-3.5 fill-current" />
                <span>Dừng</span>
              </button>
            )}

            {stats.failed > 0 && (
              <button
                onClick={() => queue.retryAllFailed()}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-800 text-xs font-semibold border border-rose-200 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Thử Lại Lỗi ({stats.failed})</span>
              </button>
            )}

            <button
              onClick={handleExportBatchCSV}
              disabled={stats.completed === 0}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold shadow-xs disabled:opacity-40 transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>Xuất CSV ({stats.completed})</span>
            </button>

            {tasks.length > 0 && (
              <button
                onClick={handleClearQueue}
                title="Xóa danh sách"
                className="p-2 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Progress Bar */}
        {stats.total > 0 && (
          <div className="space-y-1">
            <div className="flex justify-between text-xs text-slate-600 font-medium">
              <span>
                Tiến độ hoàn thành: {stats.completed}/{stats.total} concepts
              </span>
              <span className="font-bold text-slate-900">
                {progressPercentage}%
              </span>
            </div>
            <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
              <div
                className="h-full bg-slate-900 transition-all duration-300"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Task List Grid */}
      {tasks.length === 0 ? (
        <div className="p-12 rounded-xl bg-white border border-dashed border-slate-300 text-center space-y-3">
          <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-500">
            <Layers className="w-6 h-6" />
          </div>
          <h3 className="text-sm font-bold text-slate-800">
            Hàng đợi đang trống
          </h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Bấm nút "+5 / +10 Concept Ngẫu Nhiên" ở trên để đưa các kịch bản vào
            hàng đợi tạo tự động.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wide">
            Danh Sách Tác Vụ Trong Hàng Đợi ({tasks.length})
          </h3>

          <div className="space-y-2 max-h-96 overflow-y-auto pr-1 custom-scrollbar">
            {tasks.map((task, index) => {
              return (
                <div
                  key={task.id}
                  className={`p-3.5 rounded-lg border transition-colors flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 ${
                    task.status === "processing"
                      ? "bg-slate-100 border-slate-900 shadow-xs"
                      : task.status === "success"
                        ? "bg-white border-slate-200"
                        : task.status === "failed"
                          ? "bg-rose-50 border-rose-200"
                          : "bg-white border-slate-200"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono text-slate-400 w-6">
                      #{index + 1}
                    </span>
                    <span className="text-lg">{task.config.fruit.emoji}</span>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 flex items-center gap-2">
                        <span>
                          {task.config.fruit.nameVi}{" "}
                          {task.config.gemstone.nameVi}
                        </span>
                        <span className="text-[10px] text-slate-500 font-normal">
                          ({task.config.fluid.nameVi})
                        </span>
                      </h4>
                      <p className="text-[11px] text-slate-500">
                        {task.config.tool.nameVi} • {task.config.style.nameVi}
                      </p>
                      {task.error && (
                        <p className="text-[11px] text-rose-600 mt-1 flex items-center gap-1">
                          <AlertTriangle className="w-3 h-3" />
                          <span>{task.error}</span>
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Status Badge & Actions */}
                  <div className="flex items-center gap-2 self-end sm:self-auto">
                    {task.status === "pending" && (
                      <span className="flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-semibold bg-slate-100 text-slate-600">
                        <Clock className="w-3 h-3" /> Đang chờ
                      </span>
                    )}

                    {task.status === "processing" && (
                      <span className="flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-semibold bg-slate-900 text-white">
                        <div className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                        Đang tạo...
                      </span>
                    )}

                    {task.status === "success" && (
                      <div className="flex items-center gap-2">
                        <span className="flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
                          <CheckCircle2 className="w-3 h-3" /> Hoàn thành
                        </span>
                        {task.result && (
                          <button
                            onClick={() => setSelectedResult(task.result!)}
                            className="px-2.5 py-1 rounded-md bg-slate-900 hover:bg-slate-800 text-xs font-semibold text-white transition-colors"
                          >
                            Xem Prompt
                          </button>
                        )}
                      </div>
                    )}

                    {task.status === "failed" && (
                      <button
                        onClick={() => queue.retryTask(task.id)}
                        className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-rose-100 hover:bg-rose-200 text-rose-800 text-xs font-semibold transition-colors"
                      >
                        <RotateCcw className="w-3 h-3" /> Thử lại
                      </button>
                    )}

                    <button
                      onClick={() => queue.removeTask(task.id)}
                      className="p-1 text-slate-400 hover:text-slate-700"
                    >
                      &times;
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Quick View Modal for Selected Result */}
      {selectedResult && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white border border-slate-200 rounded-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto p-4 sm:p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900">
                Chi Tiết Kịch Bản & Prompt Concept
              </h3>
              <button
                onClick={() => setSelectedResult(null)}
                className="text-slate-400 hover:text-slate-700 text-xl font-bold px-2"
              >
                &times;
              </button>
            </div>
            <PromptOutputCard
              idea={selectedResult}
              onToggleFavorite={onToggleFavorite}
            />
          </div>
        </div>
      )}
    </div>
  );
};
