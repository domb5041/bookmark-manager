import { useStores } from "../store";
import { observer } from "mobx-react";
import ToolbarButton from "./common/buttons/ToolButton";
import TabButton from "./common/buttons/TabButton";
import TextInput from "./common/textInputs/TextInput";
import Symbol from "./common/Symbol";
import MiniButton from "./common/buttons/MiniButton";
import Button from "./common/buttons/Button";
import css from "./Toolbar.module.css";
import SortBookmarks from "./SortBookmarks";
import { useMediaQuery } from "react-responsive";
import MiniDialog from "./common/MiniDialog";
import SidebarTags from "./sidebar/SidebarTags";
import SettingsDialog from "./SettingsDialog";
import EditTag from "./EditTag";
import DeleteTag from "./DeleteTag";

const Toolbar = () => {
    const { bookmarkStore, tagStore, settingStore } = useStores();

    const enoughSpacePreview = useMediaQuery({
        query: `(min-width: 1000px)`
    });

    const enoughSpaceSidebar = useMediaQuery({
        query: `(min-width: 800px)`
    });

    const searchInput = (
        <TextInput
            id="search-bookmarks-input"
            value={bookmarkStore.searchTerm}
            onChange={(e) => bookmarkStore.setSearchTerm(e.target.value)}
            placeholder={"Search in " + tagStore.activeFilter.name}
            style={{ width: 350, margin: "0 10px" }}
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
    );

    return (
        <div className={css.toolbar} id="toolbar">
            {enoughSpaceSidebar && (
                <ToolbarButton
                    text="Menu"
                    symbol="menu"
                    onClick={tagStore.toggleSidebar}
                    id="toggle-sidebar-button"
                    style={{ marginRight: 20 }}
                />
            )}
            {(!tagStore.sidebarVisible || !enoughSpaceSidebar) && (
                <ToolbarButton
                    text="settings"
                    symbol="settings"
                    onClick={settingStore.showSettingsDialog}
                    id="settings-button"
                    style={{ marginRight: 20 }}
                />
            )}
            <SettingsDialog />
            <EditTag />
            <DeleteTag />
            {(!tagStore.sidebarVisible || !enoughSpaceSidebar) && (
                <>
                    <Button
                        text={tagStore.activeFilter.name}
                        symbol="keyboard_arrow_down"
                        id="floating-sidebar-button"
                        style={{ marginRight: 20, width: 150 }}
                        styleType="primary"
                    />
                    <MiniDialog id="floating-sidbar-dialog" attachTo="floating-sidebar-button">
                        <SidebarTags />
                    </MiniDialog>
                </>
            )}
            <ToolbarButton
                text="new"
                symbol="add"
                onClick={bookmarkStore.showAddBookmarkDialog}
                id="add-bookmark-button"
            />
            <div className={css.spacer} />
            {enoughSpaceSidebar && searchInput}
            {!enoughSpaceSidebar && (
                <>
                    <ToolbarButton
                        text="Search"
                        symbol="search"
                        id="search-bookmarks-button"
                        style={{ marginRight: 17 }}
                    />
                    <MiniDialog
                        id="search-bookmarks-dialog"
                        attachTo="search-bookmarks-button"
                        width="auto"
                        onOpen={() => {
                            document.getElementById("search-bookmarks-input")?.focus();
                        }}
                    >
                        {searchInput}
                    </MiniDialog>
                </>
            )}
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
                id="bookmarks-view-setting"
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
            {enoughSpacePreview && (
                <ToolbarButton
                    text="preview"
                    symbol="panorama"
                    onClick={bookmarkStore.toggleBookmarkPreview}
                    id="toggle-preview-button"
                />
            )}
        </div>
    );
};

export default observer(Toolbar);
