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

    get tags() {
        const flattenedTags = this.bookmarks.map(b => b.tags).flat();
        const uniqueTags = [...new Set(flattenedTags)];
        return uniqueTags;
    }

    activeFilter = "@all";

    setActiveFilter = (tag: string) => {
        this.activeFilter = tag;
    };

    addTag = (id: string) => {
        const index = this.bookmarks.findIndex(b => b.id === id);
        this.bookmarks[index].tags.push("newTag");
    };
}

export default bookmarkStore;
