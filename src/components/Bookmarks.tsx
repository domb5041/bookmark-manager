import React, { useEffect, useState } from "react";
import { useStores } from "../store";
import { observer } from "mobx-react";
import List from "./bookmarks/List";
import Thumbnails from "./bookmarks/Thumbnails";
import styled from "styled-components";
import PreviewPane from "./PreviewPane";
import Button from "./Button";

const Container = styled.div`
    display: flex;
    overflow: hidden;
    flex: 1;
    position: relative;
`;

const OpenButton = styled(Button)`
    position: absolute;
    bottom: 10px;
    right: 10px;
    border-radius: 100%;
    width: 50px;
    height: 50px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
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
        <Container>
            {bookmarkStore.explorerType === "list" && <List bookmarks={bookmarks} />}
            {bookmarkStore.explorerType === "thumbnails" && <Thumbnails bookmarks={bookmarks} />}
            <PreviewPane />
            <OpenButton
                symbol="arrow_forward"
                onClick={bookmarkStore.openBookmark}
                disabled={!bookmarkStore.activeBookmark}
                id="open-bookmark-button"
            />
        </Container>
    );
};

export default observer(Bookmarks);
