import * as fs from "fs";
import * as path from "path";
import * as electron from "electron";
import { app, BrowserWindow, dialog, ipcMain } from "electron";
import { InitIPCForWindow } from "./ipc/ipc";
import { InitDataFolder } from "./data-folder";



electron.app.setLoginItemSettings({
    openAtLogin: true    
})

async function createWindow () {


    const win = new BrowserWindow({
        width: 1200,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            preload: path.join(__dirname, '../dist/renderer-preload.js'),
            devTools: true,
        },
        frame: false,
    });

    win.webContents.openDevTools();
    win.loadFile('../preload.html')
    win.webContents.once('did-finish-load', (event: electron.Event) => {
        win.loadURL("http://localhost:3000");
    })


    await InitIPCForWindow(win);

}

app.whenReady().then(async () => {
    
    Promise.all([
        InitDataFolder()
    ]).then(async () => {

        await createWindow()
        app.on('activate', async () => {
            if (BrowserWindow.getAllWindows().length === 0) {
                await createWindow()
            }
        })

    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})


