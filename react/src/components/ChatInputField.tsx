import styled from "styled-components";
import { Button, Menu, MenuItem, Popover, Text, TextArea } from "@blueprintjs/core";
import { Example, ExampleProps, handleStringChange } from "@blueprintjs/docs-theme";
import { BORDER_COLOR } from "../core/globals";
import React from "react";


const Container = styled.div`
    border-top: 5px solid ${BORDER_COLOR};
    padding: 8px;

    display: flex;
    flex-direction: row;
`;




export const ChatInputField: React.FC<{}> = () => {

    const [textContent, setTextContent] = React.useState("");

    return <Container>
        <TextArea fill={true} onChange={(e) => {
            setTextContent(e.target.value);
        }} value={textContent} />
        <button
            type="button"
            className="pt-button pt-icon-add .modifier"
        >Send</button>
    </Container>
};