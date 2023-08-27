import { electronAPI, ipcRenderer } from "./electron";
import { STATE, setSTATE } from "./globals";



// Called once upon page load.
export async function onLoad() {
    console.log("Loading");

    electronAPI.getChats();

    ipcRenderer.on("chat-list-update", (event, chats) => {
        console.log("chats", chats);
        setSTATE({
            ...STATE,
            chats: JSON.parse(chats),
            chatLength: Object.keys(chats).length
        });
    });
}