import React from "react";
import { useStores } from "../store";
import styled from "styled-components";
import { observer } from "mobx-react";

const Container = styled.div`
    flex: 1;
    background-color: whitesmoke;
    overflow: hidden;
`;

const Bookmark = styled.div<{ active: boolean }>`
    border-bottom: 1px solid silver;
    padding: 5px;
    background-color: ${props => (props.active ? "silver" : "transparent")};
    cursor: pointer;
    display: flex;
    align-items: center;
    overflow: hidden;
    & > .bookmark-name {
        flex: 1;
        margin-right: 10px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    & > .bookmark-url {
        flex: 1;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    & > .bookmark-tags {
        flex: 1;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
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
                    onDoubleClick={() => window.open(bookmark.url, "_blank")}
                >
                    <img
                        src={`https://s2.googleusercontent.com/s2/favicons?domain_url=${bookmark.url}`}
                        alt='favicon'
                        style={{ marginRight: 5 }}
                    />
                    <div className='bookmark-name'>{bookmark.name}</div>
                    <div className='bookmark-url'>{bookmark.url}</div>
                    <div className='bookmark-tags'>
                        {bookmark.tags.map((tag, i) => (
                            <Tag key={`${i}-${tag}`}>#{tag}</Tag>
                        ))}
                    </div>
                    <button onClick={() => window.open(bookmark.url, "_blank")}>open</button>
                </Bookmark>
            ))}
        </Container>
    );
};

export default observer(Bookmarks);
