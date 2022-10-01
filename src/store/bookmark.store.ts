import { makeAutoObservable } from "mobx";

export interface IBookmark {
    id: string;
    name: string;
    url: string;
    tags: string[];
    image?: string;
    favicon?: string;
    description?: string;
}

export interface ITag {
    id: string;
    name: string;
    icon: string;
    color: string;
    count: number;
}

class bookmarkStore {
    constructor() {
        makeAutoObservable(this);
    }

    bookmarks: IBookmark[] = [];
    setBookmarks = (bookmarks: IBookmark[]) => (this.bookmarks = bookmarks);

    activeBookmark = "";
    activeBookmarkIndex = -1;

    setActiveBookmark = (id: string) => {
        this.activeBookmark = id;
        const index = this.bookmarks.findIndex((b) => b.id === id);
        this.activeBookmarkIndex = index;
    };

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
        switch (name) {
            case "all":
                return this.bookmarks.length;
            case "tagged":
                return this.bookmarks.filter((bookmark) => bookmark.tags.length > 0).length;
            case "untagged":
                return this.bookmarks.filter((bookmark) => bookmark.tags.length === 0).length;
            default:
                return this.bookmarks.filter((bookmark) => bookmark.tags.includes(name)).length;
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
        this.setActiveBookmark("");
        this.activeFilter = tag;
    };

    editBookmarkDialogVisible = false;
    showEditBookmarkDialog = () => (this.editBookmarkDialogVisible = true);
    hideEditBookmarkDialog = () => (this.editBookmarkDialogVisible = false);

    addBookmarkDialogVisible = false;
    showAddBookmarkDialog = () => (this.addBookmarkDialogVisible = true);
    hideAddBookmarkDialog = () => (this.addBookmarkDialogVisible = false);

    deleteBookmarkDialogVisible = false;
    showDeleteBookmarkDialog = () => (this.deleteBookmarkDialogVisible = true);
    hideDeleteBookmarkDialog = () => (this.deleteBookmarkDialogVisible = false);

    editTagDialogVisible = false;
    showEditTagDialog = () => (this.editTagDialogVisible = true);
    hideEditTagDialog = () => (this.editTagDialogVisible = false);

    deleteTagDialogVisible = false;
    showDeleteTagDialog = () => (this.deleteTagDialogVisible = true);
    hideDeleteTagDialog = () => (this.deleteTagDialogVisible = false);

    explorerType = "list";
    setExplorerTypeList = () => (this.explorerType = "list");
    setExplorerTypeThumbnails = () => (this.explorerType = "thumbnails");

    tagsInput: string[] = [];
    setTagsInput = (tags: string[]) => (this.tagsInput = tags);

    sidebarVisible = true;
    setSidebarVisible = () => (this.sidebarVisible = !this.sidebarVisible);
}

export default bookmarkStore;
