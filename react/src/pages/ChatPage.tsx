import styled from "styled-components";
import { BORDER_COLOR, DARK_BORDER_COLOR, useGlobalState } from "../core/globals";
import { ChatInputField } from "../components/ChatInputField";
import { useState } from "react";

const ChatContainer = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 16px;
`;

const ToolbarContainer = styled.div`
    border-bottom: 3px solid ${BORDER_COLOR};
`;

const MessageBoxContainer = styled.div`
    margin-top: 16px;
    background-color: rgba(0,0,0,0.1);
    border: 5px solid ${DARK_BORDER_COLOR};
    vertical-align: top;

    height: 100%;

    display: flex;
    flex-direction: column;
`



const MessageBox = styled.div`
    flex: 1;
    padding: 8px;
    display: flex;
    flex-direction: column;
`;

export interface ChatMessageProps {
    bot: boolean;
}

const ChatMessage = styled.div<ChatMessageProps>`
    display: flex;
    flex-direction: column;
    flex: 1;
    width: 100%;
    margin-top: 8px;
    align-self: ${({bot}) =>  bot ? "flex-start" : "flex-end"};
`;

const ChatMessageAuthor = styled.div<ChatMessageProps>`
    font-weight: bold;
    margin-bottom: 4px;
    align-self: ${({bot}) =>  bot ? "flex-start" : "flex-end"};
`;

const ChatMessageText = styled.div<ChatMessageProps>`
    border: 1px solid white;
    border-radius: 8px;
    padding: 8px;
    background-color: ${({bot}) =>  bot ? "none" : "white"};
    color: ${({bot}) =>  bot ? "white" : "black"};

    align-self: ${({bot}) =>  bot ? "flex-start" : "flex-end"};

    width: ${({bot}) =>  bot ? "75%" : "50%"};
`;




const BotImage = styled.img`
    width: 128px;
    height: 128px;
    border: 1px solid white;
    display: inline;
    float: left;
    margin-right: 16px;
`

export const ChatPage: React.FC<{}> = () => {

    const state = useGlobalState();

    return <ChatContainer>
        <div>
            <BotImage src="https://i.imgur.com/7vZ9Z5u.png"/>
            <h1>Name: Bot Name Here</h1>
            <span>Description of the bot, the narrative, menu stuff, etc.Description of the bot, the narrative, menu stuff, etc.Description of the bot, the narrative.</span>
            <span>Description of the bot, the narrative, menu stuff, etc.Description of the bot, the narrative, menu stuff, etc.Description of the bot, the narrative.</span>
            <span>Description of the bot, the narrative, menu stuff, etc.Description of the bot, the narrative, menu stuff, etc.Description of the bot, the narrative.</span>
            <span>Description of the bot, the narrative, menu stuff, etc.Description of the bot, the narrative, menu stuff, etc.Description of the bot, the narrative.</span>
            <span>Description of the bot, the narrative, menu stuff, etc.Description of the bot, the narrative, menu stuff, etc.Description of the bot, the narrative.</span>
            <span>Description of the bot, the narrative, menu stuff, etc.Description of the bot, the narrative, menu stuff, etc.Description of the bot, the narrative.</span>
        </div>
        <MessageBoxContainer>         
            {/* <ToolbarContainer>
                thin toolbar here
            </ToolbarContainer> */}
            <MessageBox>
                {
                    state.activeConversation?.messages.map((message) => {
                        return <ChatMessage {...message}>
                            <ChatMessageAuthor {...message}>
                                {message.bot ? "Bot" : "Person"} - {new Date(message.timestamp).toLocaleTimeString()}
                            </ChatMessageAuthor>
                            <ChatMessageText {...message}>
                                {message.content}
                            </ChatMessageText>
                        </ChatMessage>
                    })
                }
            </MessageBox>

            <ChatInputField/>
        </MessageBoxContainer>
    </ChatContainer>
}