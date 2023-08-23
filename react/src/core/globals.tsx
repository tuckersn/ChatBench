import { createContext, useContext, useEffect, useState } from "react";
import { Conversation, ConversationMap, FullConversationContext } from "../../../src/schema";

export const BORDER_COLOR = "#8c8c8c";
export const DARK_BORDER_COLOR = "#4c4c4c";


declare global {
	interface Window {
		updateGlobalStateContext: () => void;
		STATE: any;
	}
}

export let STATE: {
	conversations: ConversationMap,
	activeConversation: FullConversationContext | null,
} = {
	conversations: {},
	activeConversation: null,
}

window.STATE = STATE;

export function addNewConversation() {
	const newConversation: Conversation = {
		id: Math.random().toString(36).substring(7),
		name: "New Conversation",
		narrative: "This is a new conversation",
	}

	STATE.conversations[newConversation.id] = newConversation;
	STATE.activeConversation = {
		...newConversation,
		messages: [
			{
				id: Math.random().toString(36).substring(7),
				content: "Hello, how are you?",
				timestamp: (new Date()).getTime(),
				bot: true
			},
			{
				id: Math.random().toString(36).substring(7),
				content: "Hello, how are you?",
				timestamp: (new Date()).getTime(),
				bot: true
			},
			{
				id: Math.random().toString(36).substring(7),
				content: "Hello, how are you?",
				timestamp: (new Date()).getTime(),
				bot: false
			},
			{
				id: Math.random().toString(36).substring(7),
				content: "Hello, how are you?",
				timestamp: (new Date()).getTime(),
				bot: true
			},
			{
				id: Math.random().toString(36).substring(7),
				content: "Hello, how are you?",
				timestamp: (new Date()).getTime(),
				bot: false
			},
			{
				id: Math.random().toString(36).substring(7),
				content: "Hello, how are you?",
				timestamp: (new Date()).getTime(),
				bot: true
			},
			{
				id: Math.random().toString(36).substring(7),
				content: "Hello, how are you?",
				timestamp: (new Date()).getTime(),
				bot: false
			},
			{
				id: Math.random().toString(36).substring(7),
				content: "Hello, how are you?",
				timestamp: (new Date()).getTime(),
				bot: true
			},
			{
				id: Math.random().toString(36).substring(7),
				content: "Hello, how are you?",
				timestamp: (new Date()).getTime(),
				bot: false
			},
			{
				id: Math.random().toString(36).substring(7),
				content: "Hello, how are you?",
				timestamp: (new Date()).getTime(),
				bot: false
			}
		]
	};

	return newConversation;
}


export function useGlobalState() {
	const [state, setState] = useState(STATE);

	useEffect(() => {
		console.log("useGlobalState: STATE.activeConversation", STATE.activeConversation);
		setState(STATE);
	}, [STATE.activeConversation, STATE.conversations.size]);

	return state;
}