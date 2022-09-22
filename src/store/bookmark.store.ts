import axios from "axios";
import { action, makeAutoObservable } from "mobx";

export interface IBookmark {
    id: string;
    name: string;
    url: string;
    tags: string[];
    // preview: null | {
    //     contentType: string;
    //     description: string;
    //     favicons: string[];
    //     images: string[];
    //     mediaType: string;
    //     siteName: string;
    //     title: string;
    //     url: string;
    //     videos: string[];
    // };
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
        this.tags = uniqueTags;
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

    explorerType = "list";
    setExplorerTypeList = () => (this.explorerType = "list");
    setExplorerTypeThumbnails = () => (this.explorerType = "thumbnails");

    // getBookmarkPreviews = () => {
    //     this.bookmarks.forEach(
    //         action((b) => {
    //             axios({
    //                 method: "get",
    //                 url: `/link-preview?url=${b.url}`
    //             })
    //                 .then(
    //                     action((res) => {
    //                         b.preview = res.data;
    //                     })
    //                 )
    //                 .catch((err: Error) => {
    //                     console.error(err);
    //                 });
    //         })
    //     );
    // };
}

export default bookmarkStore;
