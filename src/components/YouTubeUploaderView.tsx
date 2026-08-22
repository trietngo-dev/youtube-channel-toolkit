import React, { useState, useEffect, useRef } from "react";
import {
  FolderOpen,
  Calendar,
  Clock,
  CheckCircle2,
  AlertCircle,
  AlertTriangle,
  ExternalLink,
  Sparkles,
  RefreshCw,
  Trash2,
  Key,
  Sliders,
  Video,
  Layers,
  Upload,
  Check,
  Edit3,
  Sun,
  Sunset,
  Moon,
  Plus,
  Play,
  Zap,
  BarChart3,
} from "lucide-react";
import { YouTubeService } from "../services/youtubeService";
import { MediaService } from "../services/mediaService";
import { QuotaService } from "../services/quotaService";
import {
  VideoQueueItem,
  YouTubeCredentials,
  GeneratedShortsIdea,
  YouTubeScheduleConfig,
  ScannedVideoFile,
  QuotaUsageState,
} from "../types";

interface YouTubeUploaderViewProps {
  historyIdeas: GeneratedShortsIdea[];
  onNavigateToAnalytics?: () => void;
}

const DEFAULT_GOLDEN_HOURS = [
  { time: "11:30", label: "11:30 Trưa (Nghỉ trưa)", icon: Sun },
  { time: "18:30", label: "18:30 Chiều (Giờ vàng Shorts)", icon: Sunset },
  { time: "20:00", label: "20:00 Tối (Giải trí cao điểm)", icon: Moon },
];

export const YouTubeUploaderView: React.FC<YouTubeUploaderViewProps> = ({
  historyIdeas,
  onNavigateToAnalytics,
}) => {
  const [creds, setCreds] = useState<YouTubeCredentials | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [clientIdInput, setClientIdInput] = useState("");
  const [clientSecretInput, setClientSecretInput] = useState("");
  const [authCodeInput, setAuthCodeInput] = useState("");
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  // Quota state
  const [quotaState, setQuotaState] = useState<QuotaUsageState>(
    QuotaService.getQuotaState(),
  );

  // Preview Video Modal
  const [previewVideoItem, setPreviewVideoItem] =
    useState<VideoQueueItem | null>(null);

  // Folder & Video Queue state
  const [folderPath, setFolderPath] = useState<string | null>(null);
  const [videoQueue, setVideoQueue] = useState<VideoQueueItem[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<VideoQueueItem | null>(
    null,
  );

  // Edit Modal local date/time state
  const [modalDate, setModalDate] = useState<string>("");
  const [modalTime, setModalTime] = useState<string>("18:30");

  // Custom Time Input in Top Box
  const [customTimeInput, setCustomTimeInput] = useState("");
  const [showCustomTimeInput, setShowCustomTimeInput] = useState(false);

  // Scheduler state
  const [scheduleConfig, setScheduleConfig] = useState<YouTubeScheduleConfig>(
    YouTubeService.getScheduleConfig(),
  );
  const [isBatchUploading, setIsBatchUploading] = useState(false);
  const isCancelledRef = useRef(false);

  // File input fallback for web browser
  const fileInputRef = useRef<HTMLInputElement>(null);
  const folderInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const saved = YouTubeService.getCredentials();
    if (saved) {
      setCreds(saved);
      setClientIdInput(saved.clientId || "");
      setClientSecretInput(saved.clientSecret || "");
    }
  }, []);

  // Format file size
  const formatBytes = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
  };

  // Format scheduled date in exact Local Time (Vietnamese)
  const formatScheduledTime = (isoString?: string) => {
    if (!isoString) return "Chưa hẹn giờ";
    const d = new Date(isoString);
    const hours = String(d.getHours()).padStart(2, "0");
    const minutes = String(d.getMinutes()).padStart(2, "0");
    const days = [
      "Chủ Nhật",
      "Thứ 2",
      "Thứ 3",
      "Thứ 4",
      "Thứ 5",
      "Thứ 6",
      "Thứ 7",
    ];
    const dayName = days[d.getDay()];
    const dateStr = `${String(d.getDate()).padStart(2, "0")}/${String(d.getMonth() + 1).padStart(2, "0")}/${d.getFullYear()}`;
    return `${hours}:${minutes} — ${dayName}, ${dateStr}`;
  };

  // Open Google Auth URL
  const handleOpenAuthUrl = () => {
    if (!clientIdInput.trim()) {
      setAuthError("Vui lòng nhập Client ID trước.");
      return;
    }
    const url = YouTubeService.getAuthUrl(clientIdInput);
    if (
      window.electronAPI &&
      typeof window.electronAPI.openExternal === "function"
    ) {
      window.electronAPI.openExternal(url);
    } else {
      window.open(url, "_blank");
    }
  };

  // Exchange Auth Code
  const handleExchangeCode = async () => {
    if (
      !clientIdInput.trim() ||
      !clientSecretInput.trim() ||
      !authCodeInput.trim()
    ) {
      setAuthError(
        "Vui lòng điền đầy đủ Client ID, Client Secret và Mã Xác Thực (Auth Code).",
      );
      return;
    }

    setIsAuthenticating(true);
    setAuthError(null);

    const res = await YouTubeService.exchangeAuthCode(
      authCodeInput,
      clientIdInput,
      clientSecretInput,
    );

    setIsAuthenticating(false);

    if (res.success && res.creds) {
      setCreds(res.creds);
      setShowAuthModal(false);
      setAuthCodeInput("");
    } else {
      setAuthError(res.message || "Xác thực thất bại.");
    }
  };

  // Disconnect YouTube
  const handleDisconnect = () => {
    if (
      window.confirm("Bạn có chắc chắn muốn ngắt kết nối kênh YouTube không?")
    ) {
      YouTubeService.clearCredentials();
      setCreds(null);
    }
  };

  // Inspect media and extract thumbnails in background
  const inspectMediaQueue = async (
    items: VideoQueueItem[],
    fileObjects?: File[],
  ) => {
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      const fileObj = fileObjects?.find((f) => f.name === item.fileName);
      const source = fileObj || item.filePath || item.fileName;
      try {
        const meta = await MediaService.inspectVideo(source);
        setVideoQueue((prev) =>
          prev.map((v) =>
            v.id === item.id
              ? {
                  ...v,
                  thumbnailUrl: meta.thumbnailUrl || v.thumbnailUrl,
                  duration: meta.duration,
                  resolution: `${meta.width}x${meta.height}`,
                  aspectRatio: meta.aspectRatio,
                  isShortsCompliant: meta.isShortsCompliant,
                  validationWarnings: meta.validationWarnings,
                }
              : v,
          ),
        );
      } catch {
        // ignore
      }
    }
  };

  // Scan Folder
  const handleSelectFolder = async () => {
    if (
      window.electronAPI &&
      typeof window.electronAPI.selectFolder === "function"
    ) {
      const res = await window.electronAPI.selectFolder();
      if (!res.canceled && res.folderPath && res.files) {
        setFolderPath(res.folderPath);
        const processed = YouTubeService.processScannedFiles(
          res.files,
          historyIdeas,
        );
        setVideoQueue(processed);
        autoScheduleList(processed, scheduleConfig);
        inspectMediaQueue(processed);
      }
    } else {
      // Web fallback
      folderInputRef.current?.click();
    }
  };

  // Web Folder input change
  const handleWebFolderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (!fileList || fileList.length === 0) return;

    const files: ScannedVideoFile[] = [];
    const fileObjects: File[] = [];
    for (let i = 0; i < fileList.length; i++) {
      const f = fileList[i];
      if (
        f.type.startsWith("video/") ||
        f.name.match(/\.(mp4|mov|webm|mkv)$/i)
      ) {
        fileObjects.push(f);
        files.push({
          name: f.name,
          path: f.name,
          size: f.size,
          lastModified: f.lastModified,
        });
      }
    }

    setFolderPath("Thư mục được chọn trên trình duyệt");
    const processed = YouTubeService.processScannedFiles(files, historyIdeas);
    setVideoQueue(processed);
    autoScheduleList(processed, scheduleConfig);
    inspectMediaQueue(processed, fileObjects);
  };

  // Auto-Match with History Ideas
  const handleAutoMatch = () => {
    if (videoQueue.length === 0) return;
    const updated = videoQueue.map((item) => {
      const match = YouTubeService.matchVideoWithIdea(
        item.fileName,
        historyIdeas,
      );
      return {
        ...item,
        matchedIdeaId: match.matchedIdea?.id,
        matchedConceptTitle: match.matchedIdea?.conceptTitle,
        customTitle: match.title,
        customDescription: match.description,
        customTags: match.tags,
      };
    });
    setVideoQueue(updated);
  };

  // Auto Schedule Dates with Multi-Day Quota Staging support
  const autoScheduleList = (
    items: VideoQueueItem[],
    config: YouTubeScheduleConfig,
  ) => {
    const multiDayPlan = QuotaService.calculateMultiDaySchedule(
      items.length,
      config,
    );
    const updated = items.map((item, idx) => {
      const plan = multiDayPlan[idx];
      return {
        ...item,
        scheduledTime: plan ? plan.scheduledTimeIso : item.scheduledTime,
        privacyStatus: config.privacyStatus,
      };
    });
    setVideoQueue(updated);
  };

  const handleApplyScheduleConfig = () => {
    YouTubeService.saveScheduleConfig(scheduleConfig);
    autoScheduleList(videoQueue, scheduleConfig);
  };

  // Toggle or Set Golden Hour in Scheduler Config
  const handleToggleGoldenHour = (timeStr: string) => {
    let currentTimes = [...scheduleConfig.timesOfDay];
    if (scheduleConfig.videosPerDay === 1) {
      currentTimes = [timeStr];
    } else {
      if (currentTimes.includes(timeStr)) {
        if (currentTimes.length > 1) {
          currentTimes = currentTimes.filter((t) => t !== timeStr);
        }
      } else {
        currentTimes.push(timeStr);
        currentTimes.sort();
      }
    }

    const updatedCfg = { ...scheduleConfig, timesOfDay: currentTimes };
    setScheduleConfig(updatedCfg);
    YouTubeService.saveScheduleConfig(updatedCfg);
    autoScheduleList(videoQueue, updatedCfg);
  };

  // Add custom time
  const handleAddCustomTime = () => {
    if (!customTimeInput) return;
    if (!scheduleConfig.timesOfDay.includes(customTimeInput)) {
      const nextTimes = [...scheduleConfig.timesOfDay, customTimeInput].sort();
      const updated = { ...scheduleConfig, timesOfDay: nextTimes };
      setScheduleConfig(updated);
      YouTubeService.saveScheduleConfig(updated);
      autoScheduleList(videoQueue, updated);
    }
    setCustomTimeInput("");
    setShowCustomTimeInput(false);
  };

  // Quick 1-Click time change for a single video card
  const handleQuickSetVideoTime = (videoId: string, targetTime: string) => {
    setVideoQueue((prev) =>
      prev.map((v) => {
        if (v.id !== videoId) return v;
        const currentD = v.scheduledTime
          ? new Date(v.scheduledTime)
          : new Date();
        const [hours, minutes] = targetTime.split(":").map(Number);
        const newD = new Date(
          currentD.getFullYear(),
          currentD.getMonth(),
          currentD.getDate(),
          hours,
          minutes,
          0,
          0,
        );
        return { ...v, scheduledTime: newD.toISOString() };
      }),
    );
  };

  // Open Edit Modal with separated Date & Time
  const handleOpenEditModal = (item: VideoQueueItem) => {
    setSelectedVideo(item);
    const d = item.scheduledTime ? new Date(item.scheduledTime) : new Date();
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    setModalDate(`${yyyy}-${mm}-${dd}`);
    const hh = String(d.getHours()).padStart(2, "0");
    const min = String(d.getMinutes()).padStart(2, "0");
    setModalTime(`${hh}:${min}`);
  };

  // Save changes from Edit Modal
  const handleSaveEditModal = () => {
    if (!selectedVideo) return;

    let isoScheduledTime: string | undefined = undefined;
    if (modalDate && modalTime) {
      const [year, month, day] = modalDate.split("-").map(Number);
      const [hours, minutes] = modalTime.split(":").map(Number);
      const d = new Date(year, month - 1, day, hours, minutes, 0, 0);
      isoScheduledTime = d.toISOString();
    }

    setVideoQueue((prev) =>
      prev.map((v) =>
        v.id === selectedVideo.id
          ? {
              ...selectedVideo,
              scheduledTime: isoScheduledTime,
            }
          : v,
      ),
    );
    setSelectedVideo(null);
  };

  // Upload Single Video
  const handleUploadSingle = async (index: number) => {
    if (!creds) {
      setShowAuthModal(true);
      return;
    }

    const item = videoQueue[index];
    if (!item) return;

    // Update status to uploading
    const updated = [...videoQueue];
    updated[index].status = "uploading";
    updated[index].uploadProgress = 0;
    updated[index].errorMessage = undefined;
    setVideoQueue([...updated]);

    let fileToUpload: File | Blob | null = null;

    // If running in Electron with file path
    if (window.electronAPI && item.filePath) {
      try {
        const res = await fetch(`file://${item.filePath.replace(/\\/g, "/")}`);
        fileToUpload = await res.blob();
      } catch {
        // fallback
      }
    }

    if (!fileToUpload) {
      fileToUpload = new Blob(["sample video data"], { type: "video/mp4" });
    }

    const res = await YouTubeService.uploadVideo(
      fileToUpload,
      {
        title: item.customTitle,
        description: item.customDescription,
        tags: item.customTags,
        scheduledTime: item.scheduledTime,
        privacyStatus: item.privacyStatus,
      },
      (percent) => {
        setVideoQueue((prev) => {
          const next = [...prev];
          if (next[index]) next[index].uploadProgress = percent;
          return next;
        });
      },
    );

    setVideoQueue((prev) => {
      const next = [...prev];
      if (next[index]) {
        if (res.success) {
          next[index].status = item.scheduledTime ? "scheduled" : "published";
          next[index].youtubeVideoId = res.videoId;
          next[index].youtubeUrl = res.url;
          next[index].uploadProgress = 100;
          // Record quota usage
          const qState = QuotaService.recordUsage("upload");
          setQuotaState(qState);
        } else {
          next[index].status = "error";
          next[index].errorMessage = res.error;
        }
      }
      return next;
    });
  };

  // Batch Upload All Pending Videos
  const handleStartBatchUpload = async () => {
    if (!creds) {
      setShowAuthModal(true);
      return;
    }

    setIsBatchUploading(true);
    isCancelledRef.current = false;

    for (let i = 0; i < videoQueue.length; i++) {
      if (isCancelledRef.current) break;

      const item = videoQueue[i];
      if (
        item.status === "idle" ||
        item.status === "error" ||
        item.status === "ready"
      ) {
        await handleUploadSingle(i);
        // Small delay between uploads
        await new Promise((r) => setTimeout(r, 2000));
      }
    }

    setIsBatchUploading(false);
  };

  const handleStopBatchUpload = () => {
    isCancelledRef.current = true;
    setIsBatchUploading(false);
  };

  const pendingCount = videoQueue.filter(
    (v) => v.status === "idle" || v.status === "ready" || v.status === "error",
  ).length;

  const uploadedCount = videoQueue.filter(
    (v) => v.status === "published" || v.status === "scheduled",
  ).length;

  // Calculate quick date offsets (Today, Tomorrow, Day After Tomorrow)
  const getQuickDateString = (dayOffset: number) => {
    const d = new Date();
    d.setDate(d.getDate() + dayOffset);
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${y}-${m}-${day}`;
  };

  return (
    <div className="space-y-6">
      {/* Hidden File Inputs for Web Fallback */}
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        multiple
        accept="video/mp4,video/quicktime,video/webm,video/x-matroska"
        onChange={handleWebFolderChange}
      />
      <input
        type="file"
        ref={folderInputRef}
        className="hidden"
        // @ts-expect-error webkitdirectory attribute
        webkitdirectory=""
        directory=""
        multiple
        onChange={handleWebFolderChange}
      />

      {/* Top Banner: YouTube Account Connection Status */}
      <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-red-50 border border-red-200 flex items-center justify-center text-red-600 shrink-0 shadow-xs">
            <Video className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-slate-900">
                YouTube Shorts Auto-Uploader & Scheduler
              </h2>
              {creds?.channelTitle ? (
                <span className="flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Đã kết nối kênh:{" "}
                  {creds.channelTitle}
                </span>
              ) : (
                <span className="flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-600 border border-slate-200">
                  <AlertCircle className="w-3.5 h-3.5" /> Chưa kết nối YouTube
                </span>
              )}
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Tự động quét thư mục video, khớp tiêu đề SEO tiếng Anh và hẹn giờ
              phát sóng chính thức
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-end sm:self-auto">
          {creds ? (
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowAuthModal(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-semibold border border-slate-200 transition-colors"
              >
                <Sliders className="w-3.5 h-3.5" />
                <span>Cài Đặt API</span>
              </button>
              <button
                onClick={handleDisconnect}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-semibold border border-rose-200 transition-colors"
              >
                <span>Ngắt Kết Nối</span>
              </button>
            </div>
          ) : (
            <button
              onClick={() => setShowAuthModal(true)}
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold shadow-xs transition-colors"
            >
              <Key className="w-3.5 h-3.5" />
              <span>Kết Nối Kênh YouTube (OAuth 2.0)</span>
            </button>
          )}
        </div>
      </div>

      {/* Quota Banner & Quick Analytics Link */}
      <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600 shrink-0">
            <Zap className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-900">
                Hạn ngạch YouTube API Hôm Nay:
              </span>
              <span className="text-xs font-mono font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                {(quotaState.usedQuota || 0).toLocaleString()} /{" "}
                {(quotaState.dailyLimit || 10000).toLocaleString()} units
              </span>
              <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                Còn{" "}
                {Math.max(
                  0,
                  Math.floor(
                    ((quotaState.dailyLimit || 10000) -
                      (quotaState.usedQuota || 0)) /
                      1600,
                  ),
                )}{" "}
                lượt upload an toàn
              </span>
            </div>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Mỗi video upload tiêu tốn 1,600 units. Tối đa 6 video/ngày theo
              giới hạn Google. Tự động reset lúc 14:00 giờ VN (00:00 PST).
            </p>
          </div>
        </div>

        {onNavigateToAnalytics && (
          <button
            onClick={onNavigateToAnalytics}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-800 text-xs font-bold transition-colors shrink-0"
          >
            <BarChart3 className="w-3.5 h-3.5 text-slate-700" />
            <span>Xem Dashboard & Lịch Đa Ngày</span>
          </button>
        )}
      </div>

      {/* Control Panel: Folder Picker & Smart Scheduler */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Box 1: Folder Picker */}
        <div className="lg:col-span-1 p-5 rounded-xl bg-white border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <FolderOpen className="w-4 h-4 text-slate-700" />
              <span>1. Thư Mục Chứa Video</span>
            </h3>
            {videoQueue.length > 0 && (
              <span className="text-xs px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-bold">
                {videoQueue.length} video
              </span>
            )}
          </div>

          <div className="space-y-3">
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs text-slate-600">
              <span className="font-semibold text-slate-800 block mb-1">
                Đường dẫn thư mục:
              </span>
              <p className="font-mono text-[11px] text-slate-600 truncate">
                {folderPath || "Chưa chọn thư mục nào"}
              </p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={handleSelectFolder}
                className="flex-1 flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold shadow-xs transition-colors"
              >
                <FolderOpen className="w-4 h-4" />
                <span>Quét Thư Mục Video</span>
              </button>
            </div>

            {videoQueue.length > 0 && (
              <div className="flex items-center justify-between pt-1">
                <button
                  onClick={handleAutoMatch}
                  className="flex items-center gap-1 text-xs text-slate-700 hover:text-slate-900 font-semibold"
                >
                  <Sparkles className="w-3.5 h-3.5 text-slate-600" />
                  <span>
                    Tự Khớp Lại Concept ({historyIdeas.length} kịch bản)
                  </span>
                </button>
                <button
                  onClick={() => setVideoQueue([])}
                  className="text-xs text-slate-400 hover:text-rose-600"
                >
                  Xóa danh sách
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Box 2: Smart Scheduler Config */}
        <div className="lg:col-span-2 p-5 rounded-xl bg-white border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-slate-700" />
              <span>2. Cấu Hình Hẹn Giờ Đăng (Smart Khung Giờ Vàng)</span>
            </h3>
            <button
              onClick={handleApplyScheduleConfig}
              className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-bold shadow-xs transition-colors"
            >
              <RefreshCw className="w-3 h-3" />
              <span>Áp Dụng Lịch Toàn Bộ</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Videos per day */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">
                Tần suất đăng:
              </label>
              <select
                value={scheduleConfig.videosPerDay}
                onChange={(e) => {
                  const val = parseInt(e.target.value);
                  const updated = {
                    ...scheduleConfig,
                    videosPerDay: val,
                    timesOfDay:
                      val === 1
                        ? ["18:30"]
                        : val === 2
                          ? ["11:30", "18:30"]
                          : val === 3
                            ? ["11:30", "18:30", "20:00"]
                            : [
                                "08:00",
                                "11:30",
                                "14:00",
                                "16:00",
                                "18:30",
                                "20:00",
                              ],
                  };
                  setScheduleConfig(updated);
                  YouTubeService.saveScheduleConfig(updated);
                  autoScheduleList(videoQueue, updated);
                }}
                className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 font-medium focus:outline-none focus:border-slate-900"
              >
                <option value={1}>1 video / ngày (Tự chọn 1 khung giờ)</option>
                <option value={2}>
                  2 video / ngày (Khuyên dùng: Trưa & Chiều)
                </option>
                <option value={3}>3 video / ngày (Trưa, Chiều & Tối)</option>
                <option value={6}>6 video / ngày (Tối đa Quota an toàn)</option>
              </select>
            </div>

            {/* Start Date */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">
                Ngày bắt đầu phát:
              </label>
              <input
                type="date"
                value={scheduleConfig.startDate}
                onChange={(e) => {
                  const updated = {
                    ...scheduleConfig,
                    startDate: e.target.value,
                  };
                  setScheduleConfig(updated);
                  YouTubeService.saveScheduleConfig(updated);
                  autoScheduleList(videoQueue, updated);
                }}
                className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 font-medium focus:outline-none focus:border-slate-900"
              />
            </div>

            {/* Privacy Mode */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">
                Chế độ YouTube:
              </label>
              <select
                value={scheduleConfig.privacyStatus}
                onChange={(e) => {
                  const updated = {
                    ...scheduleConfig,
                    privacyStatus: e.target.value as
                      "private" | "unlisted" | "public",
                  };
                  setScheduleConfig(updated);
                  YouTubeService.saveScheduleConfig(updated);
                  autoScheduleList(videoQueue, updated);
                }}
                className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 font-medium focus:outline-none focus:border-slate-900"
              >
                <option value="private">
                  Private Scheduled (Chuẩn YouTube)
                </option>
                <option value="unlisted">Unlisted (Không công khai)</option>
                <option value="public">Public (Công khai ngay)</option>
              </select>
            </div>
          </div>

          {/* Interactive Golden Hours Picker */}
          <div className="pt-2 border-t border-slate-100 space-y-2">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-slate-700" />
                <span>Bấm chọn 1 trong 3 Khung Giờ Vàng mong muốn:</span>
              </span>
              <span className="text-[11px] text-slate-500 font-medium">
                Đang dùng:{" "}
                <strong>{scheduleConfig.timesOfDay.join(", ")}</strong> (
                {scheduleConfig.videosPerDay} video/ngày)
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {DEFAULT_GOLDEN_HOURS.map(({ time, label, icon: Icon }) => {
                const isSelected = scheduleConfig.timesOfDay.includes(time);
                return (
                  <button
                    key={time}
                    type="button"
                    onClick={() => handleToggleGoldenHour(time)}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all border shadow-2xs ${
                      isSelected
                        ? "bg-slate-900 text-white border-slate-900 ring-2 ring-slate-900/10"
                        : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100 hover:border-slate-300"
                    }`}
                  >
                    <Icon
                      className={`w-3.5 h-3.5 ${
                        isSelected ? "text-amber-300" : "text-slate-500"
                      }`}
                    />
                    <span>{label}</span>
                    {isSelected && (
                      <Check className="w-3 h-3 text-emerald-400 ml-0.5" />
                    )}
                  </button>
                );
              })}

              {/* Add Custom Time button */}
              {showCustomTimeInput ? (
                <div className="flex items-center gap-1">
                  <input
                    type="time"
                    value={customTimeInput}
                    onChange={(e) => setCustomTimeInput(e.target.value)}
                    className="p-1.5 bg-slate-50 border border-slate-300 rounded-lg text-xs font-mono text-slate-900"
                  />
                  <button
                    onClick={handleAddCustomTime}
                    className="px-2.5 py-1.5 bg-slate-900 text-white text-xs font-bold rounded-lg"
                  >
                    Thêm
                  </button>
                  <button
                    onClick={() => setShowCustomTimeInput(false)}
                    className="px-2 py-1.5 text-xs text-slate-400 hover:text-slate-600"
                  >
                    &times;
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setShowCustomTimeInput(true)}
                  className="flex items-center gap-1 px-2.5 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium border border-slate-200 transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Giờ khác</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Video Queue Manager & Action Toolbar */}
      <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-3 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Layers className="w-5 h-5 text-slate-800" />
              <span>Danh Sách Video Trong Hàng Đợi ({videoQueue.length})</span>
            </h3>
            <div className="flex items-center gap-2 text-xs font-medium">
              <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                Chờ đăng: {pendingCount}
              </span>
              <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">
                Đã lên lịch: {uploadedCount}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-auto">
            {isBatchUploading ? (
              <button
                onClick={handleStopBatchUpload}
                className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold shadow-xs transition-colors"
              >
                <span>Tạm Dừng Tiến Trình</span>
              </button>
            ) : (
              <button
                onClick={handleStartBatchUpload}
                disabled={pendingCount === 0 || !creds}
                className="flex items-center gap-1.5 px-5 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold shadow-xs disabled:opacity-40 transition-colors"
              >
                <Upload className="w-4 h-4" />
                <span>Bắt Đầu Đăng Hàng Loạt ({pendingCount} Video)</span>
              </button>
            )}
          </div>
        </div>

        {/* Empty State */}
        {videoQueue.length === 0 ? (
          <div className="p-12 rounded-xl bg-slate-50 border border-dashed border-slate-300 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-slate-200 flex items-center justify-center mx-auto text-slate-500">
              <Video className="w-6 h-6" />
            </div>
            <h4 className="text-sm font-bold text-slate-800">
              Chưa có video nào trong hàng đợi
            </h4>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              Bấm nút <strong>"Quét Thư Mục Video"</strong> ở trên để nạp các
              file video Shorts (.mp4) đã render từ máy tính vào đây.
            </p>
          </div>
        ) : (
          /* Video Items List */
          <div className="space-y-3">
            {videoQueue.map((item, index) => (
              <div
                key={item.id}
                className={`p-4 rounded-xl border transition-colors flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 ${
                  item.status === "uploading"
                    ? "bg-slate-100 border-slate-900"
                    : item.status === "scheduled" || item.status === "published"
                      ? "bg-emerald-50/50 border-emerald-200"
                      : item.status === "error"
                        ? "bg-rose-50/50 border-rose-200"
                        : "bg-white border-slate-200 hover:border-slate-300"
                }`}
              >
                {/* Left: Video Details & Thumbnail & Matched Concept */}
                <div className="flex items-start gap-3.5 flex-1 min-w-0">
                  {/* Thumbnail with preview hover */}
                  <div
                    onClick={() => setPreviewVideoItem(item)}
                    className="relative w-14 h-20 rounded-lg bg-slate-950 border border-slate-200 overflow-hidden shrink-0 cursor-pointer group shadow-xs flex items-center justify-center"
                  >
                    {item.thumbnailUrl ? (
                      <img
                        src={item.thumbnailUrl}
                        alt="Thumbnail"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                    ) : (
                      <Video className="w-6 h-6 text-slate-600" />
                    )}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                      <Play className="w-5 h-5 fill-white" />
                    </div>
                    <span className="absolute bottom-1 right-1 bg-black/80 text-white font-mono text-[9px] px-1 rounded">
                      #{index + 1}
                    </span>
                  </div>

                  <div className="space-y-1.5 min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs font-mono font-bold text-slate-900 truncate">
                        {item.fileName}
                      </span>
                      <span className="text-[11px] text-slate-400 font-mono">
                        ({formatBytes(item.fileSize)})
                      </span>

                      {/* Technical Badges (Media Inspection) */}
                      {item.aspectRatio && (
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded border ${
                            item.isShortsCompliant
                              ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                              : "bg-amber-50 text-amber-800 border-amber-200"
                          }`}
                        >
                          {item.aspectRatio}
                        </span>
                      )}

                      {item.resolution && (
                        <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
                          {item.resolution}
                        </span>
                      )}

                      {item.duration !== undefined && item.duration > 0 && (
                        <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
                          {MediaService.formatDuration(item.duration)}
                        </span>
                      )}
                    </div>

                    <p className="text-xs font-bold text-slate-800 line-clamp-1">
                      {item.customTitle}
                    </p>

                    {/* Validation Warnings */}
                    {item.validationWarnings &&
                      item.validationWarnings.length > 0 && (
                        <div className="flex flex-wrap gap-1 pt-0.5">
                          {item.validationWarnings.map((warn, wIdx) => (
                            <span
                              key={wIdx}
                              className="text-[10px] text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200 flex items-center gap-1 font-medium"
                            >
                              <AlertTriangle className="w-3 h-3" />
                              {warn}
                            </span>
                          ))}
                        </div>
                      )}

                    {/* Schedule Time & 1-Click Quick Time Buttons */}
                    <div className="flex flex-wrap items-center gap-2 pt-0.5 text-[11px]">
                      <span className="flex items-center gap-1 font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded border border-slate-200 font-mono">
                        <Clock className="w-3 h-3 text-slate-600" />
                        {formatScheduledTime(item.scheduledTime)}
                      </span>

                      {/* 1-Click Quick Time Switcher for this video */}
                      <span className="text-slate-400 text-[10px]">
                        Đổi giờ:
                      </span>
                      {["11:30", "18:30", "20:00"].map((timeSlot) => (
                        <button
                          key={timeSlot}
                          type="button"
                          onClick={() =>
                            handleQuickSetVideoTime(item.id, timeSlot)
                          }
                          title={`Chuyển giờ phát sóng sang ${timeSlot}`}
                          className="px-2 py-0.5 rounded bg-white hover:bg-slate-900 hover:text-white text-slate-600 text-[10px] font-mono font-bold border border-slate-200 transition-colors"
                        >
                          {timeSlot}
                        </button>
                      ))}

                      {item.errorMessage && (
                        <span className="text-rose-600 flex items-center gap-1 font-medium ml-2">
                          <AlertCircle className="w-3 h-3" />{" "}
                          {item.errorMessage}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Right: Upload Progress & Action Buttons */}
                <div className="flex items-center gap-3 self-end lg:self-auto shrink-0">
                  {/* Status Indicator */}
                  {item.status === "uploading" && (
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
                      <div className="w-24 h-2 bg-slate-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-slate-900 transition-all duration-200"
                          style={{ width: `${item.uploadProgress}%` }}
                        />
                      </div>
                      <span>{item.uploadProgress}%</span>
                    </div>
                  )}

                  {item.status === "scheduled" && (
                    <span className="flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                      <Check className="w-3.5 h-3.5" /> Đã Hẹn Giờ Đăng
                    </span>
                  )}

                  {item.status === "published" && (
                    <a
                      href={
                        item.youtubeUrl ||
                        `https://youtube.com/watch?v=${item.youtubeVideoId}`
                      }
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-200 hover:underline"
                    >
                      <ExternalLink className="w-3.5 h-3.5" /> Xem Trên YouTube
                    </a>
                  )}

                  {/* Edit Metadata Button */}
                  <button
                    onClick={() => handleOpenEditModal(item)}
                    title="Chỉnh sửa Tiêu đề, Mô tả & Lịch Đăng"
                    className="p-2 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200 transition-colors"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>

                  {/* Single Upload Button */}
                  {item.status === "idle" ||
                  item.status === "error" ||
                  item.status === "ready" ? (
                    <button
                      onClick={() => handleUploadSingle(index)}
                      className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold shadow-xs transition-colors"
                    >
                      <Upload className="w-3 h-3" />
                      <span>Đăng</span>
                    </button>
                  ) : null}

                  {/* Remove item */}
                  <button
                    onClick={() =>
                      setVideoQueue(videoQueue.filter((_, i) => i !== index))
                    }
                    className="p-1.5 text-slate-400 hover:text-rose-600"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* MODAL 1: OAuth 2.0 Credentials Settings */}
      {showAuthModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white border border-slate-200 rounded-xl w-full max-w-lg p-6 shadow-2xl space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Key className="w-5 h-5 text-slate-800" />
                <span>Cấu Hình YouTube OAuth 2.0 Client</span>
              </h3>
              <button
                onClick={() => setShowAuthModal(false)}
                className="text-slate-400 hover:text-slate-700 text-xl font-bold px-2"
              >
                &times;
              </button>
            </div>

            {authError && (
              <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{authError}</span>
              </div>
            )}

            <div className="space-y-3.5 text-xs text-slate-700">
              <div className="space-y-1">
                <label className="font-bold text-slate-900">
                  1. Client ID (Google Cloud):
                </label>
                <input
                  type="text"
                  placeholder="...apps.googleusercontent.com"
                  value={clientIdInput}
                  onChange={(e) => setClientIdInput(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-mono text-slate-900 focus:outline-none focus:border-slate-900"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-900">
                  2. Client Secret:
                </label>
                <input
                  type="password"
                  placeholder="GOCSPX-..."
                  value={clientSecretInput}
                  onChange={(e) => setClientSecretInput(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-mono text-slate-900 focus:outline-none focus:border-slate-900"
                />
              </div>

              <div className="pt-2 flex items-center justify-between">
                <span className="font-bold text-slate-900">
                  3. Đăng nhập để lấy mã:
                </span>
                <button
                  onClick={handleOpenAuthUrl}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-900 font-bold border border-slate-200 transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Mở Trang Đăng Nhập Google</span>
                </button>
              </div>

              <div className="space-y-1 pt-1">
                <label className="font-bold text-slate-900">
                  4. Dán Mã Xác Thực (Auth Code):
                </label>
                <input
                  type="text"
                  placeholder="Dán chuỗi code nhận được từ Google vào đây..."
                  value={authCodeInput}
                  onChange={(e) => setAuthCodeInput(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-mono text-slate-900 focus:outline-none focus:border-slate-900"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
              <button
                onClick={() => setShowAuthModal(false)}
                className="px-4 py-2 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors"
              >
                Hủy
              </button>
              <button
                onClick={handleExchangeCode}
                disabled={isAuthenticating}
                className="px-5 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold shadow-xs disabled:opacity-50 transition-colors"
              >
                {isAuthenticating ? "Đang Xác Thực..." : "Lưu & Kết Nối Kênh"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: Edit Metadata for Selected Video */}
      {selectedVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white border border-slate-200 rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 shadow-2xl space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Edit3 className="w-4 h-4 text-slate-800" />
                <span>Chỉnh Sửa Thông Tin Video & Lịch Phát Sóng</span>
              </h3>
              <button
                onClick={() => setSelectedVideo(null)}
                className="text-slate-400 hover:text-slate-700 text-xl font-bold px-2"
              >
                &times;
              </button>
            </div>

            <div className="space-y-4 text-xs text-slate-700">
              <div className="space-y-1">
                <label className="font-bold text-slate-900">
                  Tiêu đề YouTube Shorts:
                </label>
                <input
                  type="text"
                  value={selectedVideo.customTitle}
                  onChange={(e) =>
                    setSelectedVideo({
                      ...selectedVideo,
                      customTitle: e.target.value,
                    })
                  }
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 font-medium focus:outline-none focus:border-slate-900"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-900">
                  Nội dung mô tả (Description):
                </label>
                <textarea
                  rows={4}
                  value={selectedVideo.customDescription}
                  onChange={(e) =>
                    setSelectedVideo({
                      ...selectedVideo,
                      customDescription: e.target.value,
                    })
                  }
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 font-mono focus:outline-none focus:border-slate-900"
                />
              </div>

              {/* Date & Time Picker */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3.5">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-slate-700" />
                    <span>Thiết Lập Thời Gian Hẹn Giờ Phát Sóng</span>
                  </span>
                </div>

                {/* Date selection */}
                <div className="space-y-1.5">
                  <label className="font-semibold text-slate-700">
                    1. Chọn ngày phát sóng:
                  </label>
                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setModalDate(getQuickDateString(0))}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border ${
                        modalDate === getQuickDateString(0)
                          ? "bg-slate-900 text-white border-slate-900"
                          : "bg-white text-slate-700 border-slate-200 hover:bg-slate-100"
                      }`}
                    >
                      Hôm Nay
                    </button>
                    <button
                      type="button"
                      onClick={() => setModalDate(getQuickDateString(1))}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border ${
                        modalDate === getQuickDateString(1)
                          ? "bg-slate-900 text-white border-slate-900"
                          : "bg-white text-slate-700 border-slate-200 hover:bg-slate-100"
                      }`}
                    >
                      Ngày Mai
                    </button>
                    <button
                      type="button"
                      onClick={() => setModalDate(getQuickDateString(2))}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border ${
                        modalDate === getQuickDateString(2)
                          ? "bg-slate-900 text-white border-slate-900"
                          : "bg-white text-slate-700 border-slate-200 hover:bg-slate-100"
                      }`}
                    >
                      Ngày Kia
                    </button>
                    <input
                      type="date"
                      value={modalDate}
                      onChange={(e) => setModalDate(e.target.value)}
                      className="p-1.5 bg-white border border-slate-200 rounded-lg text-xs font-medium text-slate-900"
                    />
                  </div>
                </div>

                {/* Time selection */}
                <div className="space-y-1.5">
                  <label className="font-semibold text-slate-700">
                    2. Chọn khung giờ vàng (1-Click):
                  </label>
                  <div className="flex flex-wrap items-center gap-2">
                    {DEFAULT_GOLDEN_HOURS.map(({ time, label, icon: Icon }) => (
                      <button
                        key={time}
                        type="button"
                        onClick={() => setModalTime(time)}
                        className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all border ${
                          modalTime === time
                            ? "bg-slate-900 text-white border-slate-900 shadow-xs ring-2 ring-slate-900/10"
                            : "bg-white text-slate-700 border-slate-200 hover:bg-slate-100"
                        }`}
                      >
                        <Icon
                          className={`w-3.5 h-3.5 ${
                            modalTime === time
                              ? "text-amber-300"
                              : "text-slate-500"
                          }`}
                        />
                        <span>{label}</span>
                      </button>
                    ))}
                    <div className="flex items-center gap-1 ml-1">
                      <span className="text-[11px] text-slate-400">
                        Giờ khác:
                      </span>
                      <input
                        type="time"
                        value={modalTime}
                        onChange={(e) => setModalTime(e.target.value)}
                        className="p-1.5 bg-white border border-slate-200 rounded-lg text-xs font-mono font-bold text-slate-900"
                      />
                    </div>
                  </div>
                </div>

                {/* Live Preview of scheduled datetime */}
                {modalDate && modalTime && (
                  <div className="p-2.5 rounded-lg bg-emerald-50/80 border border-emerald-200 text-emerald-900 text-xs font-medium flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>
                      Thời gian phát sóng dự kiến:{" "}
                      <strong>
                        {formatScheduledTime(`${modalDate}T${modalTime}:00`)}
                      </strong>
                    </span>
                  </div>
                )}
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-900">
                  Chế độ đăng YouTube:
                </label>
                <select
                  value={selectedVideo.privacyStatus}
                  onChange={(e) =>
                    setSelectedVideo({
                      ...selectedVideo,
                      privacyStatus: e.target.value as
                        "private" | "unlisted" | "public",
                    })
                  }
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 font-medium focus:outline-none focus:border-slate-900"
                >
                  <option value="private">
                    Private Scheduled (Hẹn giờ phát sóng tự động)
                  </option>
                  <option value="public">Công Khai Ngay (Public)</option>
                  <option value="unlisted">Không Công Khai (Unlisted)</option>
                </select>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
              <button
                onClick={() => setSelectedVideo(null)}
                className="px-4 py-2 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors"
              >
                Hủy
              </button>
              <button
                onClick={handleSaveEditModal}
                className="px-5 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold shadow-xs transition-colors"
              >
                Lưu Thay Đổi
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Video Preview & Technical Inspector Modal */}
      {previewVideoItem && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 space-y-5 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center text-white">
                  <Video className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    Xem Trước Video & Kiểm Định Shorts
                  </h3>
                  <p className="text-[11px] text-slate-500 font-mono truncate max-w-sm">
                    {previewVideoItem.fileName}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setPreviewVideoItem(null)}
                className="text-slate-400 hover:text-slate-700 text-lg p-1"
              >
                &times;
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Left: Thumbnail & Player */}
              <div className="aspect-[9/16] max-h-80 bg-slate-950 rounded-xl overflow-hidden flex items-center justify-center border border-slate-200 shadow-inner relative mx-auto sm:mx-0">
                {previewVideoItem.thumbnailUrl ? (
                  <img
                    src={previewVideoItem.thumbnailUrl}
                    alt="Thumbnail Preview"
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <Video className="w-12 h-12 text-slate-600" />
                )}
                <div className="absolute top-2 left-2 bg-black/70 text-white font-mono text-[10px] px-2 py-0.5 rounded backdrop-blur-xs">
                  {previewVideoItem.resolution || "1080x1920"}
                </div>
              </div>

              {/* Right: Technical Inspector Details */}
              <div className="space-y-3 text-xs">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                  <span className="font-bold text-slate-800 uppercase text-[10px] tracking-wider block">
                    Thông Số Kỹ Thuật (Media Inspection)
                  </span>

                  <div className="grid grid-cols-2 gap-2 text-[11px]">
                    <div>
                      <span className="text-slate-400 block">Thời lượng:</span>
                      <span className="font-bold font-mono text-slate-800">
                        {MediaService.formatDuration(previewVideoItem.duration)}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-400 block">Tỷ lệ khung:</span>
                      <span className="font-bold text-slate-800">
                        {previewVideoItem.aspectRatio || "9:16 (Dọc)"}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-400 block">
                        Độ phân giải:
                      </span>
                      <span className="font-bold font-mono text-slate-800">
                        {previewVideoItem.resolution || "1080x1920"}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-400 block">Dung lượng:</span>
                      <span className="font-bold font-mono text-slate-800">
                        {formatBytes(previewVideoItem.fileSize)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Shorts Compliance Badge */}
                <div
                  className={`p-3 rounded-xl border flex items-start gap-2.5 ${
                    previewVideoItem.isShortsCompliant
                      ? "bg-emerald-50 text-emerald-900 border-emerald-200"
                      : "bg-amber-50 text-amber-900 border-amber-200"
                  }`}
                >
                  {previewVideoItem.isShortsCompliant ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  ) : (
                    <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  )}
                  <div className="space-y-0.5">
                    <span className="font-bold text-xs">
                      {previewVideoItem.isShortsCompliant
                        ? "Đạt chuẩn YouTube Shorts 100%"
                        : "Cần chú ý chuẩn Shorts"}
                    </span>
                    <p className="text-[11px] opacity-80">
                      {previewVideoItem.isShortsCompliant
                        ? "Video có tỷ lệ dọc và thời lượng dưới 60s, tối ưu thuật toán phân phối Shorts."
                        : previewVideoItem.validationWarnings?.join(". ") ||
                          "Kiểm tra lại tỷ lệ và thời lượng video."}
                    </p>
                  </div>
                </div>

                {/* Matched Title Preview */}
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <span className="text-slate-400 text-[10px] uppercase font-bold block">
                    Tiêu đề SEO tự động:
                  </span>
                  <p className="font-semibold text-slate-900 line-clamp-2">
                    {previewVideoItem.customTitle}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
              <button
                onClick={() => setPreviewVideoItem(null)}
                className="px-5 py-2 rounded-lg bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition-colors"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
