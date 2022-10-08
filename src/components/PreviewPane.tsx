import { observer } from "mobx-react";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useStores } from "../store";
import PreviewImg from "./bookmarks/PreviewImg";
import Tag from "./bookmarks/Tag";
import Button from "./Button";
import Url from "./Url";
import { CSSTransition } from "react-transition-group";

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

const PreviewPane = () => {
    const { bookmarkStore } = useStores();
    const [newName, setNewName] = useState("");
    const [newDescription, setNewDescription] = useState("");
    const [newImg, setNewImg] = useState("");
    const [newUrl, setNewUrl] = useState("");
    const [newTags, setNewTags] = useState<string[]>([]);

    useEffect(() => {
        const onDialogOpening = () => {
            if (bookmarkStore.activeBookmarkIndex > -1) {
                const activeBookmark = bookmarkStore.bookmarks[bookmarkStore.activeBookmarkIndex];
                setNewName(activeBookmark.name || "");
                setNewDescription(activeBookmark.description || "");
                setNewImg(activeBookmark.image || "");
                setNewUrl(activeBookmark.url || "");
                setNewTags(activeBookmark.tags || []);
            } else {
                setNewName("");
                setNewDescription("");
                setNewImg("");
                setNewUrl("");
                setNewTags([]);
            }
        };
        onDialogOpening();
    }, [bookmarkStore.activeBookmarkIndex, bookmarkStore.bookmarks]);

    const nodeRef = useRef(null);

    return (
        <CSSTransition
            nodeRef={nodeRef}
            in={bookmarkStore.bookmarkPreviewVisible}
            unmountOnExit
            timeout={500}
            classNames="preview-container"
        >
            <Container ref={nodeRef}>
                <div>
                    <EditDelete>
                        <Button
                            symbol="edit"
                            text="Edit"
                            onClick={bookmarkStore.showEditBookmarkDialog}
                            disabled={bookmarkStore.activeBookmark === ""}
                            id="edit-bookmark-button"
                        />
                        <Button
                            symbol="delete"
                            text="delete"
                            onClick={bookmarkStore.showDeleteBookmarkDialog}
                            disabled={bookmarkStore.activeBookmark === ""}
                            id="add-bookmark-button"
                        />
                    </EditDelete>
                    <PreviewImg imgUrl={newImg} style={{ marginBottom: 10 }} />
                    <b>{newName}</b>
                    <p>{newDescription}</p>
                    <Url url={newUrl} />
                    {newTags.length > 0 && newTags.map((tag, i) => <Tag key={`${i}-${tag}`} name={tag} />)}
                </div>
            </Container>
        </CSSTransition>
    );
};

export default observer(PreviewPane);
