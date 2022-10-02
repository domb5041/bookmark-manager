import React from "react";
import BookmarkStore from "./bookmark.store";
import TagStore from "./tag.store";

export class RootStore {
    bookmarkStore: BookmarkStore;
    tagStore: TagStore;
    constructor() {
        this.bookmarkStore = new BookmarkStore();
        this.tagStore = new TagStore(this);
    }
}

const StoresContext = React.createContext(new RootStore());
export const useStores = () => React.useContext(StoresContext);
