import { makeAutoObservable } from "mobx";

class bookmarkStore {
    constructor() {
        makeAutoObservable(this);
    }

    bookmarks = [
        {
            id: "1",
            name: "how-to-get-favicons-url-from-a-generic-webpage-in-javascript",
            url: "https://stackoverflow.com/questions/10282939/how-to-get-favicons-url-from-a-generic-webpage-in-javascript",
            tags: ["aaa", "bbb", "ccc"],
        },
        {
            id: "2",
            name: "css-transition",
            url: "http://reactcommunity.org/react-transition-group/css-transition",
            tags: ["aaa", "ccc"],
        },
        {
            id: "3",
            name: "bookmark-manager",
            url: "https://github.com/domb5041/bookmark-manager",
            tags: ["bbb", "ccc"],
        },
        {
            id: "4",
            name: "how-to-get-return-value-from-switch-statement",
            url: "https://stackoverflow.com/questions/6612541/how-to-get-return-value-from-switch-statement",
            tags: [],
        },
        { id: "5", name: "strava", url: "https://www.strava.com/dashboard", tags: [] },
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
    showEditTagsDialog = () => (this.editTagsDialogVisible = true);
    hideEditTagsDialog = () => (this.editTagsDialogVisible = false);

    explorerType = "thumbnails";
    setExplorerTypeList = () => (this.explorerType = "list");
    setExplorerTypeThumbnails = () => (this.explorerType = "thumbnails");
}

export default bookmarkStore;
