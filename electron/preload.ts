import { contextBridge, ipcRenderer } from "electron";

export interface ScannedVideoFile {
  name: string;
  path: string;
  size: number;
  lastModified: number;
}

export interface ElectronAPI {
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
}

const electronAPI: ElectronAPI = {
  saveFile: (options) => ipcRenderer.invoke("dialog:saveFile", options),
  selectFolder: () => ipcRenderer.invoke("dialog:selectFolder"),
  selectVideoFiles: () => ipcRenderer.invoke("dialog:selectVideoFiles"),
  openExternal: (url) => ipcRenderer.invoke("openExternal", url),
  isElectron: true,
};

contextBridge.exposeInMainWorld("electronAPI", electronAPI);
