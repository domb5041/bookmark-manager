import React from "react";
import styled from "styled-components";
import { useStores } from "../store";
import { observer } from "mobx-react";
import Button from "./Button";

const Container = styled.div`
    height: 50px;
    border-bottom: 1px solid ${(props) => props.theme.color.background.border};
    background-color: ${(props) => props.theme.color.background.surface};
    display: flex;
    align-items: center;
    padding: 0 10px;
`;

const Title = styled.div`
    flex: 1;
    padding: 0 20px;
    font-weight: bold;
`;

const Toolbar = () => {
    const { bookmarkStore, tagStore } = useStores();
    return (
        <Container id="toolbar">
            <Button symbol="list_alt" onClick={tagStore.setSidebarVisible} id="toggle-sidebar-button" />
            <Title>{tagStore.activeFilter.name}</Title>
            <Button
                symbol="edit"
                onClick={bookmarkStore.showEditBookmarkDialog}
                disabled={bookmarkStore.activeBookmark === ""}
                id="edit-bookmark-button"
                style={{ marginRight: 10 }}
            />
            <Button symbol="view_list" onClick={bookmarkStore.setExplorerTypeList} id="list-view-button" />
            <Button
                symbol="grid_view"
                onClick={bookmarkStore.setExplorerTypeThumbnails}
                id="thumbnail-view-button"
                style={{ marginRight: 10 }}
            />
            <Button
                symbol="add"
                onClick={bookmarkStore.showAddBookmarkDialog}
                id="add-bookmark-button"
                style={{ marginRight: 10 }}
            />
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
