import { makeAutoObservable } from "mobx";

class bookmarkStore {
    constructor() {
        makeAutoObservable(this);
    }

    bookmarks = [
        { id: "1", name: "bookmark1", url: "url", tags: ["aaa", "bbb", "ccc"] },
        { id: "2", name: "bookmark2", url: "url", tags: ["aaa", "ccc"] },
        { id: "3", name: "bookmark3", url: "url", tags: ["bbb", "ccc"] },
        { id: "4", name: "bookmark4", url: "url", tags: [] },
        { id: "5", name: "bookmark5", url: "url", tags: [] },
    ];

    activeBookmark = "";
    activeBookmarkIndex = -1;

    setActiveBookmark = (id: string) => {
        this.activeBookmark = id;
        const index = this.bookmarks.findIndex(b => b.id === id);
        this.activeBookmarkIndex = index;
    };

    get tags() {
        const flattenedTags = this.bookmarks.map(b => b.tags).flat();
        const uniqueTags = [...new Set(flattenedTags)];
        return uniqueTags;
    }

    activeFilter = "@all";

    setActiveFilter = (tag: string) => {
        this.setActiveBookmark("");
        this.activeFilter = tag;
    };

    setTags = (tagsString: string) => {
        const newTags = tagsString.split(", ");
        this.bookmarks[this.activeBookmarkIndex].tags = newTags;
    };

    editTagsDialogVisible = false;

    setEditTagsDialogVisible = (bool: boolean) => {
        this.editTagsDialogVisible = bool;
    };
}

export default bookmarkStore;
