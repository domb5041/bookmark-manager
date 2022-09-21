import React from "react";
import { useStores } from "../store";
import { observer } from "mobx-react";
import List from "./bookmarks/List";
import Thumbnails from "./bookmarks/Thumbnails";

const Bookmarks = () => {
    const { bookmarkStore } = useStores();
    const getBookmarks = () => {
        switch (bookmarkStore.activeFilter) {
            case "@all":
                return bookmarkStore.bookmarks;
            case "@tagged":
                return bookmarkStore.bookmarks.filter((b) => b.tags.length > 0);
            case "@untagged":
                return bookmarkStore.bookmarks.filter((b) => b.tags.length === 0);
            default:
                return bookmarkStore.bookmarks.filter((b) => b.tags.includes(bookmarkStore.activeFilter));
        }
    };

    const bookmarks = getBookmarks();

    return (
        <>
            {bookmarkStore.explorerType === "list" && <List bookmarks={bookmarks} />}
            {bookmarkStore.explorerType === "thumbnails" && <Thumbnails bookmarks={bookmarks} />}
        </>
    );
};

export default observer(Bookmarks);
