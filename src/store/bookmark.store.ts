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

    getTags = () => {
        const flattenedTags = this.bookmarks.map((b) => b.tags).flat();
        const uniqueTags = [...new Set(flattenedTags)];
        const alphabeticalTags = uniqueTags.sort((a, b) => (a === b ? 0 : a < b ? -1 : 1));
        this.tags = alphabeticalTags;
    };

    activeFilter = "@all";

    setActiveFilter = (tag: string) => {
        this.setActiveBookmark("");
        this.activeFilter = tag;
    };

    editTagsDialogVisible = false;
    showEditTagsDialog = () => (this.editTagsDialogVisible = true);
    hideEditTagsDialog = () => (this.editTagsDialogVisible = false);

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
}

export default bookmarkStore;
