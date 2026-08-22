import {
  YouTubeCredentials,
  VideoQueueItem,
  GeneratedShortsIdea,
  YouTubeScheduleConfig,
  ScannedVideoFile,
} from "../types";
import { FRUITS, MATERIALS_BY_CATEGORY } from "../data/gemstoneMatrix";

const STORAGE_KEY_CREDS = "yt_oauth_credentials";
const STORAGE_KEY_SCHEDULE_CFG = "yt_schedule_config";
const STORAGE_KEY_UPLOAD_HISTORY = "yt_uploaded_history_map";

// Helper: Remove Vietnamese tones & normalize text
function normalizeText(str: string): string {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D")
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

// Built-in Vietnamese Slang & Alias Translation Dictionary
const SUBJECT_ALIASES: Array<{
  keywords: string[];
  englishName: string;
  emoji: string;
}> = [
  // 1. Trái Cây
  {
    keywords: [
      "trai dat",
      "traidat",
      "dia cau",
      "diacau",
      "earth",
      "trai dia cau",
    ],
    englishName: "Earth",
    emoji: "🌍",
  },
  {
    keywords: [
      "luu",
      "trai luu",
      "qua luu",
      "trailuu",
      "qualuu",
      "pomegranate",
    ],
    englishName: "Pomegranate",
    emoji: "🍎",
  },
  {
    keywords: ["bo", "qua bo", "trai bo", "quabo", "traibo", "avocado"],
    englishName: "Avocado",
    emoji: "🥑",
  },
  {
    keywords: [
      "thanh long",
      "thanhlong",
      "dragon fruit",
      "dragonfruit",
      "pitaya",
    ],
    englishName: "Dragonfruit",
    emoji: "🐉",
  },
  {
    keywords: ["dua hau", "duahau", "watermelon"],
    englishName: "Watermelon",
    emoji: "🍉",
  },
  {
    keywords: ["cam", "qua cam", "trai cam", "orange"],
    englishName: "Orange",
    emoji: "🍊",
  },
  {
    keywords: ["kiwi", "qua kiwi", "trai kiwi"],
    englishName: "Kiwi",
    emoji: "🥝",
  },
  {
    keywords: ["nho", "chum nho", "grape", "grapes"],
    englishName: "Grapes",
    emoji: "🍇",
  },
  {
    keywords: ["dao", "qua dao", "trai dao", "peach"],
    englishName: "Peach",
    emoji: "🍑",
  },
  {
    keywords: ["xoai", "qua xoai", "trai xoai", "mango"],
    englishName: "Mango",
    emoji: "🥭",
  },
  {
    keywords: ["thom", "khom", "qua dua", "trai dua", "pineapple"],
    englishName: "Pineapple",
    emoji: "🍍",
  },
  {
    keywords: ["dua", "trai dua", "qua dua", "coconut"],
    englishName: "Coconut",
    emoji: "🥥",
  },

  // 2. Công nghệ & Thạch
  {
    keywords: ["iphone", "dien thoai", "phone", "cyber iphone"],
    englishName: "Cyber iPhone",
    emoji: "📱",
  },
  {
    keywords: ["ps5", "tay cam", "gamepad", "controller", "playstation"],
    englishName: "PS5 Controller",
    emoji: "🎮",
  },
  {
    keywords: ["giay", "sneaker", "nike", "shoe"],
    englishName: "Crystal Sneaker",
    emoji: "👟",
  },
  {
    keywords: ["may anh", "camera", "may chup hinh"],
    englishName: "Retro Camera",
    emoji: "📷",
  },
  {
    keywords: ["airpods", "tai nghe", "earbuds", "headphone"],
    englishName: "AirPods",
    emoji: "🎧",
  },
  {
    keywords: ["rtx", "gpu", "card man hinh", "vga"],
    englishName: "RTX GPU",
    emoji: "💻",
  },
  {
    keywords: ["smartwatch", "dong ho", "watch"],
    englishName: "Smartwatch",
    emoji: "⌚",
  },
  {
    keywords: ["cassette", "bang cassette", "tape"],
    englishName: "Cassette Tape",
    emoji: "📼",
  },
  {
    keywords: ["keycap", "ban phim", "switch", "keyboard"],
    englishName: "Keycap",
    emoji: "⌨️",
  },
  {
    keywords: ["tang luc", "lon tang luc", "energy can", "plasma can"],
    englishName: "Plasma Energy Can",
    emoji: "⚡",
  },

  // 3. Hành Tinh & Vũ Trụ
  {
    keywords: ["sao tho", "saotho", "saturn"],
    englishName: "Saturn",
    emoji: "🪐",
  },
  {
    keywords: ["mat trang", "mattrang", "moon", "lunar"],
    englishName: "Moon",
    emoji: "🌙",
  },
  { keywords: ["sao hoa", "saohoa", "mars"], englishName: "Mars", emoji: "🔴" },
  {
    keywords: ["lo den", "loden", "black hole", "blackhole"],
    englishName: "Black Hole",
    emoji: "🕳️",
  },
  {
    keywords: ["sao moc", "saomoc", "jupiter"],
    englishName: "Jupiter",
    emoji: "🪐",
  },
  {
    keywords: ["mat troi", "mattroi", "sun", "solar"],
    englishName: "Sun",
    emoji: "☀️",
  },
  {
    keywords: ["sao hai vuong", "saohaivuong", "neptune"],
    englishName: "Neptune",
    emoji: "🔵",
  },
  {
    keywords: ["thien thach", "thienthach", "meteorite", "meteor", "asteroid"],
    englishName: "Meteorite",
    emoji: "☄️",
  },
  {
    keywords: ["pulsar", "neutron", "sao neutron"],
    englishName: "Pulsar Star",
    emoji: "💫",
  },

  // 4. Ảo ảnh bánh & sáp
  {
    keywords: ["thoi vang", "thoivang", "gold ingot", "gold bar", "cuc vang"],
    englishName: "Gold Ingot",
    emoji: "🧈",
  },
  {
    keywords: ["gach", "vien gach", "viengach", "brick"],
    englishName: "Rough Brick",
    emoji: "🧱",
  },
  {
    keywords: ["go", "khoi go", "khoigo", "wood log", "wood", "tram huong"],
    englishName: "Wood Log",
    emoji: "🪵",
  },
  {
    keywords: ["xa phong", "xaphong", "soap", "marble soap"],
    englishName: "Marble Soap",
    emoji: "🧼",
  },
  {
    keywords: ["be tong", "betong", "concrete", "cinder"],
    englishName: "Concrete Block",
    emoji: "🏗️",
  },
  {
    keywords: ["cuc tay", "cuctay", "tay but chi", "eraser"],
    englishName: "Giant Eraser",
    emoji: "✏️",
  },
  {
    keywords: ["co le", "cole", "wrench"],
    englishName: "Rusty Wrench",
    emoji: "🔧",
  },
  {
    keywords: ["sach", "cuon sach", "cuonsach", "book", "leather book"],
    englishName: "Ancient Book",
    emoji: "📖",
  },
  {
    keywords: ["cat dong luc", "catdongluc", "kinetic sand", "sand castle"],
    englishName: "Kinetic Sand Castle",
    emoji: "🏖️",
  },
  {
    keywords: ["bot bien", "botbien", "sponge"],
    englishName: "Kitchen Sponge",
    emoji: "🧽",
  },

  // 5. Trứng Rồng & Hóa Thạch
  {
    keywords: ["trung rong", "trungrong", "dragon egg", "dragonegg"],
    englishName: "Dragon Egg",
    emoji: "🥚",
  },
  {
    keywords: ["to ong", "toong", "honeycomb"],
    englishName: "Citrine Honeycomb",
    emoji: "🍯",
  },
  {
    keywords: ["ho phach", "hophach", "fossil amber", "fossil"],
    englishName: "Amber Fossil",
    emoji: "🦕",
  },
  {
    keywords: ["rang ca map", "rangcamap", "megalodon"],
    englishName: "Megalodon Tooth",
    emoji: "🦈",
  },

  // 6. Đại Dương Pha Lê
  {
    keywords: ["oc anh vu", "ocanhvu", "nautilus"],
    englishName: "Nautilus Shell",
    emoji: "🐚",
  },
  {
    keywords: ["sao bien", "saobien", "starfish"],
    englishName: "Starfish",
    emoji: "⭐",
  },
  {
    keywords: [
      "vo so",
      "voso",
      "ngoc trai",
      "ngoctrai",
      "clam",
      "giant clam",
      "pearl",
    ],
    englishName: "Giant Clam",
    emoji: "🦪",
  },
  {
    keywords: ["sua", "con sua", "consua", "jellyfish"],
    englishName: "Crystal Jellyfish",
    emoji: "🪼",
  },
  {
    keywords: ["oc bien", "ocbien", "conch", "pink conch"],
    englishName: "Conch Shell",
    emoji: "🐌",
  },
  {
    keywords: ["san ho", "sanho", "coral", "coral reef"],
    englishName: "Coral Reef",
    emoji: "🪸",
  },
  {
    keywords: ["ca ngua", "cangua", "seahorse"],
    englishName: "Amber Seahorse",
    emoji: "🌊",
  },
  {
    keywords: ["nhim bien", "nhimbien", "sea urchin", "urchin"],
    englishName: "Sea Urchin",
    emoji: "🦔",
  },
  {
    keywords: ["mai rua", "mairua", "rua bien", "turtle", "sea turtle"],
    englishName: "Sea Turtle Shell",
    emoji: "🐢",
  },
  {
    keywords: ["thuy tinh bien", "thuytinhbien", "sea glass", "seaglass"],
    englishName: "Sea Glass",
    emoji: "💎",
  },
];

const GEMSTONE_ALIASES: Array<{ keywords: string[]; englishName: string }> = [
  { keywords: ["ruby", "hong ngoc", "hongngoc"], englishName: "Ruby" },
  { keywords: ["sapphire", "lam ngoc", "lamngoc"], englishName: "Sapphire" },
  {
    keywords: ["emerald", "ngoc luc bao", "ngoclucbao"],
    englishName: "Emerald",
  },
  {
    keywords: ["amethyst", "thach anh tim", "thachanhtim"],
    englishName: "Amethyst",
  },
  {
    keywords: ["opal", "ngoc mat meo", "mat meo", "matmeo"],
    englishName: "Rainbow Opal",
  },
  { keywords: ["diamond", "kim cuong", "kimcuong"], englishName: "Diamond" },
  { keywords: ["amber", "ho phach", "hophach"], englishName: "Amber" },
  { keywords: ["jade", "ngoc bich", "ngocbich"], englishName: "Imperial Jade" },
  { keywords: ["tanzanite"], englishName: "Tanzanite" },
  {
    keywords: ["obsidian", "hac dien thach", "hacdienthach"],
    englishName: "Obsidian",
  },
  {
    keywords: ["rose quartz", "thach anh hong", "thachanhhong"],
    englishName: "Rose Quartz",
  },
  {
    keywords: ["aquamarine", "ngoc xanh bien", "ngocxanhbien"],
    englishName: "Aquamarine",
  },
  {
    keywords: ["topaz", "hoang ngoc", "hoangngoc"],
    englishName: "Imperial Topaz",
  },
  {
    keywords: ["moonstone", "da mat trang", "mat trang"],
    englishName: "Moonstone",
  },
  { keywords: ["jelly", "thach", "thuy tinh"], englishName: "Cyber Jelly" },
  { keywords: ["titanium", "titan"], englishName: "Titanium" },
  { keywords: ["gold", "vang"], englishName: "Gold" },
  { keywords: ["magma", "lava", "dung nham"], englishName: "Magma" },
  { keywords: ["frost", "ice", "bang"], englishName: "Frost" },
  { keywords: ["plasma"], englishName: "Plasma" },
  { keywords: ["neon"], englishName: "Neon" },
];

export class YouTubeService {
  /**
   * Get stored OAuth credentials
   */
  public static getCredentials(): YouTubeCredentials | null {
    try {
      const raw = localStorage.getItem(STORAGE_KEY_CREDS);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  }

  /**
   * Save OAuth credentials
   */
  public static saveCredentials(creds: YouTubeCredentials): void {
    localStorage.setItem(STORAGE_KEY_CREDS, JSON.stringify(creds));
  }

  /**
   * Clear credentials (Logout)
   */
  public static clearCredentials(): void {
    localStorage.removeItem(STORAGE_KEY_CREDS);
  }

  /**
   * Generate Google OAuth 2.0 Auth URL for YouTube upload permissions
   */
  public static getAuthUrl(clientId: string): string {
    const scope = encodeURIComponent(
      "https://www.googleapis.com/auth/youtube.upload https://www.googleapis.com/auth/youtube.readonly",
    );
    // Use desktop out-of-band / manual code redirect
    const redirectUri = encodeURIComponent("urn:ietf:wg:oauth:2.0:oob");
    return `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId.trim()}&redirect_uri=${redirectUri}&response_type=code&scope=${scope}&access_type=offline&prompt=consent`;
  }

  /**
   * Exchange Auth Code for Access & Refresh Tokens
   */
  public static async exchangeAuthCode(
    code: string,
    clientId: string,
    clientSecret: string,
  ): Promise<{
    success: boolean;
    creds?: YouTubeCredentials;
    message?: string;
  }> {
    try {
      const params = new URLSearchParams();
      params.append("code", code.trim());
      params.append("client_id", clientId.trim());
      params.append("client_secret", clientSecret.trim());
      params.append("redirect_uri", "urn:ietf:wg:oauth:2.0:oob");
      params.append("grant_type", "authorization_code");

      const res = await fetch("https://oauth2.googleapis.com/token", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: params.toString(),
      });

      const data = await res.json();

      if (!res.ok || data.error) {
        return {
          success: false,
          message:
            data.error_description ||
            data.error ||
            "Mã xác thực không hợp lệ hoặc đã hết hạn.",
        };
      }

      const creds: YouTubeCredentials = {
        clientId: clientId.trim(),
        clientSecret: clientSecret.trim(),
        accessToken: data.access_token,
        refreshToken: data.refresh_token,
        expiresAt: Date.now() + (data.expires_in || 3600) * 1000,
      };

      // Fetch Channel Info
      const channel = await this.fetchChannelProfile(creds.accessToken!);
      if (channel) {
        creds.channelId = channel.id;
        creds.channelTitle = channel.title;
        creds.channelThumbnail = channel.thumbnail;
        creds.subscriberCount = channel.subscribers;
      }

      this.saveCredentials(creds);
      return { success: true, creds };
    } catch (err: unknown) {
      const msg =
        err instanceof Error ? err.message : "Lỗi kết nối máy chủ Google.";
      return { success: false, message: msg };
    }
  }

  /**
   * Refresh Access Token if expired
   */
  public static async getValidAccessToken(
    creds: YouTubeCredentials,
  ): Promise<string | null> {
    if (
      creds.accessToken &&
      creds.expiresAt &&
      creds.expiresAt > Date.now() + 60000
    ) {
      return creds.accessToken;
    }

    if (!creds.refreshToken) return null;

    try {
      const params = new URLSearchParams();
      params.append("client_id", creds.clientId);
      params.append("client_secret", creds.clientSecret);
      params.append("refresh_token", creds.refreshToken);
      params.append("grant_type", "refresh_token");

      const res = await fetch("https://oauth2.googleapis.com/token", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: params.toString(),
      });

      const data = await res.json();
      if (!res.ok || !data.access_token) return null;

      creds.accessToken = data.access_token;
      creds.expiresAt = Date.now() + (data.expires_in || 3600) * 1000;
      this.saveCredentials(creds);

      return creds.accessToken || null;
    } catch {
      return null;
    }
  }

  /**
   * Fetch logged-in channel info
   */
  public static async fetchChannelProfile(accessToken: string): Promise<{
    id: string;
    title: string;
    thumbnail: string;
    subscribers: string;
  } | null> {
    try {
      const res = await fetch(
        "https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&mine=true",
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        },
      );

      const data = await res.json();
      if (!res.ok || !data.items || data.items.length === 0) return null;

      const item = data.items[0];
      return {
        id: item.id,
        title: item.snippet?.title || "Kênh YouTube của bạn",
        thumbnail: item.snippet?.thumbnails?.default?.url || "",
        subscribers: item.statistics?.subscriberCount || "0",
      };
    } catch {
      return null;
    }
  }

  /**
   * Upload video file directly to YouTube using Resumable Upload API
   */
  public static async uploadVideo(
    file: File | Blob,
    metadata: {
      title: string;
      description: string;
      tags: string[];
      scheduledTime?: string; // ISO String for Scheduled YouTube Publish
      privacyStatus: "private" | "unlisted" | "public";
    },
    onProgress: (percent: number) => void,
  ): Promise<{
    success: boolean;
    videoId?: string;
    url?: string;
    error?: string;
  }> {
    const creds = this.getCredentials();
    if (!creds) {
      return {
        success: false,
        error: "Chưa kết nối tài khoản YouTube OAuth 2.0.",
      };
    }

    const token = await this.getValidAccessToken(creds);
    if (!token) {
      return {
        success: false,
        error: "Phiên đăng nhập YouTube đã hết hạn. Vui lòng đăng nhập lại.",
      };
    }

    try {
      // 1. Prepare snippet and status metadata
      const isScheduled = !!metadata.scheduledTime;
      const snippet = {
        title: metadata.title.slice(0, 100), // Max 100 chars
        description: metadata.description.slice(0, 5000),
        tags: metadata.tags.slice(0, 50),
        categoryId: "24", // Entertainment
      };

      const status: {
        privacyStatus: string;
        publishAt?: string;
        selfDeclaredMadeForKids: boolean;
      } = {
        // When scheduling a video, privacyStatus MUST be set to "private"
        privacyStatus: isScheduled ? "private" : metadata.privacyStatus,
        selfDeclaredMadeForKids: false,
      };

      if (isScheduled && metadata.scheduledTime) {
        status.publishAt = metadata.scheduledTime;
      }

      // 2. Initiate Resumable Upload Session
      const initRes = await fetch(
        "https://www.googleapis.com/upload/youtube/v3/videos?uploadType=resumable&part=snippet,status",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json; charset=UTF-8",
            "X-Upload-Content-Length": file.size.toString(),
            "X-Upload-Content-Type": file.type || "video/mp4",
          },
          body: JSON.stringify({ snippet, status }),
        },
      );

      if (!initRes.ok) {
        const errJson = await initRes.json().catch(() => ({}));
        return {
          success: false,
          error:
            errJson?.error?.message ||
            `Lỗi khởi tạo upload YouTube (${initRes.status}: ${initRes.statusText})`,
        };
      }

      const uploadUrl = initRes.headers.get("location");
      if (!uploadUrl) {
        return {
          success: false,
          error: "Không nhận được đường dẫn upload từ YouTube.",
        };
      }

      // 3. Perform Resumable Upload (with XHR for progress tracking)
      return new Promise((resolve) => {
        const xhr = new XMLHttpRequest();
        xhr.open("PUT", uploadUrl, true);
        xhr.setRequestHeader("Content-Type", file.type || "video/mp4");

        xhr.upload.onprogress = (e) => {
          if (e.lengthComputable) {
            const percent = Math.round((e.loaded / e.total) * 100);
            onProgress(percent);
          }
        };

        xhr.onload = () => {
          if (xhr.status === 200 || xhr.status === 201) {
            try {
              const resData = JSON.parse(xhr.responseText);
              const videoId = resData.id;
              const url = `https://youtube.com/shorts/${videoId}`;
              // Save to uploaded map
              this.markVideoAsUploaded(metadata.title, videoId, url);
              resolve({ success: true, videoId, url });
            } catch {
              resolve({ success: true });
            }
          } else {
            let errorMsg = `Upload thất bại (${xhr.status})`;
            try {
              const err = JSON.parse(xhr.responseText);
              errorMsg = err.error?.message || errorMsg;
            } catch {
              // ignore
            }
            resolve({ success: false, error: errorMsg });
          }
        };

        xhr.onerror = () => {
          resolve({
            success: false,
            error: "Mất kết nối mạng trong quá trình upload video.",
          });
        };

        xhr.send(file);
      });
    } catch (err: unknown) {
      const msg =
        err instanceof Error
          ? err.message
          : "Lỗi không xác định khi tải video.";
      return { success: false, error: msg };
    }
  }

  /**
   * Upload record management (Stores uploaded video history)
   */
  public static getUploadedHistory(): Record<
    string,
    { videoId: string; url: string; date: number }
  > {
    try {
      const raw = localStorage.getItem(STORAGE_KEY_UPLOAD_HISTORY);
      return raw ? JSON.parse(raw) : {};
    } catch {
      return {};
    }
  }

  public static markVideoAsUploaded(
    key: string,
    videoId: string,
    url: string,
  ): void {
    const history = this.getUploadedHistory();
    history[key] = { videoId, url, date: Date.now() };
    localStorage.setItem(STORAGE_KEY_UPLOAD_HISTORY, JSON.stringify(history));
  }

  /**
   * Smart Keyword Matching Algorithm
   * Matches a scanned video filename (e.g. "Avocado_Emerald.mp4" or "Bo_Ngoc_Luc_Bao.mp4") with History Ideas
   */
  /**
   * Smart Keyword Matching & Automatic English Translation Algorithm
   * Matches a scanned video filename (e.g. "Traidat.mp4", "Luu.mp4", "Avocado_Emerald.mp4", "Bo_Ngoc_Luc_Bao.mp4")
   * with History Ideas or Built-in Matrix & English Dictionaries.
   */
  public static matchVideoWithIdea(
    fileName: string,
    historyIdeas: GeneratedShortsIdea[],
  ): {
    matchedIdea?: GeneratedShortsIdea;
    title: string;
    description: string;
    tags: string[];
  } {
    // 1. Clean and normalize filename
    const baseName = fileName.replace(/\.[^/.]+$/, ""); // strip extension
    const unCamel = baseName.replace(/([a-z])([A-Z])/g, "$1 $2"); // split camelCase
    const normalizedName = normalizeText(unCamel);
    const words = normalizedName.split(/\s+/).filter(Boolean);

    // 2. Try matching with History Ideas first
    let bestHistoryMatch: GeneratedShortsIdea | undefined;
    let maxScore = 0;

    for (const idea of historyIdeas) {
      let score = 0;
      const fruitEn = normalizeText(idea.config.fruit.nameEn);
      const fruitVi = normalizeText(idea.config.fruit.nameVi);
      const gemEn = normalizeText(idea.config.gemstone.nameEn);
      const gemVi = normalizeText(idea.config.gemstone.nameVi);

      if (normalizedName.includes(fruitEn)) score += 4;
      if (normalizedName.includes(fruitVi)) score += 4;
      if (normalizedName.includes(gemEn)) score += 3;
      if (normalizedName.includes(gemVi)) score += 3;

      if (score > maxScore) {
        maxScore = score;
        bestHistoryMatch = idea;
      }
    }

    if (bestHistoryMatch && maxScore >= 3) {
      const primaryTitle =
        bestHistoryMatch.seo.viralTitlesVi?.[0] ||
        bestHistoryMatch.seo.viralTitlesEn?.[0] ||
        `Oddly Satisfying ${bestHistoryMatch.config.gemstone.nameEn} ${bestHistoryMatch.config.fruit.nameEn} Slice ASMR ${bestHistoryMatch.config.fruit.emoji} 😜 #shorts #asmr`;

      return {
        matchedIdea: bestHistoryMatch,
        title: primaryTitle,
        description:
          bestHistoryMatch.seo.descriptionTemplate ||
          `What do you think of this ${bestHistoryMatch.config.gemstone.nameEn} ${bestHistoryMatch.config.fruit.nameEn} slice? ${bestHistoryMatch.config.fruit.emoji} ✨\n\nComment what I should slice next! 👇\n\n#shorts #satisfying #oddlysatisfying #asmr #asmrsounds #visualart #${bestHistoryMatch.config.gemstone.nameEn.toLowerCase()} #cutting #feelai`,
        tags: bestHistoryMatch.seo.hashtags || [
          "#shorts",
          "#satisfying",
          "#oddlysatisfying",
          "#asmr",
          "#asmrsounds",
          "#visualart",
          "#cutting",
          "#feelai",
        ],
      };
    }

    // 3. Fallback: Lookup in Subject Aliases and Matrix Database
    let detectedSubjectEn: string | null = null;
    let detectedEmoji = "💎";
    let detectedCategory: string | null = null;

    // Check alias dictionary
    for (const item of SUBJECT_ALIASES) {
      for (const kw of item.keywords) {
        const normKw = normalizeText(kw);
        if (
          normalizedName === normKw ||
          normalizedName.includes(` ${normKw} `) ||
          normalizedName.startsWith(`${normKw} `) ||
          normalizedName.endsWith(` ${normKw}`) ||
          normalizedName.includes(normKw.replace(/\s+/g, "")) ||
          words.includes(normKw)
        ) {
          detectedSubjectEn = item.englishName;
          detectedEmoji = item.emoji;
          break;
        }
      }
      if (detectedSubjectEn) break;
    }

    // If not found in aliases, check FRUITS matrix
    if (!detectedSubjectEn) {
      for (const fruit of FRUITS) {
        const normEn = normalizeText(fruit.nameEn);
        const normVi = normalizeText(fruit.nameVi);
        const normId = normalizeText(fruit.id);

        if (
          normalizedName.includes(normEn) ||
          normalizedName.includes(normVi) ||
          normalizedName.includes(normId) ||
          normalizedName.includes(normVi.replace(/\s+/g, ""))
        ) {
          detectedSubjectEn = fruit.nameEn;
          detectedEmoji = fruit.emoji;
          detectedCategory = fruit.category;
          break;
        }
      }
    }

    // 4. Lookup Gemstone / Material
    let detectedGemstoneEn: string | null = null;
    for (const gem of GEMSTONE_ALIASES) {
      for (const kw of gem.keywords) {
        const normKw = normalizeText(kw);
        if (
          normalizedName.includes(normKw) ||
          normalizedName.includes(normKw.replace(/\s+/g, "")) ||
          words.includes(normKw)
        ) {
          detectedGemstoneEn = gem.englishName;
          break;
        }
      }
      if (detectedGemstoneEn) break;
    }

    // If not found in aliases, search MATERIALS_BY_CATEGORY
    if (!detectedGemstoneEn) {
      const allMaterials = Object.values(MATERIALS_BY_CATEGORY).flat();
      for (const mat of allMaterials) {
        const normEn = normalizeText(mat.nameEn);
        const normVi = normalizeText(mat.nameVi);
        if (
          normalizedName.includes(normEn) ||
          normalizedName.includes(normVi)
        ) {
          detectedGemstoneEn = mat.nameEn;
          break;
        }
      }
    }

    // 5. Generate 100% English Viral Title
    let finalTitle = "";
    const subjectName = detectedSubjectEn || "Object";

    if (detectedGemstoneEn) {
      finalTitle = `Oddly Satisfying ${detectedGemstoneEn} ${subjectName} Slice ASMR ${detectedEmoji} 😜 #shorts #asmr`;
    } else if (detectedSubjectEn) {
      // Theme-appropriate descriptor
      if (
        detectedCategory === "illusion_cake" ||
        detectedSubjectEn.toLowerCase().includes("cake") ||
        detectedSubjectEn.toLowerCase().includes("ingot")
      ) {
        finalTitle = `Oddly Satisfying ${subjectName} Illusion Slice ASMR ${detectedEmoji} 😜 #shorts #asmr`;
      } else if (
        detectedCategory === "tech_jelly" ||
        detectedSubjectEn.toLowerCase().includes("iphone") ||
        detectedSubjectEn.toLowerCase().includes("controller")
      ) {
        finalTitle = `Oddly Satisfying ${subjectName} Cyber Jelly Slice ASMR ${detectedEmoji} 😜 #shorts #asmr`;
      } else {
        finalTitle = `Oddly Satisfying ${subjectName} Gemstone Slice ASMR ${detectedEmoji} 😜 #shorts #asmr`;
      }
    } else {
      // Clean fallback
      const cleanFallback = words
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" ");
      finalTitle = `Oddly Satisfying ${cleanFallback || "Gemstone"} Slice ASMR 💎 😜 #shorts #asmr`;
    }

    return {
      title: finalTitle,
      description: `What do you think of this ${detectedGemstoneEn ? detectedGemstoneEn + " " : ""}${subjectName} slice? ${detectedEmoji} ✨\n\nComment what I should slice next! 👇\n\n#shorts #satisfying #oddlysatisfying #asmr #asmrsounds #visualart #${subjectName.toLowerCase().replace(/\s+/g, "")} #cutting #feelai`,
      tags: [
        "#shorts",
        "#satisfying",
        "#oddlysatisfying",
        "#asmr",
        "#asmrsounds",
        "#visualart",
        `#${subjectName.toLowerCase().replace(/\s+/g, "")}`,
        "#cutting",
        "#feelai",
      ],
    };
  }

  /**
   * Convert ScannedVideoFile list into VideoQueueItem list with auto-matching
   */
  public static processScannedFiles(
    files: ScannedVideoFile[],
    historyIdeas: GeneratedShortsIdea[],
  ): VideoQueueItem[] {
    const uploadHistory = this.getUploadedHistory();

    return files.map((f, idx) => {
      const match = this.matchVideoWithIdea(f.name, historyIdeas);
      const isAlreadyUploaded =
        !!uploadHistory[match.title] || !!uploadHistory[f.name];

      return {
        id: `vid-queue-${Date.now()}-${idx}`,
        fileName: f.name,
        filePath: f.path,
        fileSize: f.size,
        lastModified: f.lastModified,
        matchedIdeaId: match.matchedIdea?.id,
        matchedConceptTitle: match.matchedIdea?.conceptTitle,
        customTitle: match.title,
        customDescription: match.description,
        customTags: match.tags,
        privacyStatus: "private",
        status: isAlreadyUploaded ? "published" : "idle",
        uploadProgress: isAlreadyUploaded ? 100 : 0,
        youtubeUrl:
          uploadHistory[match.title]?.url || uploadHistory[f.name]?.url,
        youtubeVideoId:
          uploadHistory[match.title]?.videoId || uploadHistory[f.name]?.videoId,
      };
    });
  }

  /**
   * Smart Schedule Calculator
   * Distributes N videos across days at specific time slots reliably in Local Time
   */
  public static calculateScheduleDates(
    count: number,
    config: YouTubeScheduleConfig,
  ): string[] {
    const times =
      config.timesOfDay && config.timesOfDay.length > 0
        ? config.timesOfDay
        : ["11:30", "18:30"];

    const vPerDay = Math.max(1, config.videosPerDay || times.length);

    // Parse start date cleanly in Local Time (avoids UTC offset shifts)
    let startYear: number, startMonth: number, startDay: number;
    if (config.startDate && config.startDate.includes("-")) {
      const parts = config.startDate.split("-").map(Number);
      startYear = parts[0];
      startMonth = parts[1] - 1;
      startDay = parts[2];
    } else {
      const now = new Date();
      startYear = now.getFullYear();
      startMonth = now.getMonth();
      startDay = now.getDate() + 1; // Tomorrow
    }

    const dates: string[] = [];

    for (let i = 0; i < count; i++) {
      const dayOffset = Math.floor(i / vPerDay);
      const slotInDay = i % vPerDay;
      const timeStr = times[slotInDay % times.length] || "12:00";
      const [hours, minutes] = timeStr.split(":").map(Number);

      const d = new Date(
        startYear,
        startMonth,
        startDay + dayOffset,
        hours,
        minutes,
        0,
        0,
      );

      dates.push(d.toISOString());
    }

    return dates;
  }

  /**
   * Stored Schedule Config
   */
  public static getScheduleConfig(): YouTubeScheduleConfig {
    try {
      const raw = localStorage.getItem(STORAGE_KEY_SCHEDULE_CFG);
      if (raw) return JSON.parse(raw);
    } catch {
      // ignore
    }

    // Default to tomorrow in local time format YYYY-MM-DD
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const y = tomorrow.getFullYear();
    const m = String(tomorrow.getMonth() + 1).padStart(2, "0");
    const d = String(tomorrow.getDate()).padStart(2, "0");
    const tomorrowStr = `${y}-${m}-${d}`;

    return {
      videosPerDay: 2,
      timesOfDay: ["11:30", "18:30"],
      startDate: tomorrowStr,
      privacyStatus: "private",
    };
  }

  public static saveScheduleConfig(cfg: YouTubeScheduleConfig): void {
    localStorage.setItem(STORAGE_KEY_SCHEDULE_CFG, JSON.stringify(cfg));
  }
}
