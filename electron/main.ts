import { app, BrowserWindow, shell, ipcMain, dialog } from "electron";
import path from "path";
import fs from "fs";

let mainWindow: BrowserWindow | null = null;

const isDev = process.env.NODE_ENV === "development" || !app.isPackaged;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 1024,
    minHeight: 700,
    title: "Gemstone Fruit AI Studio - YouTube Shorts Creator Tool",
    backgroundColor: "#080b12",
    icon: path.join(__dirname, "../public/gem-icon.svg"),
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: false,
      contextIsolation: true,
      sandbox: false,
    },
  });

  mainWindow.removeMenu();

  if (isDev) {
    mainWindow.loadURL("http://localhost:5173");
    // Tự động mở DevTools khi chạy ở chế độ dev để dễ debug
    mainWindow.webContents.openDevTools({ mode: "detach" });
  } else {
    mainWindow.loadFile(path.join(__dirname, "../dist/index.html"));
  }

  // Open external links in default browser
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
    return { action: "deny" };
  });

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
}

// IPC Handlers for native features
ipcMain.handle(
  "dialog:saveFile",
  async (_event, { defaultPath, data, filters }) => {
    if (!mainWindow) return { canceled: true };
    const { canceled, filePath } = await dialog.showSaveDialog(mainWindow, {
      defaultPath,
      filters: filters || [{ name: "CSV File", extensions: ["csv"] }],
    });

    if (canceled || !filePath) {
      return { canceled: true };
    }

    fs.writeFileSync(filePath, data, "utf-8");
    return { canceled: false, filePath };
  },
);

ipcMain.handle("dialog:selectFolder", async () => {
  if (!mainWindow) return { canceled: true };
  const { canceled, filePaths } = await dialog.showOpenDialog(mainWindow, {
    properties: ["openDirectory"],
    title: "Chọn Thư Mục Chứa Video Shorts",
  });

  if (canceled || filePaths.length === 0) {
    return { canceled: true };
  }

  const folderPath = filePaths[0];
  const videoExtensions = [".mp4", ".mov", ".mkv", ".webm", ".avi"];
  const files: Array<{
    name: string;
    path: string;
    size: number;
    lastModified: number;
  }> = [];

  try {
    const dirEntries = fs.readdirSync(folderPath, { withFileTypes: true });
    for (const entry of dirEntries) {
      if (entry.isFile()) {
        const ext = path.extname(entry.name).toLowerCase();
        if (videoExtensions.includes(ext)) {
          const fullPath = path.join(folderPath, entry.name);
          const stats = fs.statSync(fullPath);
          files.push({
            name: entry.name,
            path: fullPath,
            size: stats.size,
            lastModified: stats.mtimeMs,
          });
        }
      }
    }
  } catch (err) {
    console.error("Failed to read directory:", err);
  }

  return { canceled: false, folderPath, files };
});

ipcMain.handle("dialog:selectVideoFiles", async () => {
  if (!mainWindow) return { canceled: true };
  const { canceled, filePaths } = await dialog.showOpenDialog(mainWindow, {
    properties: ["openFile", "multiSelections"],
    filters: [
      { name: "Video Files", extensions: ["mp4", "mov", "mkv", "webm", "avi"] },
    ],
    title: "Chọn Các File Video Shorts",
  });

  if (canceled || filePaths.length === 0) {
    return { canceled: true };
  }

  const files = filePaths.map((fullPath) => {
    const stats = fs.statSync(fullPath);
    return {
      name: path.basename(fullPath),
      path: fullPath,
      size: stats.size,
      lastModified: stats.mtimeMs,
    };
  });

  return { canceled: false, files };
});

ipcMain.handle("openExternal", async (_event, url) => {
  if (url && (url.startsWith("http://") || url.startsWith("https://"))) {
    await shell.openExternal(url);
    return true;
  }
  return false;
});

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
