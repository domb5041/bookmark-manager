import { useStores } from "../store";
import { observer } from "mobx-react";
import ToolbarButton from "./common/buttons/ToolButton";
import TabButton from "./common/buttons/TabButton";
import TextInput from "./common/textInputs/TextInput";
import Symbol from "./common/Symbol";
import MiniButton from "./common/buttons/MiniButton";
import css from "./Toolbar.module.css";
import SortBookmarks from "./SortBookmarks";

const Toolbar = () => {
    const { bookmarkStore, tagStore } = useStores();
    return (
        <div className={css.toolbar} id="toolbar">
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
            <div className={css.spacer} />
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
            <div className={css.spacer} />
            <ToolbarButton
                text="Sort"
                symbol="sort_by_alpha"
                id="sort-bookmarks-button"
                style={{ marginRight: 17 }}
                disabled={bookmarkStore.bookmarks.length < 2}
            />
            <SortBookmarks />
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
        </div>
    );
};

export default observer(Toolbar);
