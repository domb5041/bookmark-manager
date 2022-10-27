import { observer } from "mobx-react";
import React, { useRef } from "react";
import styled from "styled-components";
import { useStores } from "../store";
import PreviewImg from "./bookmarks/PreviewImg";
import Tag from "./bookmarks/Tag";
import ToolbarButton from "./common/buttons/ToolButton";
import Button from "./common/buttons/Button";
import Url from "./common/Url";
import { CSSTransition } from "react-transition-group";
import moment from "moment";
import ScrollContainer from "./common/ScrollContainer";

const Container = styled.div`
    width: 300px;
    flex-shrink: 0;
    background-color: ${(props) => props.theme.color.background.surface};
    border-left: 1px solid ${(props) => props.theme.color.border.light};
    box-sizing: border-box;
    display: flex;
    align-items: stretch;
    &.preview-container-enter {
        width: 0;
    }
    &.preview-container-enter-active {
        width: 300px;
        transition: 0.5s;
    }
    &.preview-container-exit {
        width: 300px;
    }
    &.preview-container-exit-active {
        width: 0;
        transition: 0.5s;
    }
`;

const Container2 = styled.div`
    width: 300px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
`;

const EditDelete = styled.div`
    display: flex;
    justify-content: flex-end;
    padding: 10px 15px;
`;

const PreviewContent = styled(ScrollContainer)`
    padding: 5px 10px;
`;

const Date = styled.div`
    font-size: 13px;
    margin-bottom: 4px;
    display: flex;
    & > label {
        flex: 1;
    }
`;

const OpenLink = styled.div`
    padding: 10px;
`;

const Heading = styled.label`
    display: block;
    margin-bottom: 3px;
`;

const Divider = styled.hr`
    border-style: solid;
    border-top-width: 0;
    border-color: ${(props) => props.theme.color.border.light};
    margin: 10px 0;
`;

const PreviewPane = () => {
    const { bookmarkStore } = useStores();
    const nodeRef = useRef(null);

    const formatDate = (timestamp: number | undefined) => {
        if (!timestamp) return "Never";
        return moment.unix(timestamp).format("ddd, D MMM YYYY, H:mm");
    };

    return (
        <CSSTransition
            nodeRef={nodeRef}
            in={bookmarkStore.bookmarkPreviewVisible}
            unmountOnExit
            timeout={500}
            classNames="preview-container"
        >
            <Container ref={nodeRef}>
                {bookmarkStore.activeBookmark && (
                    <Container2>
                        <EditDelete>
                            <ToolbarButton
                                symbol="edit"
                                text="Edit"
                                onClick={bookmarkStore.showEditBookmarkDialog}
                                disabled={!bookmarkStore.activeBookmark}
                                id="edit-bookmark-button"
                                style={{ marginRight: 20 }}
                            />
                            <ToolbarButton
                                symbol="delete"
                                text="delete"
                                onClick={bookmarkStore.showDeleteBookmarkDialog}
                                disabled={!bookmarkStore.activeBookmark}
                                id="add-bookmark-button"
                            />
                        </EditDelete>
                        <PreviewContent>
                            <PreviewImg
                                imgUrl={bookmarkStore.activeBookmark.image}
                                border
                                style={{ marginBottom: 7 }}
                            />
                            <b>{bookmarkStore.activeBookmark.name}</b>
                            <Divider />
                            <Heading>Description</Heading>
                            <p style={{ margin: 0, fontSize: 14 }}>{bookmarkStore.activeBookmark.description}</p>
                            <Divider />
                            <Heading>Url</Heading>
                            <Url url={bookmarkStore.activeBookmark.url} />
                            <Divider />
                            <Heading>Tags</Heading>
                            {bookmarkStore.activeBookmark.tags.length > 0 &&
                                bookmarkStore.activeBookmark.tags.map((tag, i) => (
                                    <Tag key={`${i}-${tag}`} name={tag} style={{ marginBottom: 5 }} />
                                ))}
                            <Divider />
                            <Heading>Timestamps</Heading>
                            <Date>Created: {formatDate(bookmarkStore.activeBookmark.dateAdded)}</Date>
                            <Date>Modified: {formatDate(bookmarkStore.activeBookmark.dateModified)}</Date>
                            <Date>Last Opened: {formatDate(bookmarkStore.activeBookmark.dateOpened)}</Date>
                        </PreviewContent>
                        <OpenLink>
                            <Button
                                symbol="arrow_forward"
                                text="Open Link"
                                onClick={bookmarkStore.openActiveBookmark}
                                disabled={!bookmarkStore.activeBookmark}
                                id="open-bookmark-button"
                                style={{ width: "100%" }}
                                styleType="primary"
                            />
                        </OpenLink>
                    </Container2>
                )}
            </Container>
        </CSSTransition>
    );
};

export default observer(PreviewPane);
