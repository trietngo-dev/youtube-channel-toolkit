import React, { useState, useEffect } from "react";
import {
  Activity,
  Zap,
  Calendar,
  Clock,
  UploadCloud,
  Users,
  Video,
  RefreshCw,
  ShieldCheck,
  BarChart3,
  Sun,
  Sunset,
  Moon,
} from "lucide-react";
import { QuotaService } from "../services/quotaService";
import { YouTubeService } from "../services/youtubeService";
import {
  QuotaUsageState,
  YouTubeCredentials,
  VideoQueueItem,
  YouTubeScheduleConfig,
} from "../types";

interface AnalyticsDashboardViewProps {
  videoQueue: VideoQueueItem[];
  scheduleConfig: YouTubeScheduleConfig;
  onNavigateToUploader: () => void;
}

export const AnalyticsDashboardView: React.FC<AnalyticsDashboardViewProps> = ({
  videoQueue,
  scheduleConfig,
  onNavigateToUploader,
}) => {
  const [quotaState, setQuotaState] = useState<QuotaUsageState>(
    QuotaService.getQuotaState(),
  );
  const [creds, setCreds] = useState<YouTubeCredentials | null>(
    YouTubeService.getCredentials(),
  );
  const [remainingUploads, setRemainingUploads] = useState<number>(
    QuotaService.getRemainingUploadsToday(),
  );

  useEffect(() => {
    refreshData();
  }, []);

  const refreshData = () => {
    const qState = QuotaService.getQuotaState();
    setQuotaState(qState);
    setRemainingUploads(QuotaService.getRemainingUploadsToday());
    setCreds(YouTubeService.getCredentials());
  };

  const usedUnits = quotaState.usedQuota || 0;
  const totalLimit = quotaState.dailyLimit || 10000;
  const percentUsed = Math.min(100, Math.round((usedUnits / totalLimit) * 100));

  // Multi-day distribution
  const multiDayPlan = QuotaService.calculateMultiDaySchedule(
    videoQueue.length,
    scheduleConfig,
  );

  // Group by day label
  const daysGrouped: Record<string, typeof multiDayPlan> = {};
  multiDayPlan.forEach((item) => {
    if (!daysGrouped[item.dayLabel]) {
      daysGrouped[item.dayLabel] = [];
    }
    daysGrouped[item.dayLabel].push(item);
  });

  const totalUploaded = videoQueue.filter(
    (v) => v.status === "published",
  ).length;
  const totalScheduled = videoQueue.filter(
    (v) => v.status === "scheduled" || v.scheduledTime,
  ).length;
  const totalReady = videoQueue.filter(
    (v) => v.status === "idle" || v.status === "ready",
  ).length;

  return (
    <div className="space-y-6">
      {/* Top Banner Header */}
      <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center text-white">
              <BarChart3 className="w-4 h-4 text-white" />
            </div>
            <h1 className="text-lg font-bold text-slate-900">
              Dashboard Analytics & Tối Ưu Quota YouTube API
            </h1>
          </div>
          <p className="text-xs text-slate-500">
            Giám sát hạn ngạch YouTube API (10,000 units/ngày), phân bổ lịch
            phát đa ngày thông minh và chỉ số kênh
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={refreshData}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 text-xs font-semibold transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Làm Mới Dữ Liệu</span>
          </button>
          <button
            onClick={onNavigateToUploader}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-colors shadow-sm"
          >
            <UploadCloud className="w-3.5 h-3.5" />
            <span>Quản Lý Video Studio</span>
          </button>
        </div>
      </div>

      {/* 4 Main Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Quota Progress */}
        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wide flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-amber-500" />
              Quota Hôm Nay
            </span>
            <span
              className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                percentUsed > 80
                  ? "bg-rose-50 text-rose-700 border border-rose-200"
                  : "bg-emerald-50 text-emerald-700 border border-emerald-200"
              }`}
            >
              {percentUsed}% đã dùng
            </span>
          </div>

          <div>
            <div className="flex items-baseline justify-between mb-1.5">
              <span className="text-2xl font-black text-slate-900">
                {usedUnits.toLocaleString()}
              </span>
              <span className="text-xs text-slate-400 font-medium">
                / {totalLimit.toLocaleString()} units
              </span>
            </div>

            {/* Progress Bar */}
            <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  percentUsed > 85
                    ? "bg-rose-500"
                    : percentUsed > 60
                      ? "bg-amber-500"
                      : "bg-slate-900"
                }`}
                style={{ width: `${percentUsed}%` }}
              />
            </div>
          </div>

          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
            <span className="text-slate-500">Lượt upload an toàn còn lại:</span>
            <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
              {remainingUploads} video
            </span>
          </div>
        </div>

        {/* Card 2: YouTube Channel Profile */}
        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wide flex items-center gap-1.5">
              <Video className="w-4 h-4 text-rose-600" />
              Kênh Kết Nối
            </span>
            {creds ? (
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" /> Đã Kết Nối
              </span>
            ) : (
              <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                Chưa Kết Nối
              </span>
            )}
          </div>

          <div className="flex items-center gap-3">
            {creds?.channelThumbnail ? (
              <img
                src={creds.channelThumbnail}
                alt="Channel"
                className="w-10 h-10 rounded-full border border-slate-200 object-cover"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                <Video className="w-5 h-5" />
              </div>
            )}
            <div className="min-w-0 flex-1">
              <h3 className="text-xs font-bold text-slate-900 truncate">
                {creds?.channelTitle || "Chưa đăng nhập kênh"}
              </h3>
              <p className="text-[11px] text-slate-500 flex items-center gap-1">
                <Users className="w-3 h-3 text-slate-400" />
                {creds?.subscriberCount
                  ? `${Number(creds.subscriberCount).toLocaleString()} người đăng ký`
                  : "0 subscribers"}
              </p>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-100 text-[11px] text-slate-500 truncate">
            {creds?.channelId
              ? `ID: ${creds.channelId}`
              : "Cần OAuth 2.0 Client ID để upload"}
          </div>
        </div>

        {/* Card 3: Video Staging Queue */}
        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wide flex items-center gap-1.5">
              <Video className="w-4 h-4 text-indigo-500" />
              Hàng Đợi Video
            </span>
            <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-full border border-indigo-100">
              {videoQueue.length} video
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="p-2 rounded-lg bg-slate-50 border border-slate-100">
              <span className="block text-sm font-bold text-slate-900">
                {totalReady}
              </span>
              <span className="text-[10px] text-slate-500">Chờ lên lịch</span>
            </div>
            <div className="p-2 rounded-lg bg-amber-50 border border-amber-100">
              <span className="block text-sm font-bold text-amber-900">
                {totalScheduled}
              </span>
              <span className="text-[10px] text-amber-700">Đã hẹn giờ</span>
            </div>
            <div className="p-2 rounded-lg bg-emerald-50 border border-emerald-100">
              <span className="block text-sm font-bold text-emerald-900">
                {totalUploaded}
              </span>
              <span className="text-[10px] text-emerald-700">Đã xuất bản</span>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-100 text-[11px] text-slate-500 flex items-center justify-between">
            <span>Tỷ lệ hẹn giờ:</span>
            <span className="font-semibold text-slate-700">
              {videoQueue.length > 0
                ? `${Math.round((totalScheduled / videoQueue.length) * 100)}%`
                : "0%"}
            </span>
          </div>
        </div>

        {/* Card 4: Daily Strategy & Golden Hours */}
        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wide flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-emerald-600" />
              Chiến Lược Khung Giờ
            </span>
            <span className="text-xs font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded-full">
              {scheduleConfig.videosPerDay} video / ngày
            </span>
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs p-1.5 rounded-lg bg-slate-50 border border-slate-100">
              <span className="flex items-center gap-1 text-slate-700 font-medium text-[11px]">
                <Sun className="w-3.5 h-3.5 text-amber-500" /> 11:30 Trưa
              </span>
              <span className="text-[10px] text-slate-500">Nghỉ trưa</span>
            </div>
            <div className="flex items-center justify-between text-xs p-1.5 rounded-lg bg-slate-50 border border-slate-100">
              <span className="flex items-center gap-1 text-slate-700 font-medium text-[11px]">
                <Sunset className="w-3.5 h-3.5 text-orange-500" /> 18:30 Chiều
              </span>
              <span className="text-[10px] text-slate-500">
                Giờ vàng Shorts
              </span>
            </div>
            <div className="flex items-center justify-between text-xs p-1.5 rounded-lg bg-slate-50 border border-slate-100">
              <span className="flex items-center gap-1 text-slate-700 font-medium text-[11px]">
                <Moon className="w-3.5 h-3.5 text-indigo-500" /> 20:00 Tối
              </span>
              <span className="text-[10px] text-slate-500">
                Cao điểm giải trí
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Multi-Day Quota Staging Schedule Breakdown */}
      <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-slate-700" />
              Lịch Phân Bổ Tối Ưu Quota Đa Ngày (Auto Multi-Day Staging)
            </h2>
            <p className="text-xs text-slate-500">
              Tự động chia đều danh sách video vào các ngày tiếp theo để đảm bảo
              mỗi ngày ≤ 6 video (không vượt quá 10,000 units Quota)
            </p>
          </div>

          <span className="text-xs font-semibold text-slate-600 bg-slate-100 px-3 py-1 rounded-lg border border-slate-200">
            Tổng cộng: {Object.keys(daysGrouped).length} ngày phát sóng
          </span>
        </div>

        {Object.keys(daysGrouped).length === 0 ? (
          <div className="p-8 text-center rounded-xl bg-slate-50 border border-dashed border-slate-200 space-y-2">
            <Video className="w-8 h-8 text-slate-300 mx-auto" />
            <p className="text-xs font-semibold text-slate-600">
              Chưa có video nào trong hàng đợi
            </p>
            <p className="text-[11px] text-slate-400">
              Hãy quét thư mục video trong mục YouTube Studio để hệ thống tự
              động xếp lịch đa ngày
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(daysGrouped).map(([dayLabel, items], idx) => {
              const estimatedUnits = items.length * 1600;
              const isToday = idx === 0;

              return (
                <div
                  key={dayLabel}
                  className={`p-4 rounded-xl border space-y-3 ${
                    isToday
                      ? "bg-slate-900 text-white border-slate-900 shadow-sm"
                      : "bg-white text-slate-800 border-slate-200 shadow-sm"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 font-bold text-xs">
                      <Calendar
                        className={`w-3.5 h-3.5 ${isToday ? "text-amber-400" : "text-slate-600"}`}
                      />
                      <span>{dayLabel}</span>
                      {isToday && (
                        <span className="text-[10px] px-2 py-0.2 bg-amber-400 text-slate-950 rounded-full font-bold">
                          Hôm Nay
                        </span>
                      )}
                    </div>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                        isToday
                          ? "bg-slate-800 text-slate-300 border-slate-700"
                          : "bg-slate-50 text-slate-600 border-slate-200"
                      }`}
                    >
                      {items.length} video
                    </span>
                  </div>

                  <div className="space-y-1.5">
                    {items.map((item, itemIdx) => {
                      const videoItem = videoQueue[item.videoIndex];
                      return (
                        <div
                          key={itemIdx}
                          className={`p-2 rounded-lg text-xs flex items-center justify-between border ${
                            isToday
                              ? "bg-slate-800/80 border-slate-700 text-slate-200"
                              : "bg-slate-50 border-slate-100 text-slate-700"
                          }`}
                        >
                          <div className="flex items-center gap-2 min-w-0 pr-2">
                            <span
                              className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 ${
                                isToday
                                  ? "bg-slate-700 text-white"
                                  : "bg-slate-200 text-slate-700"
                              }`}
                            >
                              #{item.videoIndex + 1}
                            </span>
                            <span className="truncate font-medium text-[11px]">
                              {videoItem?.customTitle ||
                                videoItem?.fileName ||
                                `Video ${item.videoIndex + 1}`}
                            </span>
                          </div>
                          <span
                            className={`font-mono text-[10px] font-bold shrink-0 px-1.5 py-0.5 rounded ${
                              isToday
                                ? "bg-slate-700 text-amber-300"
                                : "bg-white text-slate-800 border border-slate-200"
                            }`}
                          >
                            {item.timeLabel}
                          </span>
                        </div>
                      );
                    })}
                  </div>

                  <div
                    className={`pt-2 border-t text-[10px] flex items-center justify-between ${
                      isToday
                        ? "border-slate-800 text-slate-400"
                        : "border-slate-100 text-slate-500"
                    }`}
                  >
                    <span>Chi phí Quota ước tính:</span>
                    <span className="font-bold">
                      {estimatedUnits.toLocaleString()} units
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Quota Cost Breakdown Guide */}
      <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
        <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wide flex items-center gap-1.5">
          <Activity className="w-4 h-4 text-indigo-500" />
          Bảng Quy Đổi Chi Phí Hạn Ngạch YouTube Data API v3
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
            <div className="flex items-center justify-between font-bold text-slate-900">
              <span>Upload Video (`videos.insert`)</span>
              <span className="text-amber-600 font-mono">1,600 units</span>
            </div>
            <p className="text-[11px] text-slate-500">
              Đăng tải file video & đính kèm metadata SEO, tiêu đề, tags
            </p>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
            <div className="flex items-center justify-between font-bold text-slate-900">
              <span>Đọc Thông Tin Kênh (`channels.list`)</span>
              <span className="text-emerald-600 font-mono">1 unit</span>
            </div>
            <p className="text-[11px] text-slate-500">
              Lấy Avatar kênh, tên hiển thị và số lượng người đăng ký
            </p>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
            <div className="flex items-center justify-between font-bold text-slate-900">
              <span>Tìm Kiếm Video (`search.list`)</span>
              <span className="text-indigo-600 font-mono">100 units</span>
            </div>
            <p className="text-[11px] text-slate-500">
              Tìm kiếm từ khóa cạnh tranh và phân tích hashtag
            </p>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
            <div className="flex items-center justify-between font-bold text-slate-900">
              <span>Hạn Ngạch Miễn Phí Mỗi Ngày</span>
              <span className="text-slate-900 font-mono">10,000 units</span>
            </div>
            <p className="text-[11px] text-slate-500">
              Reset tự động lúc 00:00 PST (14:00 giờ Việt Nam)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
