import styled from "styled-components";
import * as React from "react";

import { H5, MenuItem, Switch } from "@blueprintjs/core";
import { Example, ExampleProps } from "@blueprintjs/docs-theme";
import { ItemRenderer, Suggest } from "@blueprintjs/select";
import { BORDER_COLOR } from "../../core/globals";


module Selection {

    interface Film {
        title: string
    }

    const listOfFilms: Film[] = [];


    export interface ChatListSuggestionState {
        allowCreate: boolean;
        closeOnSelect: boolean;
        createdItems: Film[];
        disabled: boolean;
        fill: boolean;
        items: Film[];
        matchTargetWidth: boolean;
        minimal: boolean;
        openOnKeyDown: boolean;
        resetOnClose: boolean;
        resetOnQuery: boolean;
        resetOnSelect: boolean;
        selectedFilm: Film;
    }

    export class ChatListHistorySearch extends React.PureComponent<ExampleProps, ChatListSuggestionState> {
        public state: ChatListSuggestionState = {
            allowCreate: false,
            closeOnSelect: true,
            createdItems: [],
            disabled: false,
            fill: false,
            items: [...listOfFilms],
            matchTargetWidth: false,
            minimal: true,
            openOnKeyDown: false,
            resetOnClose: false,
            resetOnQuery: true,
            resetOnSelect: false,
            selectedFilm: listOfFilms[0],
        };


        public render() {
            const { allowCreate, selectedFilm, matchTargetWidth, minimal, ...flags } = this.state;

            // const maybeCreateNewItemFromQuery = allowCreate ? createFilm : undefined;
            // const maybeCreateNewItemRenderer = allowCreate ? renderCreateFilmMenuItem : null;
            const maybeCreateNewItemFromQuery = undefined;
            const maybeCreateNewItemRenderer = null;

            return (
                <Suggest<Film>
                        {...flags}
                        createNewItemFromQuery={maybeCreateNewItemFromQuery}
                        createNewItemRenderer={maybeCreateNewItemRenderer as any}
                        inputValueRenderer={this.renderInputValue}
                        items={this.state.items}
                        itemsEqual={(a, b) => {
                            return a === b;
                        }}
                        itemPredicate={(query, item, index, exact) => {
                            return true;
                        }}
                        itemRenderer={this.renderFilmItem}
                        noResults={<MenuItem disabled={true} text="No results." roleStructure="listoption" />}
                        onItemSelect={this.handleValueChange}
                        popoverProps={{ matchTargetWidth, minimal }}
                    />
            );
        }


        private renderFilmItem: ItemRenderer<Film> = (film: any, props: any) => {
            if (!props.modifiers.matchesPredicate) {
                return null;
            }
            return (
                <MenuItem
                    {...{
                        active: props.modifiers.active,
                        disabled: props.modifiers.disabled,
                        key: film.rank,
                        onClick: props.handleClick,
                        text: `${film.rank}. ${film.title}`,
                    }}
                    roleStructure="listoption"
                    selected={film === this.state.selectedFilm}
                />
            );
        };

        private renderInputValue = (film: Film) => film.title;

        private handleValueChange = (selectedFilm: Film) => {
            // // delete the old film from the list if it was newly created
            // const { createdItems, items } = maybeDeleteCreatedFilmFromArrays(
            //     this.state.items,
            //     this.state.createdItems,
            //     this.state.selectedFilm,
            // );
            // // add the new film to the list if it is newly created
            // const { createdItems: nextCreatedItems, items: nextItems } = maybeAddCreatedFilmToArrays(
            //     items,
            //     createdItems,
            //     selectedFilm,
            // );
            // this.setState({ createdItems: nextCreatedItems, selectedFilm, items: nextItems });
        };

        private handleSwitchChange(prop: keyof ChatListSuggestionState) {
            return (event: React.FormEvent<HTMLInputElement>) => {
                const checked = event.currentTarget.checked;
                this.setState(state => ({ ...state, [prop]: checked }));
            };
        }
    }
}


const SideBarContainer = styled.div`
    box-sizing: border-box;
    border-right: 1px solid ${BORDER_COLOR};

    flex: 0 0 200px;

    display: flex;
    flex-direction: column;
`;

const SideBarHeading = styled.div`
    padding: 10px;
    background-color: rgba(255,255,255,0.1);
    border-bottom: 1px solid ${BORDER_COLOR};
    flex: 0 0 50px;

`;

const ListOfChats = styled.div`
    padding: 8px;
`;

const ChatItem = styled.div`
    color: grey;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const ChatItemLabelText = styled.div`
    flex: 1;
    padding: 0 8px;
    text-align: left;
    font-size: 14px;

    &:hover {
        color: white;
    }
`;


const chats = {
    "chat1": {
        "name": "Chat 1"
    },
    "chat2": {
        "name": "Chat 2"
    },
    "chat3": {
        "name": "Chat 3"
    },
    "chat4": {
        "name": "Chat 4"
    },
    "chat5": {
        "name": "Chat 5"
    },
}

export const SideBar: React.FC<{}> = ({
}) => {
    return <SideBarContainer>
        <SideBarHeading>
            <Selection.ChatListHistorySearch id="test"></Selection.ChatListHistorySearch>
        </SideBarHeading>
        <ListOfChats>
        {Object.keys(chats).map((chatId) => {
            return <ChatItem>
                <img src="" height="32px" width="32px" />
                <ChatItemLabelText>
                    {chats[chatId as keyof typeof chats].name}
                </ChatItemLabelText>
                <button>x</button>
            </ChatItem>
        })}
        </ListOfChats>
    </SideBarContainer>;
};