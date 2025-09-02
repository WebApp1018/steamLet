const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const fs = require("fs");
const { shell } = require("electron");

let mainWindow;

function getSteamGames() {
    const steamPath = "E:/Steam/steamapps";
    const manifests = fs.readdirSync(steamPath).filter(f => f.startsWith("appmanifest"));

    const games = manifests.map(file => {
        const content = fs.readFileSync(path.join(steamPath, file), "utf-8");
        const nameMatch = content.match(/"name"\s+"(.+?)"/);
        const idMatch = content.match(/"appid"\s+"(\d+)"/);

        return {
            appid: idMatch ? idMatch[1] : null,
            name: nameMatch ? nameMatch[1] : "Unknown",
        };
    });

    return games;
}

// Expose games to renderer
ipcMain.handle("get-games", () => getSteamGames());

ipcMain.handle("launch-game", (event, appid) => {
    const steamExe = "E:\\Steam\\Steam.exe";
    const { execFile } = require("child_process");

    execFile(steamExe, ["-applaunch", appid], (err) => {
        if (err) console.error("Failed to launch:", err);
        else console.log("Game launched:", appid);
    });
});


function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1200,
        height: 800,
        frame: true,
        webPreferences: {
            preload: path.join(__dirname, "preload.js"), // preload script
            contextIsolation: true,                      // important for contextBridge
            nodeIntegration: false,                      // keep false for security
        },
    });

    const startURL = app.isPackaged
        ? `file://${path.join(__dirname, "../build/index.html")}`
        : "http://localhost:3000";

    mainWindow.loadURL(startURL);

    mainWindow.on("closed", () => (mainWindow = null));
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") app.quit();
});

app.on("activate", () => {
    if (mainWindow === null) createWindow();
});
