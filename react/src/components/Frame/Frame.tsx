import { Icon, IconSize } from "@blueprintjs/core";
import styled from "styled-components";
import { SideBar } from "./SideBar";
import { BrowserWindow } from "electron";


const FrameContainer = styled.div`
    
    height: 100%;


    background-color: #161e1d;
    color: white;
    
    display: flex;
    flex-direction: row;
`;



const ContentSectionContainer = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
`;


const TitleBar = styled.div`
    flex: 0 0 32px;
    background-color: rgba(255,255,255,0.1);
    border-bottom: 1px solid white;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0 10px;

    user-select: none;
    -webkit-user-select: none;
    -webkit-app-region: drag;

    width: 100%;

    .bp5-icon {
        user-select: all;
        -webkit-user-select: all;
        -webkit-app-region: no-drag;
    }

`;

const ContentContainer = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
`;

export const Frame: React.FC<{
    children?: React.ReactNode;
}> = ({
    children
}) => {
    return <FrameContainer>
        <SideBar/>
        <ContentSectionContainer>
            <TitleBar>

                <Icon icon="menu" iconSize={IconSize.STANDARD} style={{marginRight: 10}}/>
                <div style={{flex: 1}}>
                    Title
                </div>
                <Icon
                    icon="minus"
                    iconSize={IconSize.STANDARD}
                    style={{marginRight: 10}}
                    onClick={() => {
                        window.electronAPI.minimize();
                    }}
                />
                <Icon icon="maximize" iconSize={IconSize.STANDARD} style={{marginRight: 10}}/>
                <Icon
                    icon="cross"
                    iconSize={IconSize.STANDARD}
                    style={{marginRight: 10}}
                    onClick={() => {
                        window.close();  
                    }}
                />

            </TitleBar>
            <ContentContainer>
                Content
            </ContentContainer>
        </ContentSectionContainer>
    </FrameContainer>;
}
