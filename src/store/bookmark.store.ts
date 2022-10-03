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

    searchTerm = "";
    setSearchTerm = (text: string) => (this.searchTerm = text);
    resetSearchTerm = () => (this.searchTerm = "");

    editBookmarkDialogVisible = false;
    showEditBookmarkDialog = () => (this.editBookmarkDialogVisible = true);
    hideEditBookmarkDialog = () => (this.editBookmarkDialogVisible = false);

    addBookmarkDialogVisible = false;
    showAddBookmarkDialog = () => (this.addBookmarkDialogVisible = true);
    hideAddBookmarkDialog = () => (this.addBookmarkDialogVisible = false);

    deleteBookmarkDialogVisible = false;
    showDeleteBookmarkDialog = () => (this.deleteBookmarkDialogVisible = true);
    hideDeleteBookmarkDialog = () => (this.deleteBookmarkDialogVisible = false);

    explorerType = "list";
    setExplorerTypeList = () => (this.explorerType = "list");
    setExplorerTypeThumbnails = () => (this.explorerType = "thumbnails");
}

export default bookmarkStore;
