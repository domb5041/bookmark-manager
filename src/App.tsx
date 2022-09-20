import React from "react";
import styled from "styled-components";
import { useStores } from "./store";
import { observer } from "mobx-react";
import EditTags from "./components/EditTags";

const Container = styled.div`
    display: flex;
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    overflow: hidden;
`;

const Sidebar = styled.div`
    width: 250px;
    border-right: 1px solid silver;
    background-color: whitesmoke;
`;

const Toolbar = styled.div`
    height: 50px;
    border-bottom: 1px solid silver;
    background-color: whitesmoke;
    display: flex;
    align-items: center;
    padding: 0 10px;
`;

const Container2 = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
`;

const Container3 = styled.div`
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

const SidebarTag = styled.div<{ active: boolean }>`
    padding: 3px 10px;
    cursor: pointer;
    background-color: ${props => (props.active ? "silver" : "transparent")};
`;

function App() {
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
        <Container id='app-container'>
            <Sidebar id='sidebar'>
                <SidebarTag
                    active={bookmarkStore.activeFilter === "@all"}
                    onClick={() => bookmarkStore.setActiveFilter("@all")}
                >
                    All Items
                </SidebarTag>
                <SidebarTag
                    active={bookmarkStore.activeFilter === "@tagged"}
                    onClick={() => bookmarkStore.setActiveFilter("@tagged")}
                >
                    Tagged
                </SidebarTag>
                <SidebarTag
                    active={bookmarkStore.activeFilter === "@untagged"}
                    onClick={() => bookmarkStore.setActiveFilter("@untagged")}
                    style={{ marginBottom: 10 }}
                >
                    Untagged
                </SidebarTag>
                {bookmarkStore.tags.map((tag, i) => (
                    <SidebarTag
                        active={bookmarkStore.activeFilter === tag}
                        onClick={() => bookmarkStore.setActiveFilter(tag)}
                        key={`${i}-${tag}`}
                    >
                        #{tag}
                    </SidebarTag>
                ))}
            </Sidebar>
            <Container2 id='container-right'>
                <Toolbar id='toolbar'>
                    <button
                        onClick={() => bookmarkStore.setEditTagsDialogVisible(true)}
                        disabled={bookmarkStore.activeBookmark === ""}
                    >
                        #
                    </button>
                </Toolbar>
                <EditTags />
                <Container3 id='bookmarks-container'>
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
                </Container3>
            </Container2>
        </Container>
    );
}

export default observer(App);
