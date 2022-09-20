import { makeAutoObservable } from "mobx";

class bookmarkStore {
    constructor() {
        makeAutoObservable(this);
    }

    bookmarks = [
        { id: "1", name: "bookmark1", url: "url", tags: ["aaa", "bbb", "ccc"] },
        { id: "2", name: "bookmark2", url: "url", tags: ["aaa", "bbb", "ccc"] },
        { id: "3", name: "bookmark3", url: "url", tags: ["aaa", "bbb", "ccc"] },
    ];

    tags = ["aaa", "bbb", "ccc", "ddd"];
}

export default bookmarkStore;
