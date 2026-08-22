import { VideoMediaMetadata } from "../types";

export class MediaService {
  /**
   * Extract video metadata and frame snapshot from a File, Blob, or URL
   */
  public static async inspectVideo(
    source: File | Blob | string,
    captureTimeSec = 2.0,
  ): Promise<VideoMediaMetadata> {
    return new Promise((resolve) => {
      const video = document.createElement("video");
      video.preload = "metadata";
      video.muted = true;
      video.playsInline = true;
      video.crossOrigin = "anonymous";

      let objectUrl: string | null = null;

      if (typeof source === "string") {
        video.src = source;
      } else {
        objectUrl = URL.createObjectURL(source);
        video.src = objectUrl;
      }

      const cleanup = () => {
        if (objectUrl) {
          URL.revokeObjectURL(objectUrl);
        }
        video.remove();
      };

      const fallbackMetadata: VideoMediaMetadata = {
        duration: 0,
        width: 0,
        height: 0,
        aspectRatio: "Unknown",
        aspectRatioValue: 1,
        isShortsCompliant: true,
        validationWarnings: [],
      };

      // Set timeout in case video loading fails or stalls
      const timeoutId = setTimeout(() => {
        cleanup();
        resolve(fallbackMetadata);
      }, 7000);

      video.onloadedmetadata = () => {
        const duration = video.duration || 0;

        // Determine seek time for thumbnail (2s or 20% if video is shorter)
        let targetTime = captureTimeSec;
        if (duration > 0 && targetTime >= duration) {
          targetTime = Math.max(0.5, duration * 0.2);
        }

        // Seek video to frame
        video.currentTime = targetTime;
      };

      video.onseeked = () => {
        clearTimeout(timeoutId);

        try {
          const width = video.videoWidth || 1080;
          const height = video.videoHeight || 1920;
          const duration = video.duration || 0;

          // Aspect Ratio calculation
          const ratioVal = width / (height || 1);
          let aspectRatioLabel = `${width}:${height}`;

          if (ratioVal >= 0.5 && ratioVal <= 0.65) {
            aspectRatioLabel = "9:16 (Dọc)";
          } else if (ratioVal >= 0.95 && ratioVal <= 1.05) {
            aspectRatioLabel = "1:1 (Vuông)";
          } else if (ratioVal >= 1.6 && ratioVal <= 1.9) {
            aspectRatioLabel = "16:9 (Ngang)";
          } else if (ratioVal >= 0.75 && ratioVal <= 0.85) {
            aspectRatioLabel = "4:5 (Dọc)";
          }

          // Validation Warnings
          const warnings: string[] = [];
          let isShortsCompliant = true;

          if (duration > 60.5) {
            warnings.push("Thời lượng > 60s (YouTube Shorts yêu cầu ≤ 60s)");
            isShortsCompliant = false;
          }

          if (ratioVal > 1.1) {
            warnings.push(
              "Tỷ lệ khung hình ngang 16:9 (Khuyên dùng tỷ lệ dọc 9:16)",
            );
            isShortsCompliant = false;
          }

          if (height < 720 && width < 720) {
            warnings.push("Độ phân giải dưới 720p (Nên xuất tối thiểu 1080p)");
          }

          // Draw frame snapshot on canvas
          const canvas = document.createElement("canvas");
          // Keep reasonable thumbnail size (max 480px width)
          const targetCanvasWidth = Math.min(width, 480);
          const targetCanvasHeight = Math.round(targetCanvasWidth / ratioVal);

          canvas.width = targetCanvasWidth;
          canvas.height = targetCanvasHeight;

          const ctx = canvas.getContext("2d");
          let thumbnailUrl: string | undefined = undefined;

          if (ctx) {
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
            thumbnailUrl = canvas.toDataURL("image/jpeg", 0.82);
          }

          canvas.remove();
          cleanup();

          resolve({
            duration: Math.round(duration * 10) / 10,
            width,
            height,
            aspectRatio: aspectRatioLabel,
            aspectRatioValue: ratioVal,
            isShortsCompliant,
            thumbnailUrl,
            validationWarnings: warnings,
          });
        } catch {
          cleanup();
          resolve(fallbackMetadata);
        }
      };

      video.onerror = () => {
        clearTimeout(timeoutId);
        cleanup();
        resolve(fallbackMetadata);
      };
    });
  }

  /**
   * Format seconds to mm:ss format (e.g. 00:08s or 01:23s)
   */
  public static formatDuration(seconds?: number): string {
    if (!seconds || seconds <= 0) return "00:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}s`;
  }
}
