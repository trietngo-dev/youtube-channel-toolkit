import { GeneratedShortsIdea } from "../types";

export class ExportService {
  /**
   * Export multiple ideas to a formatted CSV file
   */
  public static async exportToCSV(
    ideas: GeneratedShortsIdea[],
    filename: string = "gemstone_fruit_shorts.csv",
  ): Promise<boolean> {
    if (ideas.length === 0) return false;

    const headers = [
      "ID",
      "Ngày tạo",
      "Tên Concept",
      "Trái Cây",
      "Đá Quý",
      "Chất Lỏng / Mật",
      "Dụng Cụ Cắt",
      "Phong Cách Ánh Sáng",
      "Tiêu Đề Viral 1 (VN)",
      "Tiêu Đề Viral 2 (VN)",
      "Tiêu Đề Viral (EN)",
      "Hook 3 Giây Đầu",
      "Âm Thanh ASMR Gợi Ý",
      "Prompt Ảnh Bắt Đầu (ChatGPT / DALL-E 3)",
      "Prompt Ảnh Bắt Đầu (Midjourney)",
      "Prompt Ảnh Kết Thúc (ChatGPT / DALL-E 3)",
      "Prompt Ảnh Kết Thúc (Midjourney)",
      "Prompt Video Morphing (Google Gemini / Veo 2)",
      "Prompt Video Morphing (Kling AI)",
      "Hashtags",
    ];

    const escapeCsv = (str: string | undefined): string => {
      if (!str) return '""';
      const clean = str.replace(/"/g, '""');
      return `"${clean}"`;
    };

    const rows = ideas.map((idea) => {
      const date = new Date(idea.timestamp).toLocaleString("vi-VN");
      const soundStr =
        idea.seo?.audioSoundDesign?.soundEffects?.join(" | ") || "";
      const tagsStr = idea.seo?.hashtags?.join(" ") || "";

      return [
        escapeCsv(idea.id),
        escapeCsv(date),
        escapeCsv(idea.conceptTitle),
        escapeCsv(
          `${idea.config?.fruit?.nameVi} (${idea.config?.fruit?.nameEn})`,
        ),
        escapeCsv(
          `${idea.config?.gemstone?.nameVi} (${idea.config?.gemstone?.nameEn})`,
        ),
        escapeCsv(
          `${idea.config?.fluid?.nameVi} (${idea.config?.fluid?.nameEn})`,
        ),
        escapeCsv(
          `${idea.config?.tool?.nameVi} (${idea.config?.tool?.nameEn})`,
        ),
        escapeCsv(idea.config?.style?.nameVi),
        escapeCsv(idea.seo?.viralTitlesVi?.[0]),
        escapeCsv(idea.seo?.viralTitlesVi?.[1]),
        escapeCsv(idea.seo?.viralTitlesEn?.[0]),
        escapeCsv(idea.seo?.hookText3s),
        escapeCsv(soundStr),
        escapeCsv(
          idea.startImagePrompt?.chatgpt || idea.startImagePrompt?.midjourney,
        ),
        escapeCsv(idea.startImagePrompt?.midjourney),
        escapeCsv(
          idea.endImagePrompt?.chatgpt || idea.endImagePrompt?.midjourney,
        ),
        escapeCsv(idea.endImagePrompt?.midjourney),
        escapeCsv(
          idea.videoMorphingPrompt?.geminiVeo ||
            idea.videoMorphingPrompt?.klingAI,
        ),
        escapeCsv(idea.videoMorphingPrompt?.klingAI),
        escapeCsv(tagsStr),
      ].join(",");
    });

    // Add UTF-8 BOM (\uFEFF) so Excel opens UTF-8 Vietnamese perfectly
    const csvContent = "\uFEFF" + [headers.join(","), ...rows].join("\r\n");

    return this.saveOrDownloadFile(csvContent, filename, [
      { name: "CSV File", extensions: ["csv"] },
    ]);
  }

  /**
   * Export ideas to JSON file
   */
  public static async exportToJSON(
    ideas: GeneratedShortsIdea[],
    filename: string = "gemstone_fruit_shorts.json",
  ): Promise<boolean> {
    const jsonContent = JSON.stringify(ideas, null, 2);
    return this.saveOrDownloadFile(jsonContent, filename, [
      { name: "JSON File", extensions: ["json"] },
    ]);
  }

  /**
   * Helper to download via Electron native dialog or browser fallback
   */
  private static async saveOrDownloadFile(
    data: string,
    defaultFilename: string,
    filters: Array<{ name: string; extensions: string[] }>,
  ): Promise<boolean> {
    // Check if running in Electron environment
    if (
      window.electronAPI &&
      typeof window.electronAPI.saveFile === "function"
    ) {
      try {
        const res = await window.electronAPI.saveFile({
          defaultPath: defaultFilename,
          data,
          filters,
        });
        return !res.canceled;
      } catch (err) {
        console.error("Electron save dialog error:", err);
      }
    }

    // Fallback for standard browser
    try {
      const blob = new Blob([data], { type: "text/plain;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = defaultFilename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      return true;
    } catch (err) {
      console.error("Browser download error:", err);
      return false;
    }
  }
}
