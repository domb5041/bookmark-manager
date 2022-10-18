import React from "react";
import styled from "styled-components";
import { useStores } from "../store";
import { observer } from "mobx-react";
import Button from "./common/Button";
import TextInput from "./common/TextInput";

const Container = styled.div`
    height: 50px;
    border-bottom: 1px solid ${(props) => props.theme.color.background.border};
    background-color: ${(props) => props.theme.color.background.surface};
    display: flex;
    align-items: center;
    padding: 0 10px;
    flex-shrink: 0;
`;

const Spacer = styled.div`
    flex: 1;
`;

const Toolbar = () => {
    const { bookmarkStore, tagStore } = useStores();
    return (
        <Container id="toolbar">
            <Button
                symbol="menu"
                onClick={tagStore.toggleSidebar}
                id="toggle-sidebar-button"
                style={{ marginRight: 10 }}
            />
            <Button symbol="add" onClick={bookmarkStore.showAddBookmarkDialog} id="add-bookmark-button" />
            <Spacer />
            <TextInput
                id="search-bookmarks-input"
                value={bookmarkStore.searchTerm}
                onChange={(e) => bookmarkStore.setSearchTerm(e.target.value)}
                placeholder={"search " + tagStore.activeFilter.name}
                style={{ width: 400 }}
            />
            <Spacer />
            <Button symbol="view_list" onClick={bookmarkStore.setExplorerTypeList} id="list-view-button" />
            <Button
                symbol="grid_view"
                onClick={bookmarkStore.setExplorerTypeThumbnails}
                id="thumbnail-view-button"
                style={{ marginRight: 10 }}
            />
            <Button symbol="menu" onClick={bookmarkStore.toggleBookmarkPreview} id="toggle-preview-button" />
        </Container>
    );
};

export default observer(Toolbar);
