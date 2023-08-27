import { app, ipcMain, ipcRenderer } from "electron";
import * as path from "path";
import * as fs from "fs";
import * as fsp from "fs/promises";
import { Chat, Chats } from "./conversations";
import { ipcBroadcast } from "./ipc/ipc";

export let dataFolderPath: string = "";
export let chatsFolderPath: string = "";

let _settings: {
    username: string
} | null = {
    username: "user"
};

export const settings = new Proxy(_settings, {
    get(target, name) {
        if(_settings !== null) {
            if(name in _settings) {
                return _settings[name as keyof typeof _settings]
            }
            return undefined;
        } else {
            throw new Error("Settings not loaded");
        }
    }
})



export async function InitDataFolder() {
    try {
        dataFolderPath = path.join(app.getPath("home"), "/.chatbench/");
        if(!fs.existsSync(dataFolderPath)) {
            fs.mkdirSync(dataFolderPath);
        }

        chatsFolderPath = path.join(dataFolderPath, "chats");
        if(!fs.existsSync(chatsFolderPath)) {
            fs.mkdirSync(chatsFolderPath);
        }

        if(!fs.existsSync(path.join(dataFolderPath, "settings.json"))) {
            // Since settings hasn't loaded, the above initalization works as a default settings file content
            fs.writeFileSync(path.join(dataFolderPath, "settings.json"), JSON.stringify(_settings, null, 4));
        }


    } catch(e) {
        console.error(e);
        throw e;
    }
}


export async function readChatSettings(chatId: string): Promise<Chat | null> {
    try {
        const str = await fsp.readFile(path.join(chatsFolderPath, chatId, "_settings.json"), { encoding: "utf-8" });
        return JSON.parse(str) as Chat;
    } catch (e) {
        console.error(e);
        return null;
    }
}

export async function addChat(conversationName: string) {
    await fsp.mkdir(path.join(chatsFolderPath, conversationName));
    await fsp.writeFile(path.join(chatsFolderPath, conversationName, "_settings.json"), JSON.stringify({
        id: conversationName,
        name: conversationName
    }, null, 4));

    const chat = await readChatSettings(conversationName);
    if(chat) {
        Chats.set(chat.id, chat);
    }

    //ipcBroadcast("chat-list-update", JSON.stringify(Array.from(Chats.values())));
    updateChats();
}


export async function updateChats() {
    const chatDir = await fsp.readdir(chatsFolderPath);
    const chats = chatDir.map(chat => readChatSettings(chat));

    (await Promise.allSettled(chats)).forEach((chat) => {
        if(chat.status === "fulfilled") {
            if(chat.value !== null) {
                Chats.set(chat.value.id, chat.value);
            }
        }
    });
    
    ipcBroadcast("chat-list-update", JSON.stringify(Array.from(Chats.values())));
}