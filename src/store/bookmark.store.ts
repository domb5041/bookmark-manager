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

    activeBookmark: IBookmark | null = null;
    setActiveBookmark = (bookmark: IBookmark | null) => (this.activeBookmark = bookmark);

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

    bookmarkPreviewVisible = true;
    toggleBookmarkPreview = () => (this.bookmarkPreviewVisible = !this.bookmarkPreviewVisible);

    explorerType = "list";
    setExplorerTypeList = () => (this.explorerType = "list");
    setExplorerTypeThumbnails = () => (this.explorerType = "thumbnails");
}

export default bookmarkStore;
