import * as path from "path";
import * as fs from "fs";
import * as fsp from "fs/promises";
import { app, BrowserWindow, dialog, ipcMain } from "electron";


export type Chat = {
    id: string,
    name: string
}

export const Chats: Map<string, Chat> = new Map<string, Chat>();



export type Message = {
    id: string,
    content: string,
    bot: boolean,
    timestamp: number,
}

export type FullChatContext = {
    chat: Chat,
    messages: Message[]
}

export async function createDirs(): Promise<void> {
    const dirPath = path.join(app.getPath("home"), ".chatbench");
    if(!fs.existsSync(dirPath)) {
        await fsp.mkdir(dirPath);
    }
    const conversationsDirPath = path.join(app.getPath("home"), ".chatbench/conversations");
    if(!fs.existsSync(conversationsDirPath)) {
        await fsp.mkdir(conversationsDirPath);
    }
}

export function getFullContext(conversationId: string): FullChatContext {
    const filePath = path.join(app.getPath("home"), `.chatbench/conversations/${conversationId}.json`);

    if(!Chats.has(conversationId)) {
        throw new Error("Conversation does not exist");
    }

    if(!fs.existsSync(filePath)) {
        return {
            chat: Chats.get(conversationId)!,
            messages: []
        }
    } else {
        const messages: Message[] = JSON.parse(fs.readFileSync(filePath, { encoding: "utf-8" }));
        return {
            chat: Chats.get(conversationId)!,
            messages
        }
    }
}