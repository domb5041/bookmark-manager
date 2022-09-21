import axios from "axios";
import { action, makeAutoObservable } from "mobx";

export interface IBookmark {
    id: string;
    name: string;
    url: string;
    tags: string[];
    preview: null | {
        contentType: string;
        description: string;
        favicons: string[];
        images: string[];
        mediaType: string;
        siteName: string;
        title: string;
        url: string;
        videos: string[];
    };
}

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
            preview: null
        },
        {
            id: "2",
            name: "css-transition",
            url: "http://reactcommunity.org/react-transition-group/css-transition",
            tags: ["aaa", "ccc"],
            preview: null
        },
        {
            id: "3",
            name: "bookmark-manager",
            url: "https://github.com/domb5041/bookmark-manager",
            tags: ["bbb", "ccc"],
            preview: null
        },
        {
            id: "4",
            name: "how-to-get-return-value-from-switch-statement",
            url: "https://stackoverflow.com/questions/6612541/how-to-get-return-value-from-switch-statement",
            tags: [],
            preview: null
        },
        { id: "5", name: "strava", url: "https://www.strava.com/dashboard", tags: [], preview: null }
    ];

    activeBookmark = "";
    activeBookmarkIndex = -1;

    setActiveBookmark = (id: string) => {
        this.activeBookmark = id;
        const index = this.bookmarks.findIndex((b) => b.id === id);
        this.activeBookmarkIndex = index;
    };

    get tags() {
        const flattenedTags = this.bookmarks.map((b) => b.tags).flat();
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

    getBookmarkPreviews = () => {
        this.bookmarks.forEach(
            action((b) => {
                axios({
                    method: "get",
                    url: `/link-preview?url=${b.url}`
                })
                    .then(
                        action((res) => {
                            b.preview = res.data;
                        })
                    )
                    .catch((err: Error) => {
                        console.error(err);
                    });
            })
        );
    };
}

export default bookmarkStore;
