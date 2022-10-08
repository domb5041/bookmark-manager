import { observer } from "mobx-react";
import React, { useRef } from "react";
import styled from "styled-components";
import { useStores } from "../store";
import PreviewImg from "./bookmarks/PreviewImg";
import Tag from "./bookmarks/Tag";
import Button from "./Button";
import Url from "./Url";
import { CSSTransition } from "react-transition-group";
import moment from "moment";

const Container = styled.div`
    width: 300px;
    flex-shrink: 0;
    border-left: 1px solid ${(props) => props.theme.color.background.border};
    box-sizing: border-box;
    position: relative;
    overflow-y: auto;
    & > div {
        padding: 10px;
        width: 300px;
        box-sizing: border-box;
    }
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

const EditDelete = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
`;

const Date = styled.div`
    font-size: 14px;
    margin: 5px;
`;

const PreviewPane = () => {
    const { bookmarkStore } = useStores();
    const nodeRef = useRef(null);

    const formatDate = (timestamp: number | undefined) => {
        if (!timestamp) return "-";
        return moment.unix(timestamp).format("dddd, D MMMM YYYY, H:mm");
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
                    <div>
                        <EditDelete>
                            <Button
                                symbol="edit"
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
                        <PreviewImg imgUrl={bookmarkStore.activeBookmark.image} style={{ marginBottom: 10 }} />
                        <b>{bookmarkStore.activeBookmark.name}</b>
                        <p>{bookmarkStore.activeBookmark.description}</p>
                        <Url url={bookmarkStore.activeBookmark.url} />
                        {bookmarkStore.activeBookmark.tags.length > 0 &&
                            bookmarkStore.activeBookmark.tags.map((tag, i) => <Tag key={`${i}-${tag}`} name={tag} />)}
                        <Date>
                            <b>Created:</b> {formatDate(bookmarkStore.activeBookmark.dateAdded)}
                        </Date>
                        <Date>
                            <b>Modified:</b> {formatDate(bookmarkStore.activeBookmark.dateModified)}
                        </Date>
                        <Date>
                            <b>Last Opened:</b> {formatDate(bookmarkStore.activeBookmark.dateOpened)}
                        </Date>
                    </div>
                )}
            </Container>
        </CSSTransition>
    );
};

export default observer(PreviewPane);
