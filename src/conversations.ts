import * as path from "path";
import * as fs from "fs";
import * as fsp from "fs/promises";
import { app, BrowserWindow, dialog, ipcMain } from "electron";


export type Conversation = {
    id: string,
    name: string
}

export const Conversations: Map<string, Conversation> = new Map<string, Conversation>();

export type ConversationFile = {
    conversations: {[key: string]: Conversation}
}

const DEFAULT_CONVERSATIONS_FILE: ConversationFile = {
    conversations: {}
}


export async function readConversationsFromFile(): Promise<ConversationFile> {
    const filePath = path.join(app.getPath("home"), ".chatbench/conversations.json");

    if(!fs.existsSync(filePath)) {
        await fsp.writeFile(filePath, JSON.stringify(DEFAULT_CONVERSATIONS_FILE));
        return DEFAULT_CONVERSATIONS_FILE;
    } else {
        return await JSON.parse(await fsp.readFile(filePath, { encoding: "utf-8" }));
    }
}

export async function writeConversationsToFile(): Promise<void> {
    const filePath = path.join(app.getPath("home"), ".chatbench/conversations.json");

    const obj: any = {};
    for(const [key, value] of Conversations.entries()) {
        obj[key] = value;
    }

    await fsp.writeFile(filePath, JSON.stringify(obj));
}





export type Message = {
    id: string,
    content: string,
    author: string,
    timestamp: number,
}

export type ConversationFullContext = {
    conversation: Conversation,
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

export function getFullContext(conversationId: string): ConversationFullContext {
    const filePath = path.join(app.getPath("home"), `.chatbench/conversations/${conversationId}.json`);

    if(!Conversations.has(conversationId)) {
        throw new Error("Conversation does not exist");
    }

    if(!fs.existsSync(filePath)) {
        return {
            conversation: Conversations.get(conversationId)!,
            messages: []
        }
    } else {
        const messages: Message[] = JSON.parse(fs.readFileSync(filePath, { encoding: "utf-8" }));
        return {
            conversation: Conversations.get(conversationId)!,
            messages
        }
    }
}