const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
    minimize: () => ipcRenderer.invoke("minimize"),
    getChats: () => ipcRenderer.invoke("getChats"),
    getMessages: (chatId: string) => ipcRenderer.invoke("getMessages", chatId),
})


console.log("Preload loaded");