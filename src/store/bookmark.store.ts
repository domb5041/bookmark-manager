import { makeAutoObservable } from "mobx";
import { updateDoc, doc } from "@firebase/firestore";
import { db } from "../firebase-config";
import moment from "moment";

export interface IBookmark {
    id: string;
    name: string;
    url: string;
    tags: string[];
    image?: string;
    favicon?: string;
    description?: string;
    dateAdded: number;
    dateModified?: number;
    dateOpened?: number;
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

    openBookmark = async (url: string, bookmarkId: string) => {
        window.open(url, "_blank");
        const bookmarkDoc = doc(db, "bookmarks", bookmarkId);
        const date = Number(moment().format("X"));
        await updateDoc(bookmarkDoc, { dateOpened: date });
        if (!this.activeBookmark) return;
        this.activeBookmark.dateOpened = date;
    };

    openActiveBookmark = async () => {
        if (!this.activeBookmark) return;
        window.open(this.activeBookmark.url, "_blank");
        const bookmarkDoc = doc(db, "bookmarks", this.activeBookmark.id);
        const date = Number(moment().format("X"));
        await updateDoc(bookmarkDoc, { dateOpened: date });
        this.activeBookmark.dateOpened = date;
    };
}

export default bookmarkStore;
