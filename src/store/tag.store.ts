import { makeAutoObservable } from "mobx";
import { RootStore } from ".";

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
        const alphabeticalTags = tags.sort((a, b) => (a === b ? 0 : a.id < b.id ? -1 : 1));
        this.tagSet = alphabeticalTags;
    };

    updateTotalsCounts = () => {
        this.allItemsCount = this.getCount("all");
        this.taggedItemsCount = this.getCount("tagged");
        this.untaggedItemsCount = this.getCount("untagged");
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

    allItemsFilter = "all items";
    taggedItemsFilter = "tagged";
    untaggedItemsFilter = "untagged";
    allItemsCount = 0;
    taggedItemsCount = 0;
    untaggedItemsCount = 0;

    activeFilter = this.allItemsFilter;
    activeFilterIndex = -1;

    setActiveFilter = (tag: string) => {
        this.rootStore.bookmarkStore.setActiveBookmark("");
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
    setSidebarVisible = () => (this.sidebarVisible = !this.sidebarVisible);
}

export default tagStore;
