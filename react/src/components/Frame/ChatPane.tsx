import styled from "styled-components";
import { SideBar } from "./SideBar";
import { BORDER_COLOR, DARK_BORDER_COLOR } from "../../core/globals";
import { Chat } from "@blueprintjs/icons";
import { ChatInputField } from "../ChatInputField";

const Container = styled.div`
    flex: 1;
    display: flex;
    flex-direction: row;
`;

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
    botMessage: boolean;
}

const ChatMessage = styled.div<ChatMessageProps>`
    display: flex;
    flex-direction: column;
    flex: 1;
    width: 100%;
    margin-top: 8px;
    align-self: ${({botMessage}) =>  botMessage ? "flex-start" : "flex-end"};
`;

const ChatMessageAuthor = styled.div<ChatMessageProps>`
    font-weight: bold;
    margin-bottom: 4px;
    align-self: ${({botMessage}) =>  botMessage ? "flex-start" : "flex-end"};
`;

const ChatMessageText = styled.div<ChatMessageProps>`
    border: 1px solid white;
    border-radius: 8px;
    padding: 8px;
    background-color: ${({botMessage}) =>  botMessage ? "none" : "white"};
    color: ${({botMessage}) =>  botMessage ? "white" : "black"};

    align-self: ${({botMessage}) =>  botMessage ? "flex-start" : "flex-end"};

    width: 50%;
`;




const BotImage = styled.img`
    width: 256px;
    height: 256px;
    border: 1px solid white;
    display: inline;
    float: left;
    margin-right: 16px;
`


const MESSAGES = [{
        "message": "Hello, I am a bot. I am here to help you with your questions.",
        "botMessage": true
    }, {
        "message": "Hello, I am a person.",
        "botMessage": false
    }, {
        "message": "Hello, I am a bot. I am here to help you with your questions.",
        "botMessage": true
    }, {
        "message": "Hello, I am a person.",
        "botMessage": false
    }, {
        "message": "Hello, I am a bot. I am here to help you with your questions.",
        "botMessage": true
    }, {
        "message": "Hello, I am a person.",
        "botMessage": false
    }, {
        "message": "Hello, I am a bot. I am here to help you with your questions.",
        "botMessage": true
    }
]



export const ChatPane: React.FC<{}> = () => {
    return <Container>
        <SideBar/>
        <ChatContainer>
            <div>
                <BotImage src="https://i.imgur.com/7vZ9Z5u.png"/>
                <h1>Name: Bot Name Here</h1>
                <span>Description of the bot, the narrative, menu stuff, etc.Description of the bot, the narrative, menu stuff, etc.Description of the bot, the narrative, menu stuff, etc.Description of the bot, the narrative, menu stuff, etc.Description of the bot, the narrative, menu stuff, etc.Description of the bot, the narrative, menu stuff, etc.Description of the bot, the narrative, menu stuff, etc.Description of the bot, the narrative, menu stuff, etc.Description of the bot, the narrative, menu stuff, etc.Description of the bot, the narrative, menu stuff, etc.Description of the bot, the narrative, menu stuff, etc.Description of the bot, the narrative, menu stuff, etc.Description of the bot, the narrative, menu stuff, etc.Description of the bot, the narrative, menu stuff, etc.Description of the bot, the narrative, menu stuff, etc.Description of the bot, the narrative, menu stuff, etc.Description of the bot, the narrative, menu stuff, etc.Description of the bot, the narrative, menu stuff, etc.Description of the bot, the narrative, menu stuff, etc.Description of the bot, the narrative, menu stuff, etc.Description of the bot, the narrative, menu stuff, etc.Description of the bot, the narrative, menu stuff, etc.Description of the bot, the narrative, menu stuff, etc.Description of the bot, the narrative, menu stuff, etc.Description of the bot, the narrative, menu stuff, etc.Description of the bot, the narrative, menu stuff, etc.Description of the bot, the narrative, menu stuff, etc.Description of the bot, the narrative, menu stuff, etc.Description of the bot, the narrative, menu stuff, etc.Description of the bot, the narrative, menu stuff, etc.Description of the bot, the narrative, menu stuff, etc.Description of the bot, the narrative, menu stuff, etc.Description of the bot, the narrative, menu stuff, etc.Description of the bot, the narrative, menu stuff, etc.Description of the bot, the narrative, menu stuff, etc.Description of the bot, the narrative, menu stuff, etc. </span>
            </div>
            <MessageBoxContainer>            
                <ToolbarContainer>
                    thin toolbar here
                </ToolbarContainer>
                <MessageBox>
                    {
                        MESSAGES.map((message) => {
                            return <ChatMessage {...message}>
                                <ChatMessageAuthor {...message}>
                                    {message.botMessage ? "Bot" : "Person"}
                                </ChatMessageAuthor>
                                <ChatMessageText {...message}>
                                    {message.message}
                                </ChatMessageText>
                            </ChatMessage>
                        })
                    }
                </MessageBox>

                <ChatInputField/>
            </MessageBoxContainer>
        </ChatContainer>
    </Container>;
}