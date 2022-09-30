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

    tags: string[] = [];
    tagCounts: number[] = [];

    getTagsAndCounts = () => {
        const flattenedTags = this.bookmarks.map((b) => b.tags).flat();
        const uniqueTags = [...new Set(flattenedTags)];
        const alphabeticalTags = uniqueTags.sort((a, b) => (a === b ? 0 : a < b ? -1 : 1));
        const tagCounts = alphabeticalTags.map((tag) => this.getCount(tag));
        this.tags = alphabeticalTags;
        this.tagCounts = tagCounts;
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

    renameTagDialogVisible = false;
    showRenameTagDialog = () => (this.renameTagDialogVisible = true);
    hideRenameTagDialog = () => (this.renameTagDialogVisible = false);

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
