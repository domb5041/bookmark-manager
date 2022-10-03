import React, { useEffect, useState } from "react";
import { useStores } from "../store";
import { observer } from "mobx-react";
import List from "./bookmarks/List";
import Thumbnails from "./bookmarks/Thumbnails";

const Bookmarks = () => {
    const { bookmarkStore, tagStore } = useStores();
    const [bookmarks, setBookmarks] = useState(bookmarkStore.bookmarks);

    const getBookmarks = () => {
        switch (tagStore.activeFilter.name) {
            case tagStore.allItemsFilter.name:
                return bookmarkStore.bookmarks;
            case tagStore.taggedItemsFilter.name:
                return bookmarkStore.bookmarks.filter((b) => b.tags.length > 0);
            case tagStore.untaggedItemsFilter.name:
                return bookmarkStore.bookmarks.filter((b) => b.tags.length === 0);
            default:
                return bookmarkStore.bookmarks.filter((b) => b.tags.includes(tagStore.activeFilter.name));
        }
    };

    useEffect(() => {
        if (bookmarkStore.searchTerm === "") {
            setBookmarks(getBookmarks());
        } else {
            const searchResults = getBookmarks().filter((b) => {
                const lowerBookmarkName = b.name.toLowerCase();
                const lowerSearchTerm = bookmarkStore.searchTerm.toLowerCase();
                return lowerBookmarkName.includes(lowerSearchTerm);
            });
            setBookmarks(searchResults);
        }
    }, [bookmarkStore.searchTerm, tagStore.activeFilter, bookmarkStore.bookmarks]);

    return (
        <>
            {bookmarkStore.explorerType === "list" && <List bookmarks={bookmarks} />}
            {bookmarkStore.explorerType === "thumbnails" && <Thumbnails bookmarks={bookmarks} />}
        </>
    );
};

export default observer(Bookmarks);
