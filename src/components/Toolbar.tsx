import React from "react";
import styled from "styled-components";
import { useStores } from "../store";
import { observer } from "mobx-react";
import Button from "./Button";

const Container = styled.div`
    height: 50px;
    border-bottom: 1px solid silver;
    background-color: whitesmoke;
    display: flex;
    align-items: center;
    padding: 0 10px;
`;

const Toolbar = () => {
    const { bookmarkStore } = useStores();
    return (
        <Container id="toolbar">
            <Button
                symbol="tag"
                onClick={bookmarkStore.showEditTagsDialog}
                disabled={bookmarkStore.activeBookmark === ""}
                id="edit-tags-button"
            />
            <Button symbol="view_list" onClick={bookmarkStore.setExplorerTypeList} id="list-view-button" />
            <Button symbol="grid_view" onClick={bookmarkStore.setExplorerTypeThumbnails} id="thumbnail-view-button" />
            <Button symbol="add" onClick={bookmarkStore.showAddBookmarkDialog} id="add-bookmark-button" />
            <Button
                symbol="delete"
                onClick={bookmarkStore.showDeleteBookmarkDialog}
                disabled={bookmarkStore.activeBookmark === ""}
                id="add-bookmark-button"
            />
        </Container>
    );
};

export default observer(Toolbar);
