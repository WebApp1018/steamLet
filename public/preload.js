const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electron", {
    // For invoking main process methods
    invoke: (channel, ...args) => ipcRenderer.invoke(channel, ...args),

    // For listening to events from main process
    on: (channel, callback) => {
        ipcRenderer.on(channel, (event, ...args) => callback(...args));
    }
});
