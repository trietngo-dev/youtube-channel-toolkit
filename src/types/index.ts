export type ItemCategory =
  | "fruit"
  | "tech_jelly"
  | "cosmic_planet"
  | "illusion_cake"
  | "dragon_egg"
  | "ocean_crystal";

export interface SubjectCategoryInfo {
  id: ItemCategory;
  nameVi: string;
  nameEn: string;
  emoji: string;
  description: string;
}

export interface SubjectItem {
  id: string;
  category: ItemCategory;
  nameVi: string;
  nameEn: string;
  emoji: string;
  colorHex: string;
  typicalStructure: string;
  textureDescription: string;
}

// Keep FruitItem alias for backwards compatibility
export type FruitItem = SubjectItem;

export interface GemstoneItem {
  id: string;
  nameVi: string;
  nameEn: string;
  colorHex: string;
  opticalProperty: string; // e.g. "Vivid translucent red facets, glassy brilliance, internal fiery refractions"
  clarity: string;
}

export interface FluidItem {
  id: string;
  nameVi: string;
  nameEn: string;
  viscosity: string; // "Thick glowing syrup", "Sparkling liquid nectar", "Molten luminous honey"
  visualEffect: string; // "Bioluminescent particle trail", "Glittering micro-shimmers", "Radiant neon backlight"
  colorHex: string;
}

export interface ToolItem {
  id: string;
  nameVi: string;
  nameEn: string;
  bladeType: string;
  effectOnCut: string;
}

export interface AestheticStyle {
  id: string;
  nameVi: string;
  nameEn: string;
  lightingPrompt: string;
  backgroundPrompt: string;
}

export interface VideoPlatformStyle {
  id: string;
  name: string;
  description: string;
  defaultParams: string;
  motionKeywords: string;
}

export interface GenerationConfig {
  category: ItemCategory;
  fruit: SubjectItem; // Used as the subject item (fruit, tech object, planet, cake, egg, ocean)
  gemstone: GemstoneItem;
  fluid: FluidItem;
  tool: ToolItem;
  style: AestheticStyle;
  videoPlatform: string;
  aspectRatio: "9:16" | "16:9" | "1:1";
  customNotes?: string;
  language: "vi" | "en" | "both";
}

export interface YouTubeSEOData {
  viralTitlesVi: string[];
  viralTitlesEn: string[];
  hookText3s: string;
  audioSoundDesign: {
    soundEffects: string[];
    musicVibe: string;
    voiceoverHook?: string;
  };
  hashtags: string[];
  descriptionTemplate: string;
  targetKeywords: string[];
}

export interface GeneratedShortsIdea {
  id: string;
  timestamp: number;
  config: GenerationConfig;
  conceptTitle: string;
  startImagePrompt: {
    chatgpt: string;
    midjourney: string;
    flux: string;
    general: string;
    negativePrompt: string;
  };
  endImagePrompt: {
    chatgpt: string;
    midjourney: string;
    flux: string;
    general: string;
    negativePrompt: string;
  };
  videoMorphingPrompt: {
    geminiVeo: string;
    klingAI: string;
    runwayGen3: string;
    lumaDreamMachine: string;
    cameraMotion: string;
    motionIntensity: string;
    durationRecommendation: string;
  };
  seo: YouTubeSEOData;
  isFavorite?: boolean;
  notes?: string;
}

export interface BatchTaskItem {
  id: string;
  config: GenerationConfig;
  status: "pending" | "processing" | "success" | "failed";
  result?: GeneratedShortsIdea;
  error?: string;
  retryCount: number;
  progressPercent: number;
}

export interface GeminiModelOption {
  id: string;
  name: string;
  description: string;
  isCustom?: boolean;
}

export interface ScannedVideoFile {
  name: string;
  path: string;
  size: number;
  lastModified: number;
}

export interface VideoMediaMetadata {
  duration: number; // in seconds
  width: number;
  height: number;
  aspectRatio: string; // e.g. "9:16", "16:9", "1:1"
  aspectRatioValue: number; // width / height
  isShortsCompliant: boolean; // true if <= 60s and aspect ratio is vertical (<= 1.0)
  thumbnailUrl?: string; // base64 data url
  validationWarnings: string[];
}

export interface VideoQueueItem {
  id: string;
  fileName: string;
  filePath: string;
  fileSize: number;
  lastModified: number;
  matchedIdeaId?: string;
  matchedConceptTitle?: string;
  customTitle: string;
  customDescription: string;
  customTags: string[];
  scheduledTime?: string; // ISO string e.g. "2026-08-23T11:30:00.000Z"
  privacyStatus: "private" | "unlisted" | "public";
  status:
    | "idle"
    | "matching"
    | "ready"
    | "uploading"
    | "scheduled"
    | "published"
    | "error";
  uploadProgress: number; // 0 - 100
  youtubeVideoId?: string;
  youtubeUrl?: string;
  errorMessage?: string;

  // Media inspection metadata
  thumbnailUrl?: string;
  duration?: number; // seconds
  resolution?: string; // e.g. "1080x1920"
  aspectRatio?: string; // e.g. "9:16"
  isShortsCompliant?: boolean;
  validationWarnings?: string[];
}

export interface QuotaUsageState {
  dailyLimit: number; // default 10,000
  usedQuota: number; // units used today
  lastResetDate: string; // YYYY-MM-DD in PST
  history: Array<{
    date: string;
    usedUnits: number;
    uploadsCount: number;
  }>;
}

export interface YouTubeCredentials {
  clientId: string;
  clientSecret: string;
  accessToken?: string;
  refreshToken?: string;
  expiresAt?: number;
  channelId?: string;
  channelTitle?: string;
  channelThumbnail?: string;
  subscriberCount?: string;
}

export interface YouTubeScheduleConfig {
  videosPerDay: number;
  timesOfDay: string[]; // e.g. ["11:30", "18:30"]
  startDate: string; // YYYY-MM-DD
  privacyStatus: "private" | "unlisted" | "public";
  autoMultiDayQuotaStaging?: boolean; // automatically schedule across days based on 6 videos/day quota
}

declare global {
  interface Window {
    electronAPI?: {
      saveFile: (options: {
        defaultPath?: string;
        data: string;
        filters?: Array<{ name: string; extensions: string[] }>;
      }) => Promise<{ canceled: boolean; filePath?: string }>;
      selectFolder: () => Promise<{
        canceled: boolean;
        folderPath?: string;
        files?: ScannedVideoFile[];
      }>;
      selectVideoFiles: () => Promise<{
        canceled: boolean;
        files?: ScannedVideoFile[];
      }>;
      openExternal: (url: string) => Promise<boolean>;
      isElectron: boolean;
    };
  }
}
