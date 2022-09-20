import React from "react";
import styled from "styled-components";
import { useStores } from "./store";

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

const Bookmark = styled.div`
    border-bottom: 1px solid silver;
    padding: 5px;
`;

const Tag = styled.label`
    background-color: silver;
    margin-left: 5px;
    padding: 2px 5px;
`;

function App() {
    const { bookmarkStore } = useStores();
    return (
        <Container id='app-container'>
            <Sidebar id='sidebar'>
                {bookmarkStore.tags.map((tag, i) => (
                    <div key={`${i}-${tag}`}>{tag}</div>
                ))}
            </Sidebar>
            <Container2 id='container-right'>
                <Toolbar id='toolbar' />
                <Container3 id='bookmarks-container'>
                    {bookmarkStore.bookmarks.map(bookmark => (
                        <Bookmark key={bookmark.id}>
                            <a href={bookmark.url}>{bookmark.name}</a>
                            {bookmark.tags.map((tag, i) => (
                                <Tag key={`${i}-${tag}`}>{tag}</Tag>
                            ))}
                        </Bookmark>
                    ))}
                </Container3>
            </Container2>
        </Container>
    );
}

export default App;
