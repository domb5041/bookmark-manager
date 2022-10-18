import { observer } from "mobx-react";
import React, { useRef } from "react";
import styled from "styled-components";
import { useStores } from "../store";
import PreviewImg from "./bookmarks/PreviewImg";
import Tag from "./bookmarks/Tag";
import Button from "./common/Button";
import Url from "./common/Url";
import { CSSTransition } from "react-transition-group";
import moment from "moment";

const Container = styled.div`
    width: 300px;
    flex-shrink: 0;
    border-left: 1px solid ${(props) => props.theme.color.background.border};
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
    justify-content: space-between;
    padding: 10px;
`;

const PreviewContent = styled.div`
    flex: 1;
    padding: 0 10px;
    overflow-y: auto;
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

const Heading = styled.div`
    font-size: 14px;
    font-weight: bold;
    margin-bottom: 3px;
`;

const Divider = styled.hr`
    border-style: solid;
    border-top-width: 0;
    border-color: ${(props) => props.theme.color.background.object};
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
                            <Button
                                symbol="edit_note"
                                text="Edit"
                                onClick={bookmarkStore.showEditBookmarkDialog}
                                disabled={!bookmarkStore.activeBookmark}
                                id="edit-bookmark-button"
                            />
                            <Button
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
                            <Date>
                                <label>Created:</label> {formatDate(bookmarkStore.activeBookmark.dateAdded)}
                            </Date>
                            <Date>
                                <label>Modified:</label> {formatDate(bookmarkStore.activeBookmark.dateModified)}
                            </Date>
                            <Date>
                                <label>Last Opened:</label> {formatDate(bookmarkStore.activeBookmark.dateOpened)}
                            </Date>
                        </PreviewContent>
                        <OpenLink>
                            <Button
                                symbol="arrow_forward"
                                text="Open Link"
                                onClick={bookmarkStore.openActiveBookmark}
                                disabled={!bookmarkStore.activeBookmark}
                                id="open-bookmark-button"
                                style={{ width: "100%" }}
                            />
                        </OpenLink>
                    </Container2>
                )}
            </Container>
        </CSSTransition>
    );
};

export default observer(PreviewPane);
