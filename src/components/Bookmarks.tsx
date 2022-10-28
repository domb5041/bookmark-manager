import React, { useEffect, useState } from "react";
import { useStores } from "../store";
import { observer } from "mobx-react";
import List from "./bookmarks/List";
import Thumbnails from "./bookmarks/Thumbnails";
import styled from "styled-components";

const Container = styled.div`
    display: flex;
    overflow: hidden;
    flex: 1;
    position: relative;
    flex-direction: column;
`;

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
            const bookmarks = getBookmarks();
            setBookmarks(bookmarks);
            bookmarkStore.setActiveBookmark(bookmarks[0]);
        } else {
            const searchResults = getBookmarks().filter((b) => {
                const lowerBookmarkName = b.name.toLowerCase();
                const lowerSearchTerm = bookmarkStore.searchTerm.toLowerCase();
                return lowerBookmarkName.includes(lowerSearchTerm);
            });
            bookmarkStore.setActiveBookmark(searchResults[0]);
            setBookmarks(searchResults);
        }
    }, [bookmarkStore.searchTerm, tagStore.activeFilter, bookmarkStore.bookmarks]);

    return (
        <Container>
            {bookmarkStore.explorerType === "list" && <List bookmarks={bookmarks} />}
            {bookmarkStore.explorerType === "thumbnails" && <Thumbnails bookmarks={bookmarks} />}
        </Container>
    );
};

export default observer(Bookmarks);
