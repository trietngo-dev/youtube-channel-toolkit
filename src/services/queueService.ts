import { BatchTaskItem, GenerationConfig, GeneratedShortsIdea } from "../types";
import { GeminiService } from "./geminiService";

export type QueueState = "idle" | "running" | "paused" | "stopped";

export type QueueListener = (
  tasks: BatchTaskItem[],
  state: QueueState,
  stats: {
    total: number;
    completed: number;
    failed: number;
    currentTaskIndex: number;
  },
) => void;

export class QueueService {
  private static instance: QueueService;
  private tasks: BatchTaskItem[] = [];
  private state: QueueState = "idle";
  private currentProcessingIndex: number = -1;
  private delayMs: number = 3500; // Safe default delay: 3.5s per request
  private listeners: Set<QueueListener> = new Set();
  private abortController: AbortController | null = null;
  private onItemCompletedCallback?: (idea: GeneratedShortsIdea) => void;

  private constructor() {
    // Load persisted tasks if any
    try {
      const saved = localStorage.getItem("gemstone_fruit_batch_queue");
      if (saved) {
        this.tasks = JSON.parse(saved);
        // Reset any processing state to pending
        this.tasks.forEach((t) => {
          if (t.status === "processing") t.status = "pending";
        });
      }
    } catch {
      this.tasks = [];
    }
  }

  public static getInstance(): QueueService {
    if (!QueueService.instance) {
      QueueService.instance = new QueueService();
    }
    return QueueService.instance;
  }

  public setOnItemCompleted(
    callback: (idea: GeneratedShortsIdea) => void,
  ): void {
    this.onItemCompletedCallback = callback;
  }

  public subscribe(listener: QueueListener): () => void {
    this.listeners.add(listener);
    this.notify();
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notify(): void {
    const total = this.tasks.length;
    const completed = this.tasks.filter((t) => t.status === "success").length;
    const failed = this.tasks.filter((t) => t.status === "failed").length;
    const stats = {
      total,
      completed,
      failed,
      currentTaskIndex: this.currentProcessingIndex,
    };

    // Save to localStorage
    try {
      localStorage.setItem(
        "gemstone_fruit_batch_queue",
        JSON.stringify(this.tasks),
      );
    } catch {
      // Ignore quota storage error
    }

    this.listeners.forEach((listener) =>
      listener([...this.tasks], this.state, stats),
    );
  }

  public setDelayMs(ms: number): void {
    this.delayMs = Math.max(1000, ms);
  }

  public getDelayMs(): number {
    return this.delayMs;
  }

  public getTasks(): BatchTaskItem[] {
    return [...this.tasks];
  }

  public getState(): QueueState {
    return this.state;
  }

  public addTasks(configs: GenerationConfig[]): void {
    const newItems: BatchTaskItem[] = configs.map((config) => ({
      id: `task-${Date.now()}-${Math.random().toString(36).substr(2, 7)}`,
      config,
      status: "pending",
      retryCount: 0,
      progressPercent: 0,
    }));

    this.tasks.push(...newItems);
    this.notify();
  }

  public async start(): Promise<void> {
    if (this.state === "running") return;
    this.state = "running";
    this.abortController = new AbortController();
    this.notify();

    await this.processQueue();
  }

  public pause(): void {
    if (this.state === "running") {
      this.state = "paused";
      this.notify();
    }
  }

  public resume(): void {
    if (this.state === "paused") {
      this.start();
    }
  }

  public stop(): void {
    this.state = "stopped";
    if (this.abortController) {
      this.abortController.abort();
      this.abortController = null;
    }
    this.notify();
  }

  public clear(): void {
    this.stop();
    this.tasks = [];
    this.currentProcessingIndex = -1;
    this.state = "idle";
    this.notify();
  }

  public removeTask(id: string): void {
    this.tasks = this.tasks.filter((t) => t.id !== id);
    this.notify();
  }

  public retryTask(id: string): void {
    const task = this.tasks.find((t) => t.id === id);
    if (task && task.status === "failed") {
      task.status = "pending";
      task.error = undefined;
      task.progressPercent = 0;
      this.notify();
      if (this.state !== "running") {
        this.start();
      }
    }
  }

  public retryAllFailed(): void {
    this.tasks.forEach((task) => {
      if (task.status === "failed") {
        task.status = "pending";
        task.error = undefined;
        task.progressPercent = 0;
      }
    });
    this.notify();
    this.start();
  }

  private async processQueue(): Promise<void> {
    while (this.state === "running") {
      const nextIndex = this.tasks.findIndex((t) => t.status === "pending");
      if (nextIndex === -1) {
        // All tasks completed or failed
        this.state = "idle";
        this.currentProcessingIndex = -1;
        this.notify();
        break;
      }

      this.currentProcessingIndex = nextIndex;
      const currentTask = this.tasks[nextIndex];
      currentTask.status = "processing";
      currentTask.progressPercent = 30;
      this.notify();

      try {
        const result = await this.executeWithRetry(currentTask);
        currentTask.status = "success";
        currentTask.result = result;
        currentTask.progressPercent = 100;
        currentTask.error = undefined;

        if (this.onItemCompletedCallback) {
          this.onItemCompletedCallback(result);
        }
      } catch (err: unknown) {
        const errorMessage =
          err instanceof Error ? err.message : "Unknown generation error";
        currentTask.status = "failed";
        currentTask.error = errorMessage;
        currentTask.progressPercent = 0;
      }

      this.notify();

      // Check if paused or stopped
      if (this.state !== "running") break;

      // Throttle delay between requests to protect API Quota
      await this.sleep(this.delayMs);
    }
  }

  private async executeWithRetry(
    task: BatchTaskItem,
    maxRetries: number = 3,
  ): Promise<GeneratedShortsIdea> {
    let attempt = 0;
    let backoffDelay = 5000; // Initial 5s backoff if 429

    while (attempt <= maxRetries) {
      try {
        const idea = await GeminiService.generateShortsIdea(task.config);
        return idea;
      } catch (err: unknown) {
        attempt++;
        task.retryCount = attempt;

        const isRateLimit =
          (err as { status?: number })?.status === 429 ||
          (err instanceof Error && err.message.includes("429"));

        if (isRateLimit && attempt <= maxRetries) {
          // Quota exceeded: Exponential backoff delay
          task.error = `Chạm giới hạn Quota (429). Đang chờ ${backoffDelay / 1000}s để thử lại lần ${attempt}/${maxRetries}...`;
          this.notify();
          await this.sleep(backoffDelay);
          backoffDelay *= 2; // e.g. 5s -> 10s -> 20s
        } else if (attempt <= maxRetries) {
          // Other network glitches: brief retry
          task.error = `Lỗi mạng. Thử lại lần ${attempt}/${maxRetries}...`;
          this.notify();
          await this.sleep(2000);
        } else {
          throw err;
        }
      }
    }

    throw new Error("Vượt quá số lần thử lại tối đa.");
  }

  private sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
