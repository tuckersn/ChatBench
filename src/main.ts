import * as fs from "fs";
import * as path from "path";
import * as electron from "electron";
import { app, BrowserWindow, dialog, ipcMain } from "electron";



electron.app.setLoginItemSettings({
    openAtLogin: true    
})

async function createWindow () {


    const win = new BrowserWindow({
        width: 1200,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            preload: path.join(__dirname, '../dist/window-renderer-preload.js'),
            devTools: true,
        }
    });

    win.webContents.openDevTools();
    win.loadFile('../preload.html')


}

app.whenReady().then(() => {
    createWindow()
    app.on('activate', async () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            await createWindow()
        }
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})