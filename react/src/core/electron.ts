import { Chat, Message } from "../../../src/conversations";
export const electronAPI = window.electronAPI;
export const e = electronAPI;

// IS A DIRECT SHIM OF ../../../src/renderer-preload.ts CONTEXTBRIDGE

declare global {
    interface Window { 
        electronAPI: {
            minimize: () => void;
            addChat: (chatName: string) => Promise<void>;
            getChats: () => Promise<Chat[]>;
            getMessages: (chatId: string) => Promise<Message[]>;
        }
        ipcRenderer: {
            send: (channel: string, data: any) => void;
            on: (channel: string, callback: (event: any, ...args: any[]) => void) => void;
        }
    }
}

export const ipcRenderer = window.ipcRenderer;