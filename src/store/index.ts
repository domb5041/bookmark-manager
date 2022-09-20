import React from "react";
import BookmarkStore from "./bookmark.store";

export class RootStore {
    bookmarkStore: BookmarkStore;
    constructor() {
        this.bookmarkStore = new BookmarkStore();
    }
}

const StoresContext = React.createContext(new RootStore());
export const useStores = () => React.useContext(StoresContext);
