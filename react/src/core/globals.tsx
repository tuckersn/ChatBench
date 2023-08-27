import { createContext, useContext, useEffect, useState } from "react";
import { Chat, FullChatContext } from "../../../src/conversations";

export const BORDER_COLOR = "#8c8c8c";
export const DARK_BORDER_COLOR = "#4c4c4c";


declare global {
	interface Window {
		updateGlobalStateContext: () => void;
		STATE: any;
	}
}

export let STATE: {
	chatLength: number,
	chats: {[chatId: string]: Chat},
	activeChat: FullChatContext | null,
} = {
	chatLength: 0,
	chats: {},
	activeChat: null,
}

export function setSTATE(newState: Partial<typeof STATE>) {
	STATE = {
		...STATE,
		...newState
	}
	//window.updateGlobalStateContext();
}

window.STATE = STATE;

export function addNewConversation() {
	const newConversation: Chat = {
		id: Math.random().toString(36).substring(7),
		name: "New Conversation"
	}

	window.electronAPI.addChat(newConversation.id);
	setTimeout(() => {
		window.electronAPI.getChats();
	}, 1000);
	

	return newConversation;
}


export function useGlobalState() {
	const [state, setState] = useState(STATE);
	const [_, forceUpdate] = useState(0);

	useEffect(() => {
		forceUpdate(n => n + 1);
	}, [STATE]);

	useEffect(() => {
		console.log("useGlobalState: STATE.activeConversation", STATE.activeChat);
		setState(STATE);
	}, [STATE.activeChat, STATE.chatLength]);

	return state;
}