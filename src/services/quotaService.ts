import { QuotaUsageState, YouTubeScheduleConfig } from "../types";

const STORAGE_KEY_QUOTA = "yt_quota_usage_state_v1";
const DAILY_LIMIT = 10000;
const UPLOAD_COST = 1600;
const READ_COST = 1;

export class QuotaService {
  /**
   * Get current date in Pacific Standard Time (PST - UTC-8) where YouTube Quota resets at 00:00
   */
  public static getTodayPSTDate(): string {
    const now = new Date();
    // PST is UTC-8
    const utc = now.getTime() + now.getTimezoneOffset() * 60000;
    const pstTime = new Date(utc - 8 * 3600000);
    const yyyy = pstTime.getFullYear();
    const mm = String(pstTime.getMonth() + 1).padStart(2, "0");
    const dd = String(pstTime.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  }

  /**
   * Get current Quota Usage state (auto-resets if a new PST day has started)
   */
  public static getQuotaState(): QuotaUsageState {
    const todayPST = this.getTodayPSTDate();
    const defaultState: QuotaUsageState = {
      dailyLimit: DAILY_LIMIT,
      usedQuota: 0,
      lastResetDate: todayPST,
      history: [],
    };

    try {
      const raw = localStorage.getItem(STORAGE_KEY_QUOTA);
      if (!raw) return defaultState;

      const state: QuotaUsageState = JSON.parse(raw);

      // Check if day changed in PST
      if (state.lastResetDate !== todayPST) {
        // Archive yesterday's data to history
        const uploadsCount = Math.floor((state.usedQuota || 0) / UPLOAD_COST);
        const history = state.history || [];
        if (state.usedQuota > 0) {
          history.unshift({
            date: state.lastResetDate,
            usedUnits: state.usedQuota,
            uploadsCount,
          });
        }

        const newState: QuotaUsageState = {
          dailyLimit: DAILY_LIMIT,
          usedQuota: 0,
          lastResetDate: todayPST,
          history: history.slice(0, 30), // keep last 30 days
        };

        this.saveQuotaState(newState);
        return newState;
      }

      return state;
    } catch {
      return defaultState;
    }
  }

  /**
   * Save Quota state to localStorage
   */
  public static saveQuotaState(state: QuotaUsageState): void {
    localStorage.setItem(STORAGE_KEY_QUOTA, JSON.stringify(state));
  }

  /**
   * Record quota consumption
   */
  public static recordUsage(
    type: "upload" | "channel_info" | "video_info" | "search",
  ): QuotaUsageState {
    const state = this.getQuotaState();
    let cost = READ_COST;

    switch (type) {
      case "upload":
        cost = UPLOAD_COST;
        break;
      case "search":
        cost = 100;
        break;
      case "channel_info":
      case "video_info":
      default:
        cost = READ_COST;
        break;
    }

    state.usedQuota = Math.min(state.dailyLimit, state.usedQuota + cost);
    this.saveQuotaState(state);
    return state;
  }

  /**
   * Calculate how many videos can still be uploaded today
   */
  public static getRemainingUploadsToday(): number {
    const state = this.getQuotaState();
    const remainingUnits = Math.max(0, state.dailyLimit - state.usedQuota);
    return Math.floor(remainingUnits / UPLOAD_COST);
  }

  /**
   * Multi-Day Auto Staging Scheduler
   * Given total videos to schedule and daily posting limits,
   * automatically distributes videos across multiple days so daily uploads <= 6
   */
  public static calculateMultiDaySchedule(
    totalVideos: number,
    config: YouTubeScheduleConfig,
  ): Array<{
    videoIndex: number;
    scheduledTimeIso: string;
    dayLabel: string;
    timeLabel: string;
  }> {
    if (totalVideos === 0) return [];

    const scheduleResults: Array<{
      videoIndex: number;
      scheduledTimeIso: string;
      dayLabel: string;
      timeLabel: string;
    }> = [];

    // Max uploads per day is 6 on YouTube Data API free tier (6 * 1600 = 9600 <= 10000)
    const maxSafeVideosPerDay = Math.min(config.videosPerDay || 3, 6);
    const times =
      config.timesOfDay && config.timesOfDay.length > 0
        ? config.timesOfDay
        : ["11:30", "18:30", "20:00"];

    const startDate = config.startDate
      ? new Date(config.startDate)
      : new Date();

    let currentDayOffset = 0;
    let timeSlotIndex = 0;
    let uploadsInCurrentDay = 0;

    for (let i = 0; i < totalVideos; i++) {
      // If reached max safe uploads for this day, advance to next day
      if (uploadsInCurrentDay >= maxSafeVideosPerDay) {
        currentDayOffset++;
        uploadsInCurrentDay = 0;
        timeSlotIndex = 0;
      }

      const targetDay = new Date(startDate);
      targetDay.setDate(targetDay.getDate() + currentDayOffset);

      const targetTimeStr = times[timeSlotIndex % times.length];
      const [hours, minutes] = targetTimeStr.split(":").map(Number);

      const scheduledDate = new Date(
        targetDay.getFullYear(),
        targetDay.getMonth(),
        targetDay.getDate(),
        hours || 18,
        minutes || 30,
        0,
        0,
      );

      // If scheduled time is in the past, push by 1 day
      if (scheduledDate.getTime() < Date.now() + 5 * 60 * 1000) {
        scheduledDate.setDate(scheduledDate.getDate() + 1);
      }

      const yyyy = scheduledDate.getFullYear();
      const mm = String(scheduledDate.getMonth() + 1).padStart(2, "0");
      const dd = String(scheduledDate.getDate()).padStart(2, "0");
      const dayLabel = `${dd}/${mm}/${yyyy}`;

      scheduleResults.push({
        videoIndex: i,
        scheduledTimeIso: scheduledDate.toISOString(),
        dayLabel,
        timeLabel: targetTimeStr,
      });

      uploadsInCurrentDay++;
      timeSlotIndex++;
    }

    return scheduleResults;
  }
}
