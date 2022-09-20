import React from "react";
import { useStores } from "../store";
import styled from "styled-components";
import { observer } from "mobx-react";

const Container = styled.div`
    flex: 1;
    background-color: whitesmoke;
`;

const Bookmark = styled.div<{ active: boolean }>`
    border-bottom: 1px solid silver;
    padding: 5px;
    background-color: ${props => (props.active ? "silver" : "transparent")};
    cursor: pointer;
`;

const Tag = styled.label`
    margin-left: 5px;
    padding: 2px 5px;
`;

const Bookmarks = () => {
    const { bookmarkStore } = useStores();
    const getBookmarks = () => {
        switch (bookmarkStore.activeFilter) {
            case "@all":
                return bookmarkStore.bookmarks;
            case "@tagged":
                return bookmarkStore.bookmarks.filter(b => b.tags.length > 0);
            case "@untagged":
                return bookmarkStore.bookmarks.filter(b => b.tags.length === 0);
            default:
                return bookmarkStore.bookmarks.filter(b => b.tags.includes(bookmarkStore.activeFilter));
        }
    };
    return (
        <Container id='bookmarks-container'>
            {getBookmarks().map(bookmark => (
                <Bookmark
                    key={bookmark.id}
                    onClick={() => bookmarkStore.setActiveBookmark(bookmark.id)}
                    active={bookmarkStore.activeBookmark === bookmark.id}
                >
                    <label>{bookmark.name}</label>
                    {bookmark.tags.map((tag, i) => (
                        <Tag onClick={() => bookmarkStore.setActiveFilter(tag)} key={`${i}-${tag}`}>
                            #{tag}
                        </Tag>
                    ))}
                </Bookmark>
            ))}
        </Container>
    );
};

export default observer(Bookmarks);
