const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
    minimize: () => ipcRenderer.invoke("minimize"),
    addChat: (chatName: string) => ipcRenderer.invoke("addChat", chatName),
    getChats: () => ipcRenderer.invoke("getChats"),
    getMessages: (chatId: string) => ipcRenderer.invoke("getMessages", chatId),
})


contextBridge.exposeInMainWorld('ipcRenderer', {
    send: ((channel, data) => ipcRenderer.send(channel, data)) as typeof ipcRenderer.send,
    on: ((channel, callback) => {
        ipcRenderer.on(channel, (event, ...args) => callback(event,...args));
    }) as typeof ipcRenderer.on
});
console.log("Preload loaded");