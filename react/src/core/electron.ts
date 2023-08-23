import * as ElectronModule from "electron";
import { Conversation, Message } from "chatbench/src/schema";

// IS A DIRECT SHIM OF ../../../src/renderer-preload.ts CONTEXTBRIDGE

declare global {
    interface Window { 
        electronAPI: {
            minimize: () => void;
            getChats: () => Promise<Conversation[]>;
            getMessages: (chatId: string) => Promise<Message[]>;
        }
    }
}