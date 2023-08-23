export interface Conversation {
    id: string,
    name: string,
    narrative: string,
}

export type ConversationMap = {[k in Conversation['id']]: Conversation};

export interface Message {
    id: string,
    content: string,
    timestamp: number,
    bot: boolean,
}

export type FullConversationContext = Conversation & {
    messages: Message[]
};