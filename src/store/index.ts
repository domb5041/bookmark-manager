import React from "react";
import BookmarkStore from "./bookmark.store";
import TagStore from "./tag.store";
import SettingStore from "./setting.store";

export class RootStore {
    bookmarkStore: BookmarkStore;
    tagStore: TagStore;
    settingStore: SettingStore;
    constructor() {
        this.bookmarkStore = new BookmarkStore();
        this.tagStore = new TagStore(this);
        this.settingStore = new SettingStore();
    }
}

const StoresContext = React.createContext(new RootStore());
export const useStores = () => React.useContext(StoresContext);
