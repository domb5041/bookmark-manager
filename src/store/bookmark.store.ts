import { makeAutoObservable } from "mobx";
import { updateDoc, doc } from "@firebase/firestore";
import { db } from "../firebase-config";
import moment from "moment";
import { makePersistable } from "mobx-persist-store";

export interface IBookmark {
    id: string;
    name: string;
    url: string;
    tags: string[];
    image: string;
    favicon: string;
    description: string;
    dateAdded: number;
    dateModified?: number;
    dateOpened?: number;
}

class bookmarkStore {
    constructor() {
        makeAutoObservable(this);
        makePersistable(this, {
            name: "bookmarkStore",
            properties: ["explorerType"],
            storage: window.localStorage,
            debugMode: false
        });
    }

    bookmarks: IBookmark[] = [];
    setBookmarks = (bookmarks: IBookmark[]) => {
        this.bookmarks = bookmarks;
        bookmarks.length > 1 && this.handleSort();
    };

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

    contextMenuVisible = false;
    showContextMenu = () => (this.contextMenuVisible = true);
    hideContextMenu = () => (this.contextMenuVisible = false);

    contextMenuPos = [0, 0];
    setContextMenuPos = (e: MouseEvent) => {
        const margin = 2;
        const menuWidth = 212 + margin;
        const menuHeight = 118 + margin;
        const overflowX = e.pageX + menuWidth > window.innerWidth;
        const overflowY = e.pageY + menuHeight > window.innerHeight;
        const x = overflowX ? window.innerWidth - menuWidth : e.pageX;
        const y = overflowY ? window.innerHeight - menuHeight : e.pageY;
        this.contextMenuPos = [x, y];
    };

    sortOptions = [
        { id: "name", displayName: "Title" },
        { id: "url", displayName: "Url" },
        { id: "dateAdded", displayName: "Date Created" }
    ] as const;
    sortBy: (typeof this.sortOptions)[number]["id"] = "name";
    setSortBy = (sortBy: (typeof this.sortOptions)[number]["id"], reverse: boolean) => {
        this.sortByReverse = reverse;
        this.sortBy = sortBy;
        this.handleSort();
    };
    sortByReverse = false;
    setSortByReverse = (bool: boolean) => (this.sortByReverse = bool);

    handleSort = () => {
        this.bookmarks.sort((a, b) => {
            const sortA = a[this.sortBy];
            const sortB = b[this.sortBy];
            if (typeof sortA === "string" && typeof sortB === "string") {
                const prefix = /https?:\/\/|www./g;
                sortA.replace(prefix, "").toUpperCase();
                sortB.replace(prefix, "").toUpperCase();
            }
            const moveDir = this.sortByReverse ? -1 : 1;
            return sortA < sortB ? -moveDir : sortA > sortB ? moveDir : 0;
        });
    };
}

export default bookmarkStore;
