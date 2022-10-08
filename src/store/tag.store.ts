import { makeAutoObservable } from "mobx";
import { RootStore } from ".";
import { tagColors } from "../theme";

export interface ITag {
    id: string;
    name: string;
    icon: string;
    color: string;
    count: number;
}

class tagStore {
    rootStore: RootStore;
    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
        makeAutoObservable(this);
    }

    tagSet: ITag[] = [];
    updateTagSet = (tags: ITag[]) => {
        const alphabeticalTags = tags.sort((a, b) => (a === b ? 0 : a.name < b.name ? -1 : 1));
        this.tagSet = alphabeticalTags;
    };

    updateTotalsCounts = () => {
        this.allItemsFilter.count = this.getCount("all");
        this.taggedItemsFilter.count = this.getCount("tagged");
        this.untaggedItemsFilter.count = this.getCount("untagged");
    };

    getCount = (name: string) => {
        const { bookmarks } = this.rootStore.bookmarkStore;
        switch (name) {
            case "all":
                return bookmarks.length;
            case "tagged":
                return bookmarks.filter((bookmark) => bookmark.tags.length > 0).length;
            case "untagged":
                return bookmarks.filter((bookmark) => bookmark.tags.length === 0).length;
            default:
                return bookmarks.filter((bookmark) => bookmark.tags.includes(name)).length;
        }
    };

    activeFilterIndex = -1;

    allItemsFilter = { id: "all items", name: "all items", color: tagColors[0], icon: "tag", count: 0 };
    taggedItemsFilter = { id: "tagged", name: "tagged", color: tagColors[0], icon: "tag", count: 0 };
    untaggedItemsFilter = { id: "untagged", name: "untagged", color: tagColors[0], icon: "tag", count: 0 };

    activeFilter = this.allItemsFilter;

    setActiveFilter = (tag: ITag) => {
        this.rootStore.bookmarkStore.setActiveBookmark(null);
        this.rootStore.bookmarkStore.resetSearchTerm();
        this.activeFilter = tag;
    };

    editTagDialogVisible = false;
    showEditTagDialog = () => (this.editTagDialogVisible = true);
    hideEditTagDialog = () => (this.editTagDialogVisible = false);

    deleteTagDialogVisible = false;
    showDeleteTagDialog = () => (this.deleteTagDialogVisible = true);
    hideDeleteTagDialog = () => (this.deleteTagDialogVisible = false);

    tagsInput: string[] = [];
    setTagsInput = (tags: string[]) => (this.tagsInput = tags);

    sidebarVisible = true;
    toggleSidebar = () => (this.sidebarVisible = !this.sidebarVisible);
}

export default tagStore;
