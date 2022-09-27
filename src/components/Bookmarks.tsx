import React from "react";
import { useStores } from "../store";
import { observer } from "mobx-react";
import List from "./bookmarks/List";
import Thumbnails from "./bookmarks/Thumbnails";
import { IBookmark } from "../store/bookmark.store";

const Bookmarks = () => {
    const { bookmarkStore } = useStores();

    const getBookmarks2 = () => {
        const bookmarks = bookmarkStore.bookmarks as IBookmark[];
        switch (bookmarkStore.activeFilter) {
            case bookmarkStore.allItemsFilter:
                return bookmarks;
            case bookmarkStore.taggedItemsFilter:
                return bookmarks.filter((b) => b.tags.length > 0);
            case bookmarkStore.untaggedItemsFilter:
                return bookmarks.filter((b) => b.tags.length === 0);
            default:
                return bookmarks.filter((b) => b.tags.includes(bookmarkStore.activeFilter));
        }
    };

    const bookmarks2 = getBookmarks2();

    return (
        <>
            {bookmarkStore.explorerType === "list" && <List bookmarks={bookmarks2} />}
            {bookmarkStore.explorerType === "thumbnails" && <Thumbnails bookmarks={bookmarks2} />}
        </>
    );
};

export default observer(Bookmarks);
