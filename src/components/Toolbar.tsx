import React from "react";
import styled from "styled-components";
import { useStores } from "../store";
import { observer } from "mobx-react";
import ToolbarButton from "./common/buttons/ToolButton";
import TabButton from "./common/buttons/TabButton";
import TextInput from "./common/textInputs/TextInput";
import Symbol from "./common/Symbol";
import MiniButton from "./common/buttons/MiniButton";

const Container = styled.div`
    display: flex;
    align-items: flex-start;
    padding: 10px 15px;
    flex-shrink: 0;
`;

const Spacer = styled.div`
    flex: 1;
`;

const Toolbar = () => {
    const { bookmarkStore, tagStore } = useStores();
    return (
        <Container id="toolbar">
            <ToolbarButton
                text="Menu"
                symbol="menu"
                onClick={tagStore.toggleSidebar}
                id="toggle-sidebar-button"
                style={{ marginRight: 20 }}
            />
            <ToolbarButton
                text="new"
                symbol="add"
                onClick={bookmarkStore.showAddBookmarkDialog}
                id="add-bookmark-button"
            />
            <Spacer />
            <TextInput
                id="search-bookmarks-input"
                value={bookmarkStore.searchTerm}
                onChange={(e) => bookmarkStore.setSearchTerm(e.target.value)}
                placeholder={"Search in " + tagStore.activeFilter.name}
                style={{ width: 350 }}
                leftWidget={<Symbol name="search" size="18px" />}
                rightWidget={
                    bookmarkStore.searchTerm !== "" && (
                        <MiniButton
                            id="search-filter-clear"
                            onClick={() => bookmarkStore.setSearchTerm("")}
                            symbol="close"
                        />
                    )
                }
            />
            <Spacer />
            <ToolbarButton
                text="Sort"
                symbol="sort_by_alpha"
                onClick={() => {
                    console.log("sort");
                }}
                id="sort-bookmarks-button"
                style={{ marginRight: 17 }}
            />
            <TabButton
                label="view"
                style={{ marginRight: 15 }}
                activeListener={bookmarkStore.explorerType}
                buttons={[
                    {
                        icon: "format_list_bulleted",
                        onClick: bookmarkStore.setExplorerTypeList,
                        id: "list-view-button",
                        activeId: "list"
                    },
                    {
                        icon: "dashboard",
                        onClick: bookmarkStore.setExplorerTypeThumbnails,
                        id: " thumbnail-view-button",
                        activeId: "thumbnails"
                    }
                ]}
            />
            <ToolbarButton
                text="preview"
                symbol="panorama"
                onClick={bookmarkStore.toggleBookmarkPreview}
                id="toggle-preview-button"
            />
        </Container>
    );
};

export default observer(Toolbar);
