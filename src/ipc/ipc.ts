import { BrowserWindow, ipcMain } from "electron"
import * as DataFolder from "../data-folder";
import { Chats } from "../conversations";
import { updateChats } from "../data-folder";

const windows = new Map<string, BrowserWindow>();

export function ipcBroadcast(channel: string, data: any) {
    windows.forEach((win, id) => {
        win.webContents.send(channel, data);
    });
}

export module Broadcast {
    export function chats() {
        ipcBroadcast("chat-list-update", JSON.stringify(Array.from(Chats.values())));
    }
}

export async function InitIPCForWindow(win: BrowserWindow) {

    windows.set(win.webContents.id.toString(), win);

    ipcMain.handle("minimize", ({
        frameId,
        processId,
        sender
    }) => {
        if (sender.id === win.webContents.id) {
            win.minimize();
        }
    });

    ipcMain.handle("addChat", async ({
        frameId,
        processId,
        sender
    }, chatName: string) => {
        await DataFolder.addChat(chatName);
    });

    ipcMain.handle("getChats", ({
        frameId,
        processId,
        sender
    }) => {
        updateChats();
    });

    ipcMain.handle("getMessages", ({
        frameId,
        processId,
        sender
    }, chatId: string) => {
        if(sender.id === win.webContents.id) {
            sender.send("getMessages", {

            });
        }
    });
}